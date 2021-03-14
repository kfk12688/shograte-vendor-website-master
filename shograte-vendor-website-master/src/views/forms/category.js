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

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          category_name: '',
          category_description: '',
          errors: {
            category_name: '',
            category_description: ''
          }
        };


      

      }

    componentDidMount(){
        if(this.props.singleCategory){

            const{category_name,category_desc}= this.props.singleCategory;

            this.setState({
                category_name:category_name,
                category_description:category_desc
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
          case 'category_name': 
            errors.category_name = 
              value.length < 0
                ? 'Category Name cannot empty!'
                : '';
            break;
            
            case 'category_description': 
            errors.category_description = 
                value.length < 0
                ? 'Category Description cannot empty!'
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
        const {category_name,category_description}=this.state;
        if(!category_name || !category_description){
            if(!category_name){
                errors.category_name = 'Category Name cannot be empty!';
            }

            if(!category_description){
                errors.category_description ='Category Name cannot be empty!';
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
                category_name:this.state.category_name,
                category_desc:this.state.category_description
            }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {

    const {errors,category_name,category_description} = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} noValidate>
         <Row>
            <Col md="12">
              <FormGroup className={errors.category_name.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.category_name.length > 0 ? 'is-invalid':''}
                  placeholder="Category name"
                  type="text"
                  name='category_name' onChange={this.handleChange}

                  value={category_name}
                  
                />
                {errors.category_name.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.category_name}</span>
                    </div>
                }
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className={errors.category_description.length > 0 ? 'has-danger':''}>
                <Input
                  className={errors.category_description.length > 0 ? 'is-invalid':''}
                  placeholder="Category Description"
                  type="text"
                  name='category_description' onChange={this.handleChange}
                  value={category_description}
                />

           

                {errors.category_description.length > 0 && 
                    <div className="text-muted text-left">
                        <span className='text-danger '>{errors.category_description}</span>
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

export default Category;