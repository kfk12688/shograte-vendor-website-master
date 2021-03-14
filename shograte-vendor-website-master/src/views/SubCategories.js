
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
import SubCategory from './forms/SubCategory'

const SubCategories = () => {

  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [subcategories, setSubCategories] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleSubCategory, setSingleSubCategory] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);


  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, [activePage]);


  const toggleModal = () => {
    setSingleSubCategory({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{
      api.common('subcategory/list?page='+currentPage).getAll().then(({ data }) => {
        if(data.success == true){
          setSubCategories(data.data);
          setPaginationData(data.pagination);
        }

      })
  }


  const getSingleData=(id)=>{
    api.common('subcategory/list/'+id).getOne().then(({ data }) => {
      console.log('value',data);

      if(data.success == true){
        setSingleSubCategory(data.data);
        setFormModal(!formModal)  
      }

    })

}


  const deleteSingleData=(id)=>{

    if (window.confirm("Are you sure do you want to delete the sub category?")) {

      api.common('category/delete/'+id).getOne().then(({ data }) => {  

        setFormResponse(data);
  
        if(data.success == true){
          setNotificationModal(!notificationModal) 
          getData();
        }
  
      })
    }
    
  }


  const submitData=(formData)=>{    

    let url='category/add';
    if(Object.keys(singleSubCategory).length > 0){
      url='category/list/'+singleSubCategory._id;
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
      return data.map((data, index) => {
        const { category_name, category_desc,_id } = data //destructuring
        return (
           <tr key={index}>
              <td>{index+1}</td>
              <td>{category_name}</td>
              <td>{category_desc}</td>
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
                            onClick={(e) => getSingleData(_id)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => deleteSingleData(_id)}
                          >
                           Delete
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
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sub Categories List</h3>
                  </div>

                  <Col className="text-right" xs="4">
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={(e) => toggleModal()}
                      size="sm"
                    >
                      Add New
                    </Button>
                  </Col>
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SNo</th>
                    <th scope="col">Category</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>    

                  {/* check categories empty */}

                  {renderTableTr(subcategories)}
                  
                </tbody>

                </Table>


                {
                  Object.keys(paginationData).length >0 && 
                  
                  <>  
                      <nav className="pagination justify-content-center" aria-label="pagination">
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
              size="md"
              isOpen={formModal}
              toggle={() => toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>
                        {
                          Object.keys(singleSubCategory).length > 0?'Edit ':'Add new '
                        }
                       sub category</small>
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
                      {/* load category form data */}
                      <SubCategory submitData={submitData} singleSubCategory={singleSubCategory} />
                  </CardBody>
                </Card>
              </div>
            </Modal>
            {/* end of modal */}

            {/* success modal */}

            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={notificationModal}
              toggle={() => toggleNotificationModal()}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Success
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleNotificationModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">
                    {formResponse.msg}
                  </h4>
                  
                </div>
              </div>
              <div className="modal-footer">               

                <Button
                  className="ml-auto btn-white"
                  color="default"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleNotificationModal()}
                >
                  Close
                </Button>
                
              </div>
            </Modal>

            {/* success modal */}


           
     
  </Container>
    </>
  );
};

export default SubCategories;
