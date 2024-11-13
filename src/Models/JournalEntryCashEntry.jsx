import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAccountHeads from "../hooks/useAccountHeads";
import request from "../Request";
import { toast } from 'react-toastify'; // Import toast
import JournalEntryCashEntryDetailes from "../Pages/JournalEntryCashEntryDetailes";
import JournalEntryCashEntryDetailessecond from "../Pages/JournalEntryCashEntryDetailessecond";

function JournalEntryCashEntry({ open, onClose, edit, accountId }) {
  const [formData, setFormData] = useState({
    rp: "",
    transactionMode: "",
    accountHead: "",
    subAccountHead: "",
    amount: "",
    diocesan: 0,
    narration: "",
    date: "",
  });

  const { accountHeads, subAccountHeads, setSelectedHead } = useAccountHeads();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'
    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else if (formData.date > today) {
      newErrors.date = "The date cannot be in the future.";
    }
    if (!formData.rp) newErrors.rp = "Receipt/Payment selection is required.";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be a positive number.";
    if (!formData.narration) newErrors.narration = "Narration is required.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "accountHead"){
      setSelectedHead(value);
    }
    const updatedValue = name === "amount" ? parseFloat(value) : value;
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await request.put(`updateJournalEntry/${accountId}`, formData);
      console.log("Form submitted successfully:", response.data);
      toast.success("JournalEntry updated successfully"); 

      onClose();
    } catch (err) {
      setErrors({ submit: "Error submitting form. Please try again." });
      toast.error(err.response?.data?.message); 
      console.error("Server responded with:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJournalEntry = async () => {
      if (accountId && edit) {
        try {
          const response = await request.get(`getJournalEntryById/${accountId}`);
          const fetchedData = response.data.data || {};
          setSelectedHead(fetchedData?.accountHead)
          setFormData({
            rp: fetchedData.rp || "",
            transactionMode: fetchedData.transactionMode || "",
            accountHead: fetchedData.accountHead || "",
            subAccountHead: fetchedData.subAccountHead || "",
            amount: fetchedData.amount || "",
            diocesan: fetchedData.diocesan || 0,
            narration: fetchedData.narration || "",
            date: fetchedData.date ? fetchedData.date.split("T")[0] : "",
          });
        } catch (error) {
          console.log("Error fetching journal entry:", error);

          toast.error(error?.response?.data?.message || "Error fetching data");
        }
      }
    };
    fetchJournalEntry();
  }, [accountId, edit]);



  return (
    <Modal show={open} onHide={onClose} size="xl" centered>
      <Modal.Body>
        <div className="container-fluid p-3">
          <Form onSubmit={handleSubmit}>
            {/* Header */}
            <Row className="justify-content-between align-items-center mt-2 mb-3">
              <Col xs="auto"><span className="modalformheading">Cash Book Entry</span></Col>
              <Col xs="auto">
                <IoIosCloseCircleOutline size={32} onClick={onClose} />
              </Col>
            </Row>

            {/* Form Fields */}
            <Row className="mt-3">
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleInputChange} 
                  />
                  {errors.date && <div className="text-danger">{errors.date}</div>}
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Receipt/Payment</Form.Label>
                  <Form.Select 
                    name="rp" 
                    value={formData.rp} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="receipt">Receipt</option>
                    <option value="payment">Payment</option>
                  </Form.Select>
                  {errors.rp && <div className="text-danger">{errors.rp}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6}>
                <Form.Group>
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
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label>Sub Account Head</Form.Label>
                  <Form.Select 
                    name="subAccountHead" 
                    value={formData.subAccountHead} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sub Account Head</option>
                    {subAccountHeads.map((subAccountHead, index) => (
                      <option key={index} value={subAccountHead}>
                        {subAccountHead}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6}>
                <Form.Group>
                  <Form.Label>Transaction Mode</Form.Label>
                  <Form.Select 
                    name="transactionMode" 
                    value={formData.transactionMode} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Transaction Mode</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                    <option value="diocesan">Diocesan</option>
                  </Form.Select>
                  {errors.transactionMode && <div className="text-danger">{errors.transactionMode}</div>}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="amount" 
                    value={formData.amount} 
                    onChange={handleInputChange} 
                  />
                  {errors.amount && <div className="text-danger">{errors.amount}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3 mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Narration</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="narration" 
                    value={formData.narration} 
                    onChange={handleInputChange} 
                  />
                  {errors.narration && <div className="text-danger">{errors.narration}</div>}
                </Form.Group>
              </Col>
            </Row>

            {/* Submission Row */}
            <Row className="justify-content-end align-items-center my-4 gy-2">
              <Col xs="auto">
                <Button className="fw-600" onClick={onClose}>Discard</Button>
              </Col>
              <Col xs="auto">
                <Button className="fw-600" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Body
          style={{ borderColor: "#3474EB", borderTop: "2px solid #3474EB" }}
        >
          <Row className="mt-2 mb-3">
            <Col
              style={{
                textAlign: "start",
              }}
              className="mx-5"
            >
              <JournalEntryCashEntryDetailes />
            </Col>
            <Col className="mx-5" style={{ textAlign: "start" }}>
              <JournalEntryCashEntryDetailessecond
                accountHead={formData?.accountHead}
              />
            </Col>
          </Row>
        </Modal.Body>
    </Modal>
  );
}

export default JournalEntryCashEntry;



/**
 * JournalEntryCashEntry Component
 *
 * This component is a modal for creating or editing a journal entry 
 * related to cash book entries in an accounting system. It provides 
 * a form for users to input details such as date, receipt/payment 
 * type, account head, sub-account head, transaction mode, amount, 
 * and narration. Upon submission, it sends the data to the server 
 * for processing and handles errors and loading states appropriately.
 *
 * Props:
 * - open (boolean): Indicates if the modal is open.
 * - onClose (function): Function to close the modal.
 * - edit (boolean): Determines if the form is in edit mode or not.
 * - accountId (string): ID of the journal entry to edit.
 *
 * State:
 * - formData (object): Holds the form fields' values.
 * - loading (boolean): Indicates if the form is currently being submitted.
 * - errors (object): Holds validation errors for form fields.
 *
 * Functions:
 * - validate: Validates form data and returns any errors.
 * - handleInputChange: Updates form data based on user input.
 * - handleSubmit: Handles form submission, validates data, 
 *   makes API call to update journal entry, and manages loading/error states.
 * - useEffect: Fetches journal entry data if in edit mode and an 
 *   account ID is provided.
 *
 * Dependencies:
 * - Bootstrap for styling.
 * - React Bootstrap for modal and form components.
 * - Icons from react-icons for UI elements.
 * - Custom hook (useAccountHeads) to fetch account heads.
 * - Axios or similar library for making HTTP requests.
 * - React Toastify for displaying notifications.
 */
