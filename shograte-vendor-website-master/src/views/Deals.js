
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
import Deal from './forms/Deal'
import ModalSuccess from '../components/Common/ModalSuccess';

const Deals = (props) => {

  const [copiedText, setCopiedText] = useState();
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [deals, setDeals] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleDeal, setSingleDeal] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);
  const [productsList, setProductsList] = useState([]);


  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, [activePage]);


  const toggleModal = () => {
    setSingleDeal({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{

      api.common('deals/list?page='+currentPage).getAll().then(({ data }) => {
        console.log('data',data);
        if(data.success == true){
          setDeals(data.data);
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

      
      //load vendor wise products list
      api.common('products/list?size=10000').getAll().then(({ data }) => {
        if(data.success == true){

          let productsdata=data.data;
          let productsTmp=[];
          if(productsdata.length > 0){  
            productsdata.forEach(element => {
              productsTmp.push({
                label:element.product_name,
                value:element._id,
              })
            });
          }

          setProductsList(productsTmp);

          console.log('productsList',productsList);
        }
      })


  }


  const getSingleData=(id)=>{

    api.common('deals/list/'+id).getOne().then(({ data }) => {

      console.log('value',data);
      if(data.success == true){
        setSingleDeal(data.data);
        setFormModal(!formModal)  
      }

    })

}


const submitData=(formData)=>{    

  let url='deals/add';
  if(Object.keys(singleDeal).length > 0){
    url='deals/list/'+singleDeal._id;
  } 
  console.log('formData',formData);

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

    let url='deals/changeStatus/'+id;
 
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
        const { vendor_name, product_name,deal_name,deal_desc,is_active,_id } = data //destructuring
        return (
           <tr key={index}>
              <td>{parseInt(newIndex)+parseInt(index)+1}</td>
              <td>{product_name}</td>
              <td>{deal_name}</td>
              <td>{deal_desc}</td>
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
                          href={null}
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href={null}
                            onClick={(e) => changeStatus(_id,is_active)}
                          >
                            Set {is_active ?"Inactive":"Active"}
                          </DropdownItem>
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
                    <h3 className="mb-0">My Deals List</h3>
                  </div>

                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href={null}
                      onClick={(e) => toggleModal()}
                      size="sm"
                    >
                      Add New Deal
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
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>  
                  {/* check categories empty */}
                    {renderTableTr(deals)}
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
                          Object.keys(singleDeal).length > 0?'Edit ':'Add new '
                        } Deal</small>
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

                      <Deal submitData={submitData} singleDeal={singleDeal} productsList={productsList} />

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

export default Deals;
