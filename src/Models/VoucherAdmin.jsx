
import { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { InputGroup} from 'react-bootstrap';
import { AiFillEyeInvisible,AiFillEye  } from "react-icons/ai";
import request from "../Request";
import { toast } from "react-toastify";

function VoucherAdmin({ open, onClose, setModalJournalEntryCashEntry }) {
    const [adminPassword, setAdminPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalJournalEntryUpdate, setModalJournalEntryUpdate] = useState(false);

    const handleVerify = async () => {
        if (!adminPassword) return toast.error("Please enter your password.");

        setLoading(true);
        try {
            const response = await request.post('checkAdmin', { password: adminPassword });
            if (response.status === 201) {
                setModalJournalEntryCashEntry(true);
                setAdminPassword("")
                onClose(); 
            } else {
                toast.error("Failed to verify admin password.");
            }
        } catch (error) {
            if(error.response.status === 400){
                toast.error(error.response.data.message);
            }else{
                toast.error("An error occurred while verifying the password");
            }
        } finally {
            setLoading(false);
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
  return (
    <>
    <Modal show={open} onHide={onClose} size="md" centered>
            <Modal.Body>
                <div className="container-fluid p-3">
                    <Form className='adminpowerform'>
                        <Row className='mb-2'>
                            <Col>
                                <span className='modalformheading'>Admin Power</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p style={{ color: '#898989' }}>Authorization is required to edit the information.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Enter Admin Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                    />
                                    <InputGroup.Text onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='justify-content-end my-4'>
                            <Col xs={'auto'}>
                                <Button onClick={onClose}>Cancel</Button>
                            </Col>
                            <Col xs={'auto'}>
                                <Button onClick={handleVerify} disabled={loading} type="submit">
                                    {loading ? "Verifying..." : "Verify"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    </>

  );
}


export default VoucherAdmin