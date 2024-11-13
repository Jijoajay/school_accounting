import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,  Row, Col, Button } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAccountView } from "../hooks/useAccountView";

function AccountViewDetailes({ open, onClose,selectedId }) {
  const { formData, handleGetAccountViewById } = useAccountView()
  // Fetch account view details when the component mounts or when selectedId changes
  useEffect(()=>{
    if(selectedId){
      handleGetAccountViewById(selectedId)
    }
  },[selectedId])


  const viewDetailItem = [
    { id: 1, title: "Date", apiTitle: "date" },
    { id: 2, title: "Cash Book Head", apiTitle: "accountHead" },
    { id: 7, title: "Narration", apiTitle: "narration" },
    { id: 3, title: "Receipt/Payment", apiTitle: "rp" },
    { id: 4, title: "Transaction Mode", apiTitle: "transactionMode" },
    { id: 6, title: "Amount", apiTitle: "amount" },
  ]
  
  
  return (
    <Modal show={open} onHide={onClose} size="lg" centered>

      <Modal.Body>
      <div className="container-fluid p-3">
      <div className='openingbalanceform roboto-font detailsdiv'>
      <Row className="mt-2 mb-3">
        <Col style={{textAlign:'end'}}>
          <IoIosCloseCircleOutline
            size={32}
            className="modalformclosebtn"
            onClick={onClose}
          />
        </Col>
      </Row>
        <Row>
          <Col className='text-break'>
            {
              viewDetailItem.map((item) => (
                <Row className='mb-2' key={item.id}>
                  <Col sm={6}>
                    <p className='detailslabel'>{item?.title}</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData?.[item?.apiTitle] || "-"}</p>
                  </Col>
                </Row>
              ))
            }
            
          </Col>
        </Row>
      </div>
    </div>

      </Modal.Body>
    </Modal>
  );
}





export default AccountViewDetailes