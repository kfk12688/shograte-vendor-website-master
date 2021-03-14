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

class ForgetPasswordVerifyOtp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isSubmitted:false,
          email: this.props.match.params.email,
          otp: '',
          errors: {
            email: '',
            otp: '',
          },
          formResponse:{
          },
        };      

    }

    componentDidMount(){

      //check for email in the url

      const urlParams = new URLSearchParams(window.location.search); 
      const emails = urlParams.get('email')

      if(emails){
        this.setState({
          email:emails
        })
      }else{
        this.props.history.push(`/auth/forget-password?email=required`);
      }
      
      console.log('email from qry',emails);


      
    }

  
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
            case 'otp': 
            errors.otp = 
              value.length < 0
                ? 'Otp required!'
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
        const {email,otp}=this.state;
        if(email){
            if(!otp){
              errors.otp = 'OTP required!';
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

      this.setState({
        isSubmitted:true
      })


      this.validateForms()
        event.preventDefault();
        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form')

            let formData={
                email:this.state.email,
                otp:this.state.otp,
            }

            api.admin_users('/adminusers/forget-password-otp-verify').verify_code(formData).then(({ data }) => {  
              
              if(data.success == true){
                //redirect to update password
                this.props.history.push(`/auth/update-password?token=${data.token}`);
              }else{
                this.setState({
                  formResponse:{
                    success:data.success,
                    message:data.message
                  }
                })
              }

              this.setState({
                isSubmitted:false
              })
             
              console.log('formResponse',this.state.formResponse);
        
            }).catch((error)=>{

              this.setState({
                formResponse:{
                  success:false,
                  msg:"Error occured!"
                }
              })
              console.log('error',error);

              this.setState({
                isSubmitted:false
              })

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
              
              <small>
                Enter the code send to  <h5 className="text-primary">{this.state.email}</h5>
              </small>
                <a href={null} onClick={(e) => {
                  this.props.history.push('/auth/forget-password')
                }}>
                  Edit email
                </a>
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
            
              <FormGroup  className={errors.otp.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Otp"
                    type="text"                    
                    autoComplete="new-email"                    
                    name="otp"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                 

                </InputGroup>

                {errors.otp.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.otp}</span>
                      </div>
                }

              </FormGroup>              

              <div className="text-center"> 
                <Button className="my-4" color="primary" type="submit" disabled={isSubmitted}>
                  {
                    isSubmitted ?
                    <>
                      
                      <i class="fas fa-circle-notch fa-spin "></i>
                      <small className="pl-3">Verify</small>

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
              href="#pablo"
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

export default ForgetPasswordVerifyOtp;