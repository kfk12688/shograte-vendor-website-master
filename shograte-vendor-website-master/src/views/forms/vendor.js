import React from "react";
// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";

class Vendor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          vendor_name: '',
          mobile: '',
          email: '',
          errors: {
            vendor_name: '',
            mobile: '',
            email: ''
          }
        };
     

      }

    componentDidMount(){

      console.log('singleVendor',this.props.singleVendor);
        if(this.props.singleVendor){

            const{_id,email,vendor_name,mobile,is_active}= this.props.singleVendor;

            this.setState({
              vendor_id:_id,
              vendor_name:vendor_name,
              mobile:mobile,
              email:email,
            });

        }
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
            case 'vendor_name': 
              errors.vendor_name = 
                value.length < 0
                  ? 'Name cannot empty!'
                  : '';
            break; 
            
            case 'email': 
              errors.email = 
                value.length < 0
                  ? 'Email cannot empty!'
                  : '';
            break;   

            case 'mobile': 
              errors.mobile = 
                value.length < 0
                  ? 'Mobile cannot empty!'
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
        const {vendor_id,vendor_name,email,mobile}=this.state;
        if(!vendor_name || !vendor_id || !email || !mobile){
            if(!vendor_id){
                errors.vendor_id = 'Vendor cannot be empty!';
            }

            if(!vendor_name){
              errors.vendor_name ='Name cannot be empty!';
          }

            if(!email){
                errors.email ='Email cannot be empty!';
            }

            if(!mobile){
              errors.mobile ='Mobile cannot be empty!';
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
                _id:this.state.vendor_id,
                email:this.state.email,
                mobile:this.state.mobile,
                vendor_name:this.state.vendor_name
            }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,vendor_name,email,mobile,active_status} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.vendor_name.length > 0 ? 'has-danger':''}>
                  <Input
                    className={errors.vendor_name.length > 0 ? 'is-invalid':''}
                    placeholder="Enter Name"
                    type="text"
                    name='vendor_name' onChange={this.handleChange}
                    value={vendor_name}                    
                  />
                  {errors.vendor_name.length > 0 && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.vendor_name}</span>
                      </div>
                  }
                </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup className={errors.email.length > 0 ? 'has-danger':''}>
                  <Input
                    className={errors.email.length > 0 ? 'is-invalid':''}
                    placeholder="Email"
                    type="email"
                    name='email' onChange={this.handleChange}
                    value={email}
                    
                  />
                  {errors.email.length > 0 && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.email}</span>
                      </div>
                  }
                </FormGroup>
            </Col>


            <Col md="12">
              <FormGroup className={errors.mobile.length > 0 ? 'has-danger':''}>
                  <Input
                    className={errors.mobile.length > 0 ? 'is-invalid':''}
                    placeholder="Mobile"
                    type="text"
                    name='mobile' onChange={this.handleChange}
                    value={mobile}                    
                  />
                  {errors.mobile.length > 0 && 
                      <div className="text-muted text-left">
                          <span className='text-danger '>{errors.mobile}</span>
                      </div>
                  }
                </FormGroup>
            </Col>
          </Row>

        <div className="text-center">
            <Button
            className="my-4"
            color="primary"
            type="submit"
            >
                Submit
            </Button>
        </div>


        </Form>
      </>
    );
  }
}

export default Vendor;