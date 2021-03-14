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
import api from '../services/api';

class Register extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        isSubmit:false,
        vendor_name:'',
        mobile:'',
        owner_name:'',
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
            vendor_name:'',
            mobile:'',
            owner_name:'',
        },
        formResponse:{
        }
      };      

  }

    componentDidMount(){

    }  
  
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
            case 'vendor_name': 
            errors.vendor_name = 
              value.length < 0
                ? 'Name required!'
                : '';
            break;

            case 'mobile': 
            errors.mobile = 
              value.length < 0
                ? 'Mobile required!'
                : '';
            break;

            case 'owner_name': 
            errors.owner_name = 
              value.length < 0
                ? 'Owner Name required!'
                : '';
            break;

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
            console.log(errors)
        })


  }

  validateForms=()=>{
        let errors = this.state.errors;
        const {email,password,mobile,owner_name,vendor_name}=this.state;
        if(!email || !password || !mobile || !owner_name || !vendor_name){

            if(!mobile){
              errors.mobile = 'Mobile required!';
            }

            if(!owner_name){
            errors.owner_name = 'Owner Name required!';
            }

            if(!vendor_name){
            errors.vendor_name = 'Name required!';
            }

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

          this.setState({isSubmit:true})
            console.info('Valid Form')

            let formData={
                email:this.state.email,
                password:this.state.password,
                mobile:this.state.mobile,
                vendor_name:this.state.vendor_name,
                owner_name:this.state.owner_name
            }

            api.common('/vendor/register').login(formData).then(({ data }) => {
              this.setState({isSubmit:false})
              if(data.success == true){
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

    const {errors,email,password,mobile,owner_name,vendor_name,formResponse} = this.state;

    return (
      <>
        <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         
          <CardBody className="px-lg-5 py-lg-5">

            <div className="text-muted text-center mt-2 mb-3">
              <small>Create New Account</small>
            </div>

            {
              formResponse.success ==false && 
                <UncontrolledAlert color={formResponse.success == false ?'warning':'success'} fade={false}>
                
                <span className="alert-inner--text">
                  {
                    formResponse.msg
                  }
                </span>
              </UncontrolledAlert>
            }
            
            
          <Form role="form" onSubmit={this.handleSubmit} noValidate>

            <FormGroup className={errors.vendor_name.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                
                <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="new-password"
                    name="vendor_name"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                  
                {errors.vendor_name.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.vendor_name}</span>
                      </div>
                }
              </FormGroup>


              <FormGroup className={errors.owner_name.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                
                <Input
                    placeholder="Owner Name"
                    type="text"
                    autoComplete="new-password"
                    name="owner_name"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                  
                {errors.owner_name.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.owner_name}</span>
                      </div>
                }
              </FormGroup>


              <FormGroup className={errors.mobile.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                
                <Input
                    placeholder="Mobile"
                    type="text"
                    autoComplete="new-password"
                    name="mobile"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                  
                {errors.mobile.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.mobile}</span>
                      </div>
                }
              </FormGroup>



              <FormGroup  className={errors.email.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                <Input
                    placeholder="Email"
                    type="email"                    
                    autoComplete="new-email"                    
                    name="email"
                    onChange={ (e)=>{this.handleChange(e)}}
                  /> 

                {errors.email.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.email}</span>
                      </div>
                }
              </FormGroup>


              <FormGroup className={errors.password.length > 0 ? ' mb-3 has-danger':'mb-3'}>
                
                <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={ (e)=>{this.handleChange(e)}}
                  />                  
                {errors.password.length > 0  && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.password}</span>
                      </div>
                }
              </FormGroup>           


              <div className="text-center"> 
                <Button className="my-4" color="primary" type="submit" disabled={this.state.isSubmit}>
                 
                 {this.state.isSubmit ?'Creating...' :'Create'}

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

export default Register;