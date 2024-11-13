import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AccountHead from "../Pages/AccountHead";
import { useAccountView } from "../hooks/useAccountView";
import { MainBalance } from "../components/MainBalance";
import { toast } from 'react-toastify'; // Import toast

function AccountViewCashEnter({ open, onClose, edit=false, selectedId }) {
  // Destructuring props: open (modal visibility), onClose (function to close modal), edit (flag for edit mode), selectedId (ID for selected account)
  const { formData, errors, handleAccountHeadSelect,   handleChange, handleSubmitPost, handleGetAccountViewById, handleUpdate, initialValue, setFormData } = useAccountView()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let status = 0
    // Determine whether to update or create a new account based on the edit flag
    if(edit){
      status = await handleUpdate(selectedId)
    }else{
      status = await handleSubmitPost()
    }
    // Show success message based on status code
    if(status === 201 ){
      onClose()
      toast.success("Account View added successfully"); 
    }
    if(status === 200){
      onClose()
      toast.success("Account View updated successfully"); 

    }
  };
  // console.log("isEdit", edit)

  // Fetch account data if in edit mode and selectedId is provided
  useEffect(()=>{
    if(edit && selectedId){
      handleGetAccountViewById(selectedId)
    }else if(!edit){
      // console.log("calling all autobots")
      // Reset form data to initial values if not editing
      setFormData(initialValue)
    }
  },[edit])// Dependency array to run effect when edit mode changes
  
  return (
    <Modal
      show={open}
      onHide={onClose}
      size="xl"
      centered
      style={{ borderColor: "none", border: "none" }}
    >
      <Modal.Body>
      <div className="container-fluid p-3">
        <Form className="openingbalanceform roboto-font stylelabel">
          <Row className="justify-content-between align-items-center mt-2 mb-3">
            <Col xs={"auto"}>
              <span className="modalformheading">Cash Book Entry</span>
            </Col>
            <Col xs={"auto"}>
              <IoIosCloseCircleOutline
                size={32}
                className="modalformclosebtn"
                onClick={onClose}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Date</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Col>
              {errors?.date && <p style={{color:"red"}}>{errors?.date}</p>}
              </Row>
            </Col>
            <Col sm={12} lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Account Head</Form.Label>
                </Col>
              </Row>
              <AccountHead onSelect={handleAccountHeadSelect} isTitle={false} data={formData?.accountHead || "All"}/>
              {errors?.accountHead && <p style={{color:"red"}}>{errors?.accountHead}</p>}
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Narration</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="narration"
                    placeholder="Enter Narration"
                    value={formData.narration}
                    onChange={handleChange}
                  />
                </Col>
                {errors?.narration && <p style={{color:"red"}}>{errors?.narration}</p>}
              </Row>

            </Col>

            <Col lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Receipt/Payment</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    name="rp"
                    value={formData.rp}
                    onChange={handleChange}
                  >
                    <option value="">Select any one</option>
                    <option value="receipt">Receipt</option>
                    <option value="payment">Payment</option>
                  </Form.Select>
                </Col>
              </Row>
              {errors?.rp && <p style={{color:"red"}}>{errors?.rp}</p>}
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Transaction Mode</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    name="transactionMode"
                    value={formData.transactionMode}
                    onChange={handleChange}
                  >
                    <option value="">Select Mode</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                    <option value="online">Diocesan</option>
                  </Form.Select>
                </Col>
              </Row>
              {errors?.transactionMode && <p style={{color:"red"}}>{errors?.transactionMode}</p>}
            </Col>

            <Col lg={6} className="d-flex flex-column justify-content-between">
              <Row>
                <Col>
                  <Form.Label column sm={12}>Amount</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            {errors?.amount && <p style={{color:"red"}}>{errors?.amount}</p>}
            </Col>
          </Row>

          <Row className="justify-content-end align-items-center my-4 gy-2">
            <Col xs={"auto"}>
              <Button className="fw-600 modalformdiscardbtn" onClick={onClose}>
                Discard
              </Button>
            </Col>
            <Col xs={"auto"}>
              <Button className="fw-600 modalformsavebtn" onClick={(e)=>handleSubmit(e)}>
              {edit?"Update":"Save"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
    <MainBalance />
     
    </Modal>
  );
}

export default AccountViewCashEnter;
