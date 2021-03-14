import React from "react";
// reactstrap components
import {
  FormGroup,
  Form,
  Row,
  Col,
  Button
} from "reactstrap";

class Vendor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          vendor_id: '',
          active_status:false,
          errors: {
            vendor_id: '',
            active_status: ''
          }
        };
     

      }

    componentDidMount(){
        if(this.props.singleVendor){

            const{_id,is_active}= this.props.singleVendor;

            this.setState({
              vendor_id:_id,
              active_status:is_active
            });

        }
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'active_status': 
            errors.active_status = 
              value.length < 0
                ? 'Status cannot empty!'
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
        const {vendor_id,active_status}=this.state;
        if(!active_status || !vendor_id){
            if(!vendor_id){
                errors.vendor_id = 'Vendor cannot be empty!';
            }

            if(!active_status){
                errors.active_status ='Status cannot be empty!';
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
                is_active:this.state.active_status
            }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,vendor_id,active_status} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.active_status.length > 0 ? 'has-danger':''}>
                <select className="form-control" name="active_status" onChange={this.handleChange} value={active_status}>
                  <option value={false} >Inactive</option>
                    <option value={true} >Active</option>
                    
                </select>

               
                {errors.active_status.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.active_status}</span>
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