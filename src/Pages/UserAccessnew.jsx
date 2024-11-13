import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import request from "../Request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { InputGroup } from "react-bootstrap";

function UserAccessnew() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        userName: '',
        password: '',
        accessTo: { // Object to manage access permissions
            isStudent: false,
            isTransaction: false,
            isAccountView: false,
            isReports: false,
            isAccountMaster: false,
        },
    });
    const [showPassword, setShowPassword] = useState(false);// State to toggle password visibility

    const togglePasswordVisibility = () => setShowPassword(prev => !prev); // Function to toggle password visibility
    
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [type === "checkbox" ? "accessTo" : name]: type === "checkbox"// Check if input is a checkbox
                ? { ...prevState.accessTo, [name]: checked }// Update accessTo object
                : value,// Update other fields
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form", formData.accessTo)

        // Check if at least one access checkbox is selected
        const hasAccess = Object.values(formData.accessTo).some((val)=> val === true)
        const { name, phoneNumber, userName, password } = formData;
        // Validation for required fields
        if (!name || !phoneNumber || !userName || !password) {
        toast.warn("Please fill in all required fields.");
        return;
        }else if(!hasAccess){
            toast.warn("Please Select Atleast One Checkbox To Continue");
        return
        }
  
        try {
            // Send a POST request to create a new user
            const response = await request.post('addUser/', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Check response status and provide feedback
            if (response.status === 201) {
                toast.success(response.data.message || "User created successfully"); 
                navigate("/UserAccess");
            } else {
                console.error("Unexpected response:", response.data);
                toast.error( response?.data?.message ||"Failed to set user access. Please try again.");
            }
        } catch (error) {
            console.error("Error occurred during the request:", error);
            toast.error("An error occurred. Please check your connection and try again.");
        }
  };
  
    return (
        <Form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: "#FFFFFF" }} className="p-3">
                <h4><b className="title">New User</b></h4>
                <Row className="mt-4 mb-4">
                    <Col>
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter the name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange} 
                        />
                    </Col>
                    <Col>
                        <Form.Label><b>Phone Number</b></Form.Label>
                        <Form.Control 
                            type="tel" 
                            placeholder="Enter the phone number" 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange} 
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <Form.Label><b>User Name</b></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter the user name" 
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange} 
                        />
                    </Col>
                    <Col>
                        <Form.Label><b>Set Password</b></Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter the password"
                                name="password"
                                className="border-end-0"
                                value={formData.password}
                                onChange={handleChange} 
                            />
                            <InputGroup.Text className="showpasswordbtn" onClick={togglePasswordVisibility}>
                                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <div style={{ backgroundColor: "#FFFFFF" }} className="p-3 mt-3">
                <Row className="mt-4 mb-4">
                    <Col>
                        <Form.Label><b>Access To</b></Form.Label>
                        <div className="d-flex flex-wrap">
                            {Object.keys(formData.accessTo).map((key, index) => (
                                <div className="checkbox-wrapper-28 me-5" key={index}>
                                    <input
                                        id={`checkbox-${index}`}
                                        type="checkbox"
                                        name={key}
                                        checked={formData.accessTo[key]}
                                        onChange={handleChange}
                                        className="promoted-input-checkbox"
                                    />
                                    <svg>
                                        <use xlinkHref="#checkmark-28" />
                                    </svg>
                                    <label htmlFor={`checkbox-${index}`}>
                                        <b style={{ color: "#505050" }}>{key.replace(/is/, '')}</b>
                                    </label>
                                </div>
                            ))}
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <symbol id="checkmark-28" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeMiterlimit="10"
                                        fill="none"
                                        d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                                    />
                                </symbol>
                            </svg>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-end">
                <div>
                    <a href="/UserAccess" style={{ textDecoration: "none" }}>
                        <Button
                            className="Discard"
                            style={{ height: "35px", width: "auto", borderColor: '#FFFFFF' }}
                        >
                            <span style={{ fontSize: "auto" }}>Discard</span>
                        </Button>
                    </a>
                </div>
                <div className="mx-3">
                    <Button
                        className="addbuttons"
                        type="submit"
                        style={{ height: "35px", width: "auto" }}
                    >
                        <span style={{ fontSize: "auto" }}>Set Access</span>
                    </Button>
                </div>
            </div>
        </Form>
    );
}

export default UserAccessnew;
