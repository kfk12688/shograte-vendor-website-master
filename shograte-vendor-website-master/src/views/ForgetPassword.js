import React from "react";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";


import api from '../services/api';


class ForgetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isSubmitted:false,
          email: '',
          errors: {
            email: ''
          },
          formResponse:{
          },
        };      

    }


    componentDidMount(){

      //get url params to show alert and error message

      const urlParams = new URLSearchParams(window.location.search); 
      const email = urlParams.get('email')
      const password = urlParams.get('password')

      if(email==='required'){
        this.setState({
          formResponse:{
            success:false,
            message:"Email required."
          }
        })
      }    


    }

  
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'email': 
            errors.email = 
              value.length < 0
                ? 'Email required!'
                : '';
            break;
            
            default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
      }

    validateForms=()=>{
        let errors = this.state.errors;
        const {email}=this.state;
        if(!email){
            if(!email){
                errors.email = 'Email required!';
            }

            this.setState({errors})
        }
    }

    validateForm = (errors) => {
        this.validateForms()
        let valid = true;
        Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit = (event) => {
      this.validateForms()
        event.preventDefault();

        
        this.setState({
          isSubmitted:true
        })
        

        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form')

            let formData={
                email:this.state.email
            }

            api.admin_users('/adminusers/forget-password').forget_password(formData).then(({ data }) => {  
              
              if(data.success == true){
                  //redirect to verify otp password
                  this.props.history.push(`/auth/verify-otp?email=${this.state.email}`);
              }else{
                this.setState({
                  formResponse:{
                    success:data.success,
                    message:data.message
                  }
                })
              }             
              console.log('formResponse',this.state.formResponse);

              this.setState({
                isSubmitted:false
              })
        
            }).catch((error)=>{
              this.setState({
                isSubmitted:false
              })
              
              console.log('error',error);
            })

        }
    }

  render() {

    const {errors,email,formResponse,isSubmitted} = this.state;

    return (
      <>
        <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         
          <CardBody className="px-lg-5 py-lg-5">

            <div className="text-muted text-center mt-2 mb-3">
              <small>Forget Password</small>
            </div>

            {
              Object.keys(formResponse).length > 0 && 
                <UncontrolledAlert color={formResponse.success ==true ? "success" :"warning"} fade={false}>
                
                <span className="alert-inner--text">
                  {
                    formResponse.message
                  }
                </span>
              </UncontrolledAlert>
            }
            
            <Form role="form" onSubmit={this.handleSubmit} noValidate>
              <FormGroup  className={errors.email.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"                    
                    autoComplete="new-email"                    
                    name="email"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                 

                </InputGroup>


                {errors.email.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.email}</span>
                      </div>
                }

              </FormGroup>              

              <div className="text-center"> 
                <Button className="my-4" color="primary" type="submit" disabled={isSubmitted}>

                  {
                    isSubmitted ?
                    <>
                      
                      <i class="fas fa-circle-notch fa-spin "></i>
                      <small className="pl-3">Loading</small>

                    </>
                    :'Reset password'
                  }
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href={null}
              onClick={(e) => {
                this.props.history.push('/auth/login')
              }}
            >
              <small>Login</small>
            </a>
          </Col>
          
        </Row>
      </Col>
    </>
    );
  }
}

export default ForgetPassword;