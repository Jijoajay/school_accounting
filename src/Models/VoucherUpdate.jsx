import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Table, Form, Row, Col, Button } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";


function VoucherUpdate({ open, onClose }) {
  return (
    <Modal show={open} onHide={onClose} size="xl" centered>

      <Modal.Body>
      <div className="container-fluid p-3">
      <Form className='openingbalanceform roboto-font stylelabel styleinput'>
        <Row className='justify-content-between align-items-center mt-2 mb-3'>
          <Col xs={'auto'}>
            <span className='modalformheading'>Voucher Number Form</span>
          </Col>
          <Col xs={'auto'}>
            <IoIosCloseCircleOutline size={32} className='modalformclosebtn'  onClick={onClose}/>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={6} className='d-flex flex-column justify-content-between'>
            <Row>
              <Col>
                <Form.Label column sm={12}>Account Head</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Select 
                >
                  <option>CATHEDRAL NURSERY AND PRIMARY</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col lg={6} className='d-flex flex-column justify-content-between'>
            <Row>
              <Col>
                <Form.Label column sm={12}>Remarks</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control 
                    type="text" 
                    placeholder="" 
                    className=""
                />
              </Col>
            </Row>
          </Col>

        </Row>

        <Row className="mt-3">
          <Col lg={6} className='d-flex flex-column justify-content-between'>
            <Row>
              <Col>
                <Form.Label column sm={12}>Cash</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control 
                    type="text" 
                    placeholder="" 
                    className=""
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6} className='d-flex flex-column justify-content-between'>
            <Row>
              <Col>
                <Form.Label column sm={12}>Bank</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control 
                    type="text" 
                    placeholder="" 
                    className=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={6} className='d-flex flex-column justify-content-between'>
            <Row>
              <Col>
                <Form.Label column sm={12}>Voucher Number</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control 
                    type="text" 
                    placeholder="" 
                    className=""
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='justify-content-end align-items-center my-4 gy-2'>
          <Col xs={'auto'}>
            <Button className='fw-600 modalformdiscardbtn'>
              Discard
            </Button>
          </Col>
          <Col xs={'auto'}>
            <Button className='fw-600 modalformsavebtn'>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>



      </Modal.Body>
    </Modal>
  );
}



export default VoucherUpdate