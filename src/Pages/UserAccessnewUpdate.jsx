import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import { Form, Row, Col, Button,InputGroup } from "react-bootstrap";
import request from "../Request";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

/**
 * UserAccessnewUpdate component is responsible for fetching user details
 * and allowing the admin to update user access rights and information.
 *
 */

function UserAccessnewUpdate() {
    const { userId } = useParams();
    const location = useLocation();
    const currentPage = location.state?.currentPage || 1; // Default to page 1 if not set
    const itemsPerPage = location.state?.itemsPerPage || 10; // Ensure itemsPerPage is set

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        userName: '',
        password: '',
        accessTo: {
            isStudent: false,
            isTransaction: false,
            isAccountView: false,
            isReports: false,
            isAccountMaster: false,
        },
    });
    const [showPassword, setShowPassword] = useState(false);// State for password visibility toggle

    const togglePasswordVisibility = () => setShowPassword(prev => !prev); // Function to toggle password visibility

    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await request.get(`getUserById/${userId}`);
            if (response.data) {
                const userData = response.data.data;
                setUserDetails(userData);
                setFormData({
                    name: userData.name || '',
                    phoneNumber: userData.phoneNumber || '',
                    userName: userData.userName || '',
                    password: '', 
                    accessTo: {
                        isStudent: userData.accessTo?.isStudent || false,
                        isTransaction: userData.accessTo?.isTransaction || false,
                        isAccountView: userData.accessTo?.isAccountView || false,
                        isReports: userData.accessTo?.isReports || false,
                        isAccountMaster: userData.accessTo?.isAccountMaster || false,
                    },
                });
            } else {
                throw new Error("User details not found");
            }
        } catch (error) {
            setError("Error fetching user details. Please try again later.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles changes to input fields and checkboxes.
     * Updates the formData state accordingly.
     */

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prevState) => ({
                ...prevState,
                accessTo: {
                    ...prevState.accessTo,
                    [name]: checked,// Update checkbox state
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value, // Update text field state
            }));
        }
    };

    /**
     * Handles form submission to update user access details.
     * Sends a PUT request to update the user information.
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request.put(`updateUser/${userId}`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("User access set successfully");
                navigate(`/UserAccess?page=${currentPage}`, { state: { updatedUserId: userId, itemsPerPage } });
                toast.success("UserAccess updated successfully"); 

            } else {
                console.error("Error setting user access:", response.data);
                toast.error(error.response?.data?.message); 

            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error(error.response?.data?.message); 
        }
    };

    useEffect(() => {
        fetchUserDetails(); // Fetch user details when component mounts
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: "#FFFFFF" }} className="p-3">
                <h4><b className="title">Update User</b></h4>

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

export default UserAccessnewUpdate;
