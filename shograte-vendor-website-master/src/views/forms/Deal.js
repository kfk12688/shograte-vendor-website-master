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

  product_id: yup
  .string('Enter Product Name')
  .required('Product Name is required'),

  deal_name: yup
  .string('Enter Deal Name')
  .required('Deal Name is required'),

  deal_desc: yup
  .string('Enter Deal Description')
  .required('Deal Description  is required'),

  // deal_image: yup
  // .string('Choose image')
  // .required('image  is required'),

    milestones: yup.array()
     .of(
      yup.object().shape({
        name: yup.string().required('Name Required'),
        quantity: yup.string().required('Quantity Required'),
        value: yup.string().required('Value Required'),
       })
     )
     .required('Must have milestones') // these constraints are shown if and only if inner constraints are satisfied
     .min(1, 'Minimum of 1 milestones'),


});

const Deal =(props)=>{

  const { singleDeal } = props; 

  const formik = useFormik({
    initialValues: {      
      product_id:singleDeal.product_id ? singleDeal.product_id : "",
      deal_name:singleDeal.deal_name ? singleDeal.deal_name : "",
      deal_desc: singleDeal.deal_desc ? singleDeal.deal_desc : "",
      deal_image: singleDeal.deal_image ? singleDeal.deal_image : "",
      deal_desc: singleDeal.deal_desc ? singleDeal.deal_desc : "",
      deal_desc: singleDeal.deal_desc ? singleDeal.deal_desc : "",
      deal_desc: singleDeal.deal_desc ? singleDeal.deal_desc : "",
      milestones: singleDeal.milestones ? singleDeal.milestones :[
        {
          name: '',
          quantity: '',
          value: '',
        },
      ],
     
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
                    <h3 className="mb-0">Deal</h3>
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
                            Product
                          </label>

                          <Select
                          placeholder="Select Product"
                          name="product_id"
                          isClearable={true}                          
                          options={props.productsList}
                          onChange={(e)=>{
                            handleSelectChange1(e,'product_id')
                          } }
                          
                          />

                        {formik.errors.product_id &&
                          <div className="text-muted text-left">
                          <span className='text-danger '>{formik.errors.product_id}</span>
                          </div>
                        }


                        </FormGroup>
                      </Col>
                      <Col lg="6">
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
                              name="deal_image"
                              value={formik.values.deal_image}
                              onChange={formik.handleChange}

                            />

                            {formik.errors.deal_image &&
                              <div className="text-muted text-left">
                              <span className='text-danger '>{formik.errors.deal_image}</span>
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
                            htmlFor="input-deal_name"
                          >
                           Deal Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-deal_name"
                            placeholder="Deal name"
                            type="text"
                            name="deal_name"
                            value={formik.values.deal_name}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.deal_name &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.deal_name}</span>
                            </div>
                          }


                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-deal_desc"
                          >
                            Deal Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-deal_desc"
                            placeholder="Product Description"
                            type="textarea"
                            name="deal_desc"
                            value={formik.values.deal_desc}
                            onChange={formik.handleChange}

                          />

                          {formik.errors.deal_desc &&
                            <div className="text-muted text-left">
                            <span className='text-danger '>{formik.errors.deal_desc}</span>
                            </div>
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  
                  {/* product variations */}                 

                  <Row>

                    <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">   Deal Milestones 
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
                      name="milestones"
                      render={arrayHelpers => (
                        <>
                              <div>
                                {values.milestones.map((milestone, index) => (
                                    <div key={index}>
                                        <div className="pl-lg-4">
                                                  <Row>
                                                    <Col lg="4">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-username"
                                                        >
                                                          Name
                                                        </label>                                                      
                                                        
                                                      <Input
                                                        name={`milestones[${index}].name`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Name"
                                                        type="text" 
                                                        value={milestone.name}
                                                        onChange={formik.handleChange}
                                                      /> 
                                                      </FormGroup>


                                                      <ErrorMessage
                                                        name={`milestones.${index}.name`}
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
                                                        name={`milestones[${index}].quantity`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Quantity"
                                                        type="text" 
                                                        value={milestone.quantity}
                                                        onChange={formik.handleChange}
                                                      /> 

                                                    </FormGroup>


                                                    <ErrorMessage
                                                        name={`milestones.${index}.quantity`}
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
                                                      Value
                                                      </label>

                                                      <Input
                                                        name={`milestones[${index}].value`} 
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Value"
                                                        type="text" 
                                                        value={milestone.value}
                                                        onChange={formik.handleChange}
                                                      /> 

                                                    </FormGroup>

                                                    <ErrorMessage
                                                        name={`milestones.${index}.value`}
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
                                  name: '',
                                  quantity: '',
                                  value: '',
                                })}
                                size="sm"
                                >
                                + milestone
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

export default Deal;