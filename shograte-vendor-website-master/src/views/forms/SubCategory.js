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

class SubCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          category_id: '',
          sub_category_name: '',
          sub_category_description: '',
          errors: {
            sub_category_name: '',
            sub_category_description: '',
            category_id: ''
          }
        };
      

      }

    componentDidMount(){
        if(this.props.singleSubCategory){

            const{sub_category_name,sub_category_description,category_id}= this.props.singleSubCategory;

            this.setState({
              sub_category_name:sub_category_name,
              sub_category_description:sub_category_description,
              category_id:category_id
            });

            
            // this.setState({ dealersOverallTotal: total }, () => {
            //     console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
            //   }); 
            
        }
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {

          case 'category_id': 
          errors.category_id = 
            value.length < 0
              ? 'Category required!'
              : '';
          break;

          case 'category_name': 
            errors.sub_category_name = 
              value.length < 0
                ? 'Sub Category Name cannot empty!'
                : '';
            break;
            
            case 'sub_category_description': 
            errors.sub_category_description = 
                value.length < 0
                ? 'Sub Category Description cannot empty!'
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
        const {sub_category_name,sub_category_description,category_id}=this.state;
        if(!sub_category_name || !sub_category_description || !category_id){
            if(!category_id){
                errors.category_id = 'Category required!';
            }

            if(!sub_category_name){
              errors.sub_category_name = 'Sub Category Name cannot be empty!';
          }

            if(!sub_category_description){
                errors.sub_category_description ='Sub Category Description cannot be empty!';
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
                category_id:this.state.category_id,
                category_name:this.state.category_name,
                category_desc:this.state.category_description
            }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,sub_category_name,sub_category_description,category_id} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.sub_category_name.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.sub_category_name.length > 0 ? 'is-invalid':''}
                  placeholder="Sub Category name"
                  type="text"
                  name='sub_category_name' onChange={this.handleChange}

                  value={sub_category_name}
                  
                />
                {errors.sub_category_name.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.sub_category_name}</span>
                    </div>
                }
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className={errors.sub_category_description.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.sub_category_description.length > 0 ? 'is-invalid':''}
                  placeholder="Sub Category Description"
                  type="text"
                  name='sub_category_description' onChange={this.handleChange}
                  value={sub_category_description}
                />

           

                {errors.sub_category_description.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.sub_category_description}</span>
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

export default SubCategory;