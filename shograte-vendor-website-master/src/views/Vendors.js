
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
  UncontrolledTooltip,
  Table,
  Media,
  Badge,
  Progress,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
  UncontrolledAlert 
} from "reactstrap";
// core components
import PageHeader from "components/Headers/PageHeader.js";
import Pagination from "react-js-pagination";
import api from '../services/api';

import Vendor from './forms/vendor';
import ViewVendor from './forms/ViewVendor';

import ModalSuccess from '../components/Common/ModalSuccess';

const Vendors = (props) => {

  const [isEdit, setIsEdit] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [formResponse, setFormResponse] = useState(false);
  const [singleVendor, setSingleVendor] = useState({});
  const [notificationModal, setNotificationModal] = useState(false);


  useEffect(() => {
    //make api call to get catgories
    getData();    
    
  }, []);


  const toggleModal = () => {
    setSingleVendor({});
    setFormResponse({});
    setFormModal(!formModal)    
  };

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)  
  };

  const getData=()=>{
      api.common('vendor/list').getAll().then(({ data }) => {

        console.log('data',data);
        if(data.success == true){
          setVendors(data.data);
        }

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.status);

          if(error.response.status == 401){
            props.history.push('/auth/login?login=failed');
          }
        }
      });
  }


  const getSingleData=(id,action)=>{

    if(action =='Edit'){
        setIsEdit(true)
    }else{
      setIsEdit(false)
    }

    api.common('vendor/list').getOne().then(({ data }) => {
      console.log('value',data);
      if(data.success == true){
        setSingleVendor(data.data[0]);
        setFormModal(!formModal)  
      }

    })

}


const submitData=(formData)=>{    

  let url='vendor/edit_vendor';
 
 
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

    let url='vendor/changeStatus/'+id;
 
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
        const { vendor_name, mobile,email,is_active,_id } = data //destructuring
        return (
           <tr key={index}>
              <td>1</td>
              <td>{vendor_name}</td>
              <td>{mobile}</td>
              <td>{email}</td>
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
                            href={null}
                            onClick={(e) => getSingleData(_id,'Edit')}
                          >
                            Edit
                          </DropdownItem>
                          {/* <DropdownItem
                            href={null}
                            onClick={(e) => getSingleData(_id,'View')}
                          >
                            View
                          </DropdownItem>                           */}
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
                    <h3 className="mb-0">My Profile</h3>
                  </div>                 
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SNo</th>
                    <th scope="col">Vendor Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>    

                  {/* check categories empty */}

                    {renderTableTr(vendors)}
                  
                </tbody>

              </Table>

          
            </Card>
          </Col>
        </Row>


           {/* modal */}
            
           <Modal
              className="modal-dialog-centered"
              size="lg"
              isOpen={formModal}
              toggle={() => toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0" >
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>                       
                      {isEdit ? 'Edit':'View'} Vendor</small>
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

                    {
                      isEdit ?
                      <Vendor singleVendor={singleVendor} submitData={submitData} />
                      :
                      <></>
                      // <ViewVendor  singleVendor={singleVendor}/>
                    }    

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

export default Vendors;
