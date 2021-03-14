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

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import api from '../services/api';

class Login extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };  

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        errors: {
          email: '',
          password: ''
        },
        formResponse:{
        
        }
      };      

  }

    componentDidMount(){

      //get url params to show alert and error message

      const urlParams = new URLSearchParams(window.location.search); 
      const login = urlParams.get('login')
      const password = urlParams.get('password')

      if(login==='failed'){
        this.setState({
          formResponse:{
            success:false,
            msg:"Login required to access the page."
          }
        })
      }

      if(password==='updated'){
        this.setState({
          formResponse:{
            success:true,
            msg:"Password updated please login to your account."
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
            
            case 'password': 
            errors.password = 
                value.length < 0
                ? 'Password required!'
                : '';
            break;
            
            default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            //console.log(errors)
        })
  }

  validateForms=()=>{
        let errors = this.state.errors;
        const {email,password}=this.state;
        if(!email || !password){
            if(!email){
                errors.email = 'Email required!';
            }

            if(!password){
                errors.password ='Password required!';
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
        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form')

            let formData={
                email:this.state.email,
                password:this.state.password
            }

            api.common('/vendor/login').login(formData).then(({ data }) => {  
      
              if(data.success == true){ 
                const { cookies } = this.props; 
                 //set cookie value
                 //cookies.set('token', data.token, { path: '/' });
                
                 localStorage.setItem('v_token', data.token); 
                 this.props.history.push('/admin');
              }else{
                this.setState({
                  formResponse:{
                    success:false,
                    msg:data.msg
                  }
                })
              }
              console.log('formResponse',this.state.formResponse);
        
            }).catch((error)=>{
              
              console.log('error',error);
            })


        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,email,password,formResponse} = this.state;

    return (
      <>
        <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         
          <CardBody className="px-lg-5 py-lg-5">

            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in</small>
            </div>

            {
              formResponse.success ==false && 
                <UncontrolledAlert color="warning" fade={false}>
                
                <span className="alert-inner--text">
                  {
                    formResponse.msg
                  }
                </span>
              </UncontrolledAlert>
            }

            {
              formResponse.success ==true && 
                <UncontrolledAlert color="success" fade={false}>
                
                <span className="alert-inner--text">
                  {
                    formResponse.msg
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
              <FormGroup className={errors.password.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
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
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>

              */}

              <div className="text-center"> 
                <Button className="my-4" color="primary" type="submit">
                  Sign in
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
                this.props.history.push('/auth/forget-password')
              }}
            >
              <small>Forgot password?</small>
            </a>
          </Col>


          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href={null}
              onClick={(e) => {
                this.props.history.push('/auth/register')
              }}
            >
              <small>Create new account</small>
            </a>
          </Col>
          
        </Row>
      </Col>
    </>
    );
  }
}

export default withCookies(Login);