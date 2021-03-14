import React from "react";
// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";

import Select from 'react-select';

import PageHeader from "components/Headers/PageHeader.js";

class Productss extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedOption: '',
          selectedSubOption: '',
          imagePreviewUrl:'',
          product_name: '',
          product_desc: '',          
          category_id: '',          
          sub_category_id:'',
          product_image:'',
          product_images:'',
          errors: {
            category_id: '',
            sub_category_id: '',
            product_name: '',
            product_desc: '',
            product_image: '',
            product_images: ''
          }
        };      

      }

    componentDidMount(){

        if(this.props.singleProduct){

            const{category_id,sub_category_id,product_name,product_desc,product_image,product_images}= this.props.singleProduct;

            this.setState({
                product_name:product_name,
                product_desc:product_desc
            });  
            
            if(product_image){
              this.setState({
                imagePreviewUrl:'http://localhost:8080/uploads/'+product_image[0]
             });  
            }
            
            let selected=this.props.categoriesList.find(x => x.value === category_id);
            this.setState({ selectedOption:selected });

            let selectedSub=this.props.subCategoriesList.find(x => x.value === sub_category_id);
            this.setState({ selectedSubOption:selectedSub });
            console.log('cat selected',selected);
            
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
                ? 'Category cannot empty!'
                : '';
            break;
            
            case 'sub_category_id': 
            errors.sub_category_id = 
                value.length < 0
                ? 'Sub Category cannot empty!'
                : '';
            break;

            case 'product_name': 
            errors.product_name = 
                value.length < 0
                ? 'Product Name cannot empty!'
                : '';
            break;
            
            
            case 'product_desc': 
            errors.product_desc = 
                value.length < 0
                ? 'Product Description cannot empty!'
                : '';
            break; 
            
            // case 'milestones': 
            // errors.milestones = 
            //     value.length < 0
            //     ? 'Milestones cannot empty!'
            //     : '';
            // break;
            
            default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
      }

    validateForms=()=>{
        let errors = this.state.errors;
        const {category_id,sub_category_id,product_name,product_desc,product_image}=this.state;
        if(!category_id || !sub_category_id || !product_name || !product_desc){
            if(!category_id){
                errors.category_id = 'Category cannot be empty!';
            }

            if(!sub_category_id){
                errors.sub_category_id ='Sub Category cannot be empty!';
            }


            if(!product_name){
              errors.product_name ='Product name cannot be empty!';
            }

            if(!product_desc){
              errors.product_desc ='Product description cannot be empty!';
            }

            this.setState({errors})
        }
    }


    _handleImageChange=(e)=> {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          product_image: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }

    handleSelectChange = (selectedOption ) => {

      let errors = this.state.errors;
      if(selectedOption ){
        errors.category_id = '';        
        this.setState({ category_id:selectedOption.value });
        this.setState({ selectedOption });
      }else{        
        errors.category_id = 'Category required!';
        this.setState({ selectedOption:'' });
        this.setState({ category_id:'' });
      }

      this.setState({errors}, ()=> {
        console.log(errors)
      })
      
      console.log(`Option selected:`, selectedOption);
      console.log(`state:`, this.state);

    }


    handleSelectSubChange = (selectedSubOption ) => {
      let errors = this.state.errors;

      if(selectedSubOption ){

        errors.sub_category_id = '';
        
        this.setState({ sub_category_id:selectedSubOption.value });
        this.setState({ selectedSubOption });

      }else{
        
        errors.sub_category_id = 'Sub category required!';

        this.setState({ selectedSubOption:'' });
        this.setState({ sub_category_id:'' });

      }

      this.setState({errors}, ()=> {
        console.log(errors)
      })
      
      console.log(`Option selected:`, selectedSubOption);
      console.log(`state:`, this.state);

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


           const formData = new FormData();
           formData.append('category_id',this.state.category_id)
           formData.append('sub_category_id',this.state.sub_category_id)
           formData.append('product_name',this.state.product_name)
           formData.append('product_desc',this.state.product_desc)

           if(this.state.product_image){
            formData.append('product_image',this.state.product_image)
           }

            this.props.submitData(formData);
        }else{
            console.error('Invalid Form')
        }
    }

  render() {


    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{width:'50%'}} />);
    }

    const {errors,product_name,product_desc,category_id,sub_category_id,product_image,selectedOption,selectedSubOption} = this.state;

    return (
      <>

      <PageHeader />

      <Container className="mt--7" fluid>
        <Row>
         <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Product</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Basic information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Category
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                           Sub Category
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Product Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Product information
                  </h6>
                  <div className="pl-lg-4">
                     <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-brand-name"
                          >
                            Brand Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-brand-name"
                            placeholder="Brand Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number-of-units"
                          >
                            Number Of Units
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-number-of-units"
                            placeholder="Number Of Units"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number-of-items"
                          >
                            Number Of Items
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-number-of-items"
                            placeholder="Number Of Items"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-included-components"
                          >
                            Included components
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-included-components"
                            placeholder="Included components"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-manufacturer"
                          >
                            Manufacturer 
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-manufacturer"
                            placeholder="Manufacturer"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number-of-items"
                          >
                            Country of origin
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-number-of-items"
                            placeholder="Country of origin"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                 


                  </div>
                  <hr className="my-4" />
                  {/* Description */}

                  <h6 className="heading-small text-muted mb-4">
                    Product Specifications
                  </h6>
                  <div className="pl-lg-4">
                     <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-height"
                          >
                            Height
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-height"
                            placeholder="Height"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-length"
                          >
                            Length
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-length"
                            placeholder="Length"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number-of-items"
                          >
                            Width
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-width"
                            placeholder="Width"
                            type="number"
                          />
                        </FormGroup>
                      </Col>


                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-size"
                          >
                            Size
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-size"
                            placeholder="Size"
                            type="number"
                          />
                        </FormGroup>
                      </Col>


                    </Row>


                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-color"
                          >
                            Color
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-color"
                            placeholder="Color"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-manufacturer"
                          >
                            Image
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-image"
                            type="file"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-videos"
                          >
                            Videos
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-videos"
                            type="file"
                          />
                        </FormGroup>
                      </Col>


                    </Row>                


                  </div>
                  
                  
                  {/* product variations */}                 

                  <Row>

                    <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">   Product variations 
                      </h6>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href={null}
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        + variation
                      </Button>
                    </Col>

                  </Row>

                 

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Size
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Size"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                           Color
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Color"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                           Material
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Material"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Quantity
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Quantity"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Design
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Design"
                            type="text"
                          />
                        </FormGroup>
                      </Col>


                    </Row>
                  </div>
                  <hr className="my-4" />

                  {/* end of product variations */}

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
   

      </>
    );
  }
}

export default Productss;