import React , { useState,useEffect } from "react";
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

import { useFormik,FieldArray ,Field,ErrorMessage,FormikProvider } from 'formik';
import * as yup from 'yup';

import Select from 'react-select';

const validationSchema = yup.object({

  product_name: yup
  .string('Enter Product Name')
  .required('Product Name is required'),

  product_desc: yup
  .string('Enter Product description')
  .required('Product description is required'),

  category_id: yup
  .string('Select Category')
  .required('Category  is required'),

  sub_category_id: yup
  .string('Select Sub Category')
  .required('Sub Category is required'),

  product_image: yup
  .string('Choose image')
  .required('image  is required'),
  brand_name: yup
  .string('Enter Brand Name')
  .required('Brand Name  is required'),
  no_of_units: yup
  .string('Enter No Of Units')
  .required('No Of Units  is required'),
  no_of_items: yup
  .string('Enter No Of items')
  .required('No Of items  is required'),
  included_Components: yup
  .string('Enter Included Components')
  .required('Included Component  is required'),  
  manufacturer: yup
  .string('Enter Manufacturer')
  .required('Manufacturer  is required'),
  country_of_origin: yup
  .string('Enter Country Of Origin')
  .required('Country Of Origin  is required'),
  height: yup
  .string('Enter Height')
  .required('Height is required'),
  length: yup
  .string('Enter Length')
  .required('Length is required'),
  width: yup
  .string('Enter Width')
  .required('Width is required'),
  size: yup
  .string('Enter size')
  .required('size is required'),
  color: yup
  .string('Enter color')
  .required('color is required'),


  //variation validation min one required

  variations: yup.array()
     .of(
      yup.object().shape({
        size: yup.string().required('Size Required'),
        color: yup.string().required('Color Required'),
        material: yup.string().required('Material Required'),
        quantity: yup.string().required('Quantity Required'),
        design: yup.string().required('Design Required'),
       })
     )
     .required('Must have variations') // these constraints are shown if and only if inner constraints are satisfied
     .min(1, 'Minimum of 1 variations'),


});

const Product =(props)=>{

  const { singleProduct } = props; 

  const formik = useFormik({
    initialValues: {      
      product_name:singleProduct.product_name ? singleProduct.product_name : "",
      brand_name:singleProduct.brand_name ? singleProduct.brand_name : "",
      product_desc: singleProduct.product_desc ? singleProduct.product_desc : "",
      category_id: singleProduct.category_id ? singleProduct.category_id : "",
      sub_category_id: singleProduct.sub_category_id ? singleProduct.sub_category_id : "",
      product_image: singleProduct.product_image ? singleProduct.product_image : "",
      product_images: singleProduct.product_images ? singleProduct.product_images : "",
      no_of_units: singleProduct.no_of_units ? singleProduct.no_of_units : "",
      no_of_items: singleProduct.no_of_items ? singleProduct.no_of_items : "",
      included_Components: singleProduct.included_Components ? singleProduct.included_Components : "",
      manufacturer: singleProduct.manufacturer ? singleProduct.manufacturer : "",
      country_of_origin: singleProduct.country_of_origin ? singleProduct.country_of_origin : "",
      height: singleProduct.product_images ? singleProduct.height : "",
      length: singleProduct.length ? singleProduct.length : "",
      width: singleProduct.width ? singleProduct.width : "",
      height: singleProduct.height ? singleProduct.height : "",
      size: singleProduct.size ? singleProduct.size : "",
      color: singleProduct.color ? singleProduct.color : "",
      variations: singleProduct.variations ? singleProduct.variations :[
        {
          size: '',
          color: '',
          material: '',
          quantity: '',
          design: '',
        },
      ],
      // friends:[
      //   {
      //     name:'',
      //     age:''
      //   }
      // ]
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      //pass data to props

      props.submitData(values);

    },
  });


  const  handleSelectChange1 = (e,name) => {
    if(e  && e.value){        
      formik.values[name]=e.value;
      // formik.errors[name]='';
    }else{
      formik.values[name]='';
    }
      console.log('event',formik.values);

  }

  const {values,errors}=formik;
  
  
  return(     

    <>

      {/* <PageHeader /> */}

      <Container className="mt--7" fluid>
      <Form onSubmit={formik.handleSubmit}>
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
                      type="submit"
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
               
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

                          <Select
                          placeholder="Select Category"
                          name="category_id"
                          isClearable={true}                          
                          options={props.categoriesList}
                          onChange={(e)=>{
                            handleSelectChange1(e,'category_id')
                          } }
                          
                          />

                        {formik.errors.category_id &&
                          <div className="text-muted text-left">
                          <span className='text-danger '>{formik.errors.category_id}</span>
                          </div>
                        }


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
                          

                          <Select
                          placeholder="Select Sub Category"
                          name="sub_category_id"
                          isClearable={true}                          
                          options={props.subCategoriesList}
                          onChange={(e)=>{
                            handleSelectChange1(e,'sub_category_id')
                          } }
                          
                          />


                          {formik.errors.sub_category_id &&
                              <div className="text-muted text-left">
                              <span className='text-danger '>{formik.errors.sub_category_id}</span>
                              </div>
                            }


                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-product_name"
                          >
                            Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-product_name"
                            placeholder="Product name"
                            type="text"
                            name="product_name"
                            value={formik.values.product_name}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.product_name &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.product_name}</span>
                            </div>
                          }


                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-product_desc"
                          >
                            Product Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-product_desc"
                            placeholder="Product Description"
                            type="textarea"
                            name="product_desc"
                            value={formik.values.product_desc}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.product_desc &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.product_desc}</span>
                            </div>
                          }
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
                            name="brand_name"
                            value={formik.values.brand_name}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.brand_name &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.brand_name}</span>
                            </div>
                          }
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
                            name="no_of_units"
                            value={formik.values.no_of_units}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.no_of_units &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.no_of_units}</span>
                            </div>
                          }
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
                            name="no_of_items"
                            value={formik.values.no_of_items}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.no_of_items &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.no_of_items}</span>
                            </div>
                          }
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
                            name="included_Components"
                            value={formik.values.included_Components}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.included_Components &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.included_Components}</span>
                            </div>
                          }
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
                            name="manufacturer"
                            value={formik.values.manufacturer}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.manufacturer &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.manufacturer}</span>
                            </div>
                          }
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
                            name="country_of_origin"
                            value={formik.values.country_of_origin}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.country_of_origin &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.country_of_origin}</span>
                            </div>
                          }
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
                            name="height"
                            value={formik.values.height}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.height &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.height}</span>
                            </div>
                          }
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
                            name="length"
                            value={formik.values.length}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.length &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.length}</span>
                            </div>
                          }
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
                            name="width"
                            value={formik.values.width}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.width &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.width}</span>
                            </div>
                          }
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
                            name="size"
                            value={formik.values.size}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.size &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.size}</span>
                            </div>
                          }
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
                            name="color"
                            value={formik.values.color}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.color &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.color}</span>
                            </div>
                          }
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
                            name="product_image"
                            value={formik.values.product_image}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.product_image &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.product_image}</span>
                            </div>
                          }
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
                      {/* {formik.errors.variations &&
                              <div className="text-muted text-left">
                              <span className='text-danger '>{formik.errors.variations}</span>
                              </div>
                            } */}
                    </Col>

                  </Row>
                  <FormikProvider value={formik}>
                  <Row>
                  <FieldArray
                      name="variations"
                      render={arrayHelpers => (
                        <>
                              <div>
                                {values.variations.map((variation, index) => (
                                    <div key={index}>
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
                                                        name={`variations[${index}].size`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Size"
                                                        type="text" 
                                                        value={variation.size}
                                                        onChange={formik.handleChange}
                                                      /> 
                                                      </FormGroup>


                                                      <ErrorMessage
                                                        name={`variations.${index}.size`}
                                                        component="div"
                                                        className="text-danger"
                                                      />

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
                                                        name={`variations[${index}].color`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Color"
                                                        type="text" 
                                                        value={variation.color}
                                                        onChange={formik.handleChange}
                                                      /> 


                                                      </FormGroup>

                                                      <ErrorMessage
                                                        name={`variations.${index}.color`}
                                                        component="div"
                                                        className="text-danger"
                                                      />


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
                                                        name={`variations[${index}].material`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Material"
                                                        type="text" 
                                                        value={variation.material}
                                                        onChange={formik.handleChange}
                                                      /> 
                                                    </FormGroup>


                                                    <ErrorMessage
                                                        name={`variations.${index}.material`}
                                                        component="div"
                                                        className="text-danger"
                                                      />


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
                                                        name={`variations[${index}].quantity`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Quantity"
                                                        type="text" 
                                                        value={variation.quantity}
                                                        onChange={formik.handleChange}
                                                      /> 

                                                    </FormGroup>


                                                    <ErrorMessage
                                                        name={`variations.${index}.quantity`}
                                                        component="div"
                                                        className="text-danger"
                                                      />


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
                                                        name={`variations[${index}].design`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Design"
                                                        type="text" 
                                                        value={variation.design}
                                                        onChange={formik.handleChange}
                                                      /> 

                                                    </FormGroup>

                                                    <ErrorMessage
                                                        name={`variations.${index}.design`}
                                                        component="div"
                                                        className="text-danger"
                                                      />


                                                  </Col>  
                                                </Row>
                                              </div>


                                      <Button
                                        color="danger"
                                        href={null}
                                        onClick={() => arrayHelpers.remove(index)}
                                        size="sm"
                                        >
                                              x remove
                                      </Button>
                                    
                                    </div>
                                ))}

                                <Button
                                color="primary"
                                href={null}
                                onClick={() => arrayHelpers.push({
                                  size: '',
                                  color: '',
                                  material: '',
                                  quantity: '',
                                  design: '',
                                })}
                                size="sm"
                                >
                                + variation
                                </Button>
                            </div>
                        </>
                      )}
                      />                      
                  </Row>
                  </FormikProvider>

                  <hr className="my-4" />

                  {/* end of product variations */}

              </CardBody>
            </Card>
          </Col>
        </Row>
        </Form>
      </Container>
   
      </>

  )



}

export default Product;