// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Form, Row, Col, Button, Alert } from "react-bootstrap";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import request from "../Request"; // Ensure this path is correct
// import { toast } from 'react-toastify'; // Import toast

// function JournalEntryUpdate({ open, onClose, accountId }) {
//   const [formData, setFormData] = useState({
//     rp: "",
//     transactionMode: "",
//     accountHead: "",
//     subAccountHead: "",
//     amount: 0,
//     narration: "",
//     date: "",
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     const fetchAccountData = async () => {
//       if (accountId) {
//         try {
//           setLoading(true);
//           const response = await request.get(`getJournalEntryById/${accountId}`);
          
//           if (response.data && response.data.message) {
//             const accountData = response.data.message;
//             setFormData({
//               rp: accountData.rp,
//               transactionMode: accountData.transactionMode,
//               accountHead: accountData.accountHead,
//               subAccountHead: accountData.subAccountHead,
//               amount: accountData.amount,
//               narration: accountData.narration,
//               date: accountData.date.split('T')[0], // Assuming the date is in ISO format
//             });
//           } else {
//             setErrors({ fetch: "No account data found." });
//           }
//         } catch (err) {
//           setErrors({ fetch: "Error fetching account data. Please try again later." });
//           console.error("Error fetching account data:", err);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setErrors({ fetch: "No account ID provided." });
//       }
//     };

//     fetchAccountData();
//   }, [accountId, open]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.accountHead) newErrors.accountHead = "Account Head is required.";
//     if (!formData.amount) newErrors.amount = "Amount is required.";
//     if (!formData.date) newErrors.date = "Date is required.";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         rp: formData.rp,
//         transactionMode: formData.transactionMode,
//         accountHead: formData.accountHead,
//         subAccountHead: formData.subAccountHead,
//         amount: formData.amount,
//         narration: formData.narration,
//         date: formData.date,
//       };

//       const response = await request.put(`updateJournal/${accountId}`, payload);
//       if (response.data && response.data.message) {
//         setShowSuccessMessage(true);
//         onClose(); 
//         toast.success("JournalEntry updated successfully"); 

//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error(error.response?.data?.message); 
//       setErrors({ submit: "Error submitting form. Please try again later." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={open} onHide={onClose} size="xl" centered>
//       <Modal.Body>
//         <div className="container-fluid p-3">
//           <Form className="openingbalanceform">
//             <Row className="justify-content-between align-items-center mt-2 mb-3">
//               <Col xs={"auto"}>
//                 <span className="modalformheading">Cash Book Entry</span>
//               </Col>
//               <Col xs={"auto"}>
//                 <IoIosCloseCircleOutline size={32} className="modalformclosebtn" onClick={onClose} />
//               </Col>
//             </Row>

//             {showSuccessMessage && (
//               <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
//                 Entry updated successfully!
//               </Alert>
//             )}

//             <Row>
//               <Col sm={12} lg={6} className="d-flex flex-column justify-content-between">
//                 <Form.Group>
//                   <Form.Label>Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.date}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col lg={6} className="d-flex flex-column justify-content-between">
//                 <Form.Group>
//                   <Form.Label>Receipt/Payment</Form.Label>
//                   <Form.Select
//                     name="rp"
//                     value={formData.rp}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.rp}
//                   >
//                     <option>Select any one</option>
//                     <option value="Receipt">Receipt</option>
//                     <option value="Payment">Payment</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{errors.rp}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col sm={12} lg={6}>
//                 <Form.Group>
//                   <Form.Label>Transaction Mode</Form.Label>
//                   <Form.Select
//                     name="transactionMode"
//                     value={formData.transactionMode}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.transactionMode}
//                   >
//                     <option>Select Transaction Mode</option>
//                     <option value="Cash">Cash</option>
//                     <option value="Bank Transfer">Bank Transfer</option>
//                     <option value="Credit Card">Credit Card</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{errors.transactionMode}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col sm={12} lg={6}>
//                 <Form.Group>
//                   <Form.Label>Account Head</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="accountHead"
//                     value={formData.accountHead}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.accountHead}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.accountHead}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col sm={12} lg={6}>
//                 <Form.Group>
//                   <Form.Label>Sub Account Head</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="subAccountHead"
//                     value={formData.subAccountHead}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col sm={12} lg={6}>
//                 <Form.Group>
//                   <Form.Label>Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.amount}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col sm={12}>
//                 <Form.Group>
//                   <Form.Label>Narration</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="narration"
//                     value={formData.narration}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="justify-content-end align-items-center my-4 gy-2">
//               <Col xs={"auto"}>
//                 <Button className="fw-600 modalformdiscardbtn" onClick={onClose}>
//                   Discard
//                 </Button>
//               </Col>
//               <Col xs={"auto"}>
//                 <Button className="fw-600 modalformsavebtn" onClick={handleSubmit}>
//                   {loading ? "Saving..." : "Save"}
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default JournalEntryUpdate;
