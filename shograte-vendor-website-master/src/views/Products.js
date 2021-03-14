
import React, { useState,useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  Modal,
  UncontrolledAlert 
} from "reactstrap";
// core components
import PageHeader from "components/Headers/PageHeader.js";
import Pagination from "react-js-pagination";
import api from '../services/api';
import Product from "./forms/Product";
import ModalSuccess from '../components/Common/ModalSuccess';

const Products = (props) => {

  const [copiedText, setCopiedText] = useState();
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, [activePage]);


  const toggleModal = () => {
    setSingleProduct({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{

      api.common('products/list?page='+currentPage).getAll().then(({ data }) => {
        console.log('data',data);
        if(data.success == true){
          setProducts(data.data);
          setPaginationData(data.pagination);
        }

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.status);

          if(error.response.status == 401){
            props.history.push('/auth/login?login=failed');
          }
        }
      });


      //load catories list
      api.common('category/list?size=10000').getAll().then(({ data }) => {
        if(data.success == true){

          let categoriesdata=data.data;
          let categoriesTmp=[];
          if(categoriesdata.length > 0){  
            categoriesdata.forEach(element => {
              categoriesTmp.push({
                label:element.category_name,
                value:element._id,
              })
            });

          }

          setCategoriesList(categoriesTmp);

          console.log('cates',categoriesTmp);
        }
      })


      //load sub catories list
      api.common('subcategory/list?size=10000').getAll().then(({ data }) => {
        if(data.success == true){

          let sub_categoriesdata=data.data;
          let sub_categoriesTmp=[];
          if(sub_categoriesdata.length > 0){  
            sub_categoriesdata.forEach(element => {
              sub_categoriesTmp.push({
                label:element.subcategory_name,
                value:element._id,
              })
            });

          }

          setSubCategoriesList(sub_categoriesTmp);

          console.log('sub cat',subCategoriesList);
        }
      })
  }


  const getSingleData=(id)=>{

    api.common('products/list/'+id).getOne().then(({ data }) => {
      console.log('value',data);
      if(data.success == true){
        setSingleProduct(data.data);
        setFormModal(!formModal)  
      }

    })

}


const submitData=(formData)=>{    

  let url='products/add';
  if(Object.keys(singleProduct).length > 0){
    url='products/update/'+singleProduct._id;
  }
 
  console.log('url',url);

  api.common(url).update(formData).then(({ data }) => {  
    
    setFormResponse(data);
    if(data.success == true){  
      setFormModal(!formModal)          
      setNotificationModal(!notificationModal)
      getData();  
    }
    console.log('formResponse',formResponse);

  }).catch((error)=>{
    setFormResponse({
      success:false,
      msg:"Error occured!"
    });
    console.log('error',error);
  })
  
}


  const changeStatus=(id,value)=>{ 
    
    let confirmDialog =window.confirm('Are you sure , you want to change the status.');

    if(!confirmDialog){
      return null;
    }

    let url='products/changeStatus/'+id;
 
    console.log('url',url);

    let formData={
      is_active:!value
    }

    api.common(url).update(formData).then(({ data }) => {  
      
      setFormResponse(data);
      if(data.success == true){           
        setNotificationModal(!notificationModal)
        getData();  
      }
      console.log('formResponse',formResponse);

    }).catch((error)=>{
      setFormResponse({
        success:false,
        msg:"Error occured!"
      });
      console.log('error',error);
    })
    
  }


  const handleSelected=(page)=>{

    setActivePage(page);
    setCurrentPage(page-1);
    getData();
      console.log('page',page);
  }


  const renderTableTr=(data)=>{
    

    if(data.length == 0){
        return(
          <>
            <tr aria-colspan="3">
                <th scope="col">No Records.</th>
            </tr>
          </>
        )
    }else{

      let currentPageIndex=paginationData.limit;
      let newIndex=currentPageIndex*currentPage;

      return data.map((data, index) => {
        const { vendor_name, category_name,sub_category_name,product_name,product_desc,is_active,_id } = data //destructuring
        return (
           <tr key={index}>
              <td>{parseInt(newIndex)+parseInt(index)+1}</td>
              <td>{product_name}</td>
              <td>{product_desc}</td>
              <td>{category_name}</td>
              <td>{sub_category_name}</td>
              <td>
                  {is_active &&
                    <Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" />
                    Active
                  </Badge>
                  }

                  {!is_active &&
                    <Badge color="" className="badge-dot mr-4">
                    <i className="bg-danger" />
                    Inactive
                  </Badge>
                  }

              </td>
              <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => changeStatus(_id,is_active)}
                          >
                            Set {is_active ?"Inactive":"Active"}
                          </DropdownItem>
                          {/* <DropdownItem
                            href="#pablo"
                            onClick={(e) => getSingleData(_id)}
                          >
                            View
                          </DropdownItem> */}

                           <DropdownItem
                            href={null}
                            onClick={(e) => getSingleData(_id)}
                          >
                            Edit
                          </DropdownItem>  

                        </DropdownMenu>

                      </UncontrolledDropdown>
                    </td>
           </tr>
        )
     })
    }

  }

  return (
    <>
      <PageHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow" style={{minHeight:300}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">

                  <div className="col">
                    <h3 className="mb-0">Products List</h3>                    
                  </div>

                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href={null}
                      onClick={(e) => toggleModal()}
                      size="sm"
                    >
                      Add New Product
                    </Button>
                  </Col>               
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SNo</th>
                    <th scope="col">P Name</th>
                    <th scope="col">P Desc</th>
                    <th scope="col">Category</th>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>    

                    {renderTableTr(products)}  
                                    
                </tbody>

              </Table>


                {
                  Object.keys(paginationData).length >0 && 
                  
                  <>  
                      <nav className="pagination justify-content-center pt-3" aria-label="pagination">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={paginationData.limit}
                          totalItemsCount={paginationData.totalDocs}
                          pageRangeDisplayed={paginationData.limit}
                          onChange={handleSelected}
                          itemClass={'page-item'}
                          linkClass={'page-link'}
                        />
                      </nav>
                  </>

                }            

              
            </Card>
          </Col>
        </Row>


           {/* modal */}
            
           <Modal
              className="modal-dialog-centered"
              size="xl"
              isOpen={formModal}
              toggle={() => toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0" >
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                    <small>                       
                        {
                          Object.keys(singleProduct).length > 0?'Edit ':'Add new '
                        } Product
                        </small>
                    </div>
                      
                    {
                      formResponse.success ==false && 
                        <UncontrolledAlert color="warning" fade={false}>
                        
                        <span className="alert-inner--text">
                          Could not save!
                        </span>
                      </UncontrolledAlert>
                    }
                    

                  </CardHeader>
                  <CardBody className="px-lg-5">                   
                      {/* load product form data */}
                      
                      <Product singleProduct={singleProduct} submitData={submitData} categoriesList={categoriesList} subCategoriesList={subCategoriesList} />


                  </CardBody>
                </Card>
              </div>
            </Modal>
            {/* end of modal */}

            {/* success modal */}

             <ModalSuccess formResponse={formResponse} toggleNotification={toggleNotificationModal} notify={notificationModal}  />

            {/* success modal */} 


  </Container>
    </>
  );
};

export default Products;
