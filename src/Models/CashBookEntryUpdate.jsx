/**
 * CashBookEntryUpdate Component
 * 
 * This component is a modal form for updating cash book entries. It allows users to 
 * modify the details of an existing entry, including account heads, amounts, and date.
 * The component fetches initial data based on the provided account ID when opened.
 * 
 * Props:
 * - open (boolean): Controls the visibility of the modal. If true, the modal is displayed.
 * - onClose (function): Function to close the modal.
 * - accountId (string): The ID of the account to fetch and update data for.
 * 
 * State:
 * - formData (object): Stores the form values for account head, sub-account head, cash, 
 *   bank, diocesan amounts, and date.
 * - loading (boolean): Indicates whether data is currently being fetched or the form is submitting.
 * - errors (object): Stores validation and fetching error messages.
 * 
 * Lifecycle:
 * - useEffect: Fetches account data when the modal opens or when the accountId changes.
 * 
 * Validation:
 * - Ensures that required fields are filled out before submission.
 * 
 * Usage:
 * <CashBookEntryUpdate 
 *   open={isModalOpen} 
 *   onClose={handleClose} 
 *   accountId={selectedAccountId} 
 * />
 */


import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import request from "../Request"; // Adjust the path as necessary
import useAccountHeads from '../hooks/useAccountHeads'; // Adjust the import path
import { toast } from 'react-toastify'; // Import toast

function CashBookEntryUpdate({ open, onClose, accountId }) {
  const [formData, setFormData] = useState({
    accountHead: "",
    subAccountHead: "",
    cash: 0,
    bank: 0,
    diocesan: 0,
    date: '',
  });

  const { accountHeads, subAccountHeads, setSelectedHead } = useAccountHeads();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAccountData = async () => {
      if (accountId) {
        try {
          setLoading(true);
          const response = await request.get(`getOpeningBalanceById/${accountId}`);
          console.log("Fetched account data:", response.data); // Debugging line

          if (response.data && response.data.message) {
            const accountData = response.data.message; // Access the message object
            setSelectedHead(accountData?.accountHead)
            setFormData({
              accountHead: accountData.accountHead || '',
              subAccountHead: accountData.subAccountHead || '',
              cash: accountData?.cash || 0, // Initialize with 0 if undefined
              bank: accountData?.bank || 0, // Initialize with 0 if undefined
              diocesan: accountData?.diocesan || 0, // Initialize with 0 if undefined
              date: accountData.date ? new Date(accountData.date).toISOString().split('T')[0] : '', // Format the date
            });
          } else {
            setErrors({ fetch: "No account data found." });
          }
        } catch (err) {
          setErrors({ fetch: "Error fetching account data. Please try again later." });
          console.error("Error fetching account data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setErrors({ fetch: "No account ID provided." });
      }
    };

    fetchAccountData();
  }, [accountId, open]); // Ensure this runs when modal state or accountId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "accountHead"){
      setSelectedHead(value)
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Clear error for that field
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.accountHead) newErrors.accountHead = "Account Head is required.";
    // Add more validation as needed
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      setLoading(true);
  
      // Construct the payload according to the required format
      const payload = {
        date: formData.date, // Ensure this is formatted correctly
        accountHead: formData.accountHead,
        subAccountHead: formData.subAccountHead,
        cash: Number(formData.cash), // Convert to number
        bank: Number(formData.bank),   // Convert to number
        diocesan: Number(formData.diocesan), // Convert to number
      };
  
      const response = await request.put(`updateOpeningBalance/${accountId}`, payload);
      console.log("Update response:", response.data); // Debugging line
  
      if (response.data && response.data.message) {
        console.log(response.data.message); // Optionally handle success feedback
        toast.success("OpeningBalance Update successfully"); 

        onClose(); // Close modal after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if(error.response.status === 400){
          toast.error(error.response.data.message);
      }else{
          toast.error("An error occurred while verifying");
      }

      setErrors({ submit: "Error submitting form. Please try again later." });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal show={open} onHide={onClose} size="xl" centered>
      <Modal.Body>
        <div className="container-fluid p-3">
          <Form className='openingbalanceform roboto-font stylelabel' onSubmit={handleSubmit}>
            <Row className='justify-content-between align-items-center mt-2 mb-3'>
              <Col xs={'auto'}>
                <span className='modalformheading'>Cash Book Entry</span>
              </Col>
              <Col xs={'auto'}>
                <IoIosCloseCircleOutline size={32} className='modalformclosebtn' onClick={onClose} />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm={12} lg={6}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  disabled
                  readOnly
                />
                {errors.date && <div className="text-danger">{errors.date}</div>}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6}>
                <Form.Label>Account Head</Form.Label>
                <Form.Select
                  name="accountHead"
                  value={formData.accountHead}
                  onChange={handleInputChange}
                >
                  <option value="">Select Account Head</option>
                  {accountHeads.map((accountHead, index) => (
                    <option key={index} value={accountHead}>
                      {accountHead}
                    </option>
                  ))}
                </Form.Select>
                {errors.accountHead && <div className="text-danger">{errors.accountHead}</div>}
              </Col>

              <Col lg={6}>
                <Form.Label>Sub Account Head</Form.Label>
                <Form.Select
                  name="subAccountHead"
                  value={formData?.subAccountHead}
                  onChange={handleInputChange}
                >
                  <option value="">Select Sub Account Head</option>
                  {subAccountHeads?.map((subAccountHead, index) => (
                    <option key={index} value={subAccountHead}>
                      {subAccountHead}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={4}>
                <Form.Label>Cash Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  name="cash"
                  value={formData.cash}
                  onChange={handleInputChange}
                  placeholder="Enter cash amount"
                />
              </Col>
              <Col lg={4}>
                <Form.Label>Bank Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  placeholder="Enter bank amount"
                />
              </Col>
              <Col lg={4}>
                <Form.Label>Diocesan Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  name="diocesan"
                  value={formData.diocesan}
                  onChange={handleInputChange}
                  placeholder="Enter diocesan amount"
                />
              </Col>
            </Row>

            <Row className='justify-content-end align-items-center my-4 gy-2'>
              <Col xs={'auto'}>
                <Button className='fw-600 modalformdiscardbtn' onClick={onClose}>
                  Discard
                </Button>
              </Col>
              <Col xs={'auto'}>
                <Button className='fw-600 modalformsavebtn' type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CashBookEntryUpdate;
