import React,{useEffect,useState} from 'react';

import {Modal,Button} from "reactstrap";

function ModalSuccess(props) {

    const toggleNotify=()=>{
        props.toggleNotification();
    }   

    const {notify,formResponse} =props;
    return (        

        <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={notify}
              toggle={() => toggleNotify()}
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
                  onClick={() => toggleNotify()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">
                    {formResponse && formResponse.msg}
                  </h4>
                  
                </div>
              </div>
              <div className="modal-footer">               

                <Button
                  className="ml-auto btn-white"
                  color="default"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleNotify()}
                >
                  Close
                </Button>
                
              </div>
        </Modal>
    )
}

export default ModalSuccess;
