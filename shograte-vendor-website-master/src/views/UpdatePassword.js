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

class UpdatePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isSubmitted:false,
          email: '',
          password: '',
          c_password: '',
          errors: {
            password: '',
            c_password: '',
          },
          formResponse:{
          },
        };      

    }

    componentDidMount(){

      //check for email in the url

      const urlParams = new URLSearchParams(window.location.search); 
      const token = urlParams.get('token')

      if(token){
        this.setState({
          token:token
        })
      }else{
        this.props.history.push(`/auth/forget-password?email=required`);
      }
      
      console.log('email from qry',token);


      
    }

  
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'password': 
            errors.password = 
              value.length < 0
                ? 'Password required!'
                : '';
            break;

        case 'c_password': 
            errors.c_password = 
              value.length < 0
                ? 'Confirm Password required!'
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
        const {password,c_password}=this.state;
        if(!password || !c_password){
          if(!password){
            errors.password = 'Password required!';
          }
          if(!c_password){
            errors.c_password = 'Confirm Password required!';
          }  
          this.setState({errors})    
        }

        if(password && c_password){
          if(password != c_password){
            errors.c_password = 'Confirm Password does not match with password!';
          }else{
            errors.c_password = '';
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
                token:this.state.token,
                password:this.state.password,
            }

            console.log('forma data',formData);

            api.admin_users('/adminusers/update-password').update_password(formData).then(({ data }) => {  
              
              if(data.success == true){
                //redirect to update password
                this.props.history.push(`/auth/login?password=updated`);
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
              <small>Update Password</small>
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
              <FormGroup  className={errors.password.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"                    
                    autoComplete="new-password"                    
                    name="password"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                 

                </InputGroup>


                {errors.password.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.password}</span>
                      </div>
                }

              </FormGroup>

              <FormGroup  className={errors.c_password.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"                    
                    autoComplete="new-password"                    
                    name="c_password"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                 

                </InputGroup>


                {errors.c_password.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.c_password}</span>
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
                    :'Update password'
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

export default UpdatePassword;