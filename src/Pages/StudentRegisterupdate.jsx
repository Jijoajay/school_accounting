import React from "react";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import trash from "../img/trash.svg";
import StudentUpdateclone from "../Pages/StudentUpdateclone";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import toast

import request from "../Request"; // Adjust the path as necessary
function StudentRegisterupdate() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emisId: "",
    admissionNumber: "",
    name: "",
    nameInTamil: "",
    class: "",
    section: "",
    fatherName: "",
    fatherTamilName: "",
    motherName: "",
    motherTamilName: "",
    aadharNumber: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    doj: "",
    address: "",
    pincode: "",
    bloodGroup: "",
    religion: "",
    moi: "",
    community: "",
    groupCode: "",
    disabilityName: "",
    motherTongue: "",
    bankAccount: "",
    ifscCode: "",
    micr: "",
    tcNumber: "",
    tcStatus: "",
    tcIssueDate: "",
    studentImg: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDiscard = () => {
    navigate("/Students");
  };
  useEffect(() => {
    const fetchStudentData = async () => {
      if (_id) {
        try {
          setLoading(true);
          const response = await request.get(`getStudentById/${_id}`);
          if (response.data && response.data.data) {
            const studentData = response.data.data;
            console.log (studentData)
            setFormData(studentData);
            studentData.dob = studentData.dob.split('T')[0]; // Extract date part
            studentData.doj = studentData.doj.split('T')[0]; // Extract date part
            studentData.tcIssueDate = studentData.tcIssueDate.split('T')[0]; // Extract date part

          } else {
            setError("No student data found.");
          }
        } catch (err) {
          setError("Error fetching student data. Please try again later.");
          console.error("Error fetching student data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No student ID provided");
      }
    };

    fetchStudentData();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   setFormData((prevData) => ({ ...prevData, studentImg: file }));
  // };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFormData((prevData) => ({ ...prevData, studentImg: null }));
    document.getElementById("fileInput").value = "";
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.emisId) errors.emisId = "EMIS ID is required.";
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.nameInTamil)
      errors.nameInTamil = "Name in Tamil is required.";
    if (!formData.class) errors.class = "Class selection is required.";
    if (!formData.section) errors.section = "Section selection is required.";
    if (!formData.fatherName) errors.fatherName = "Father's name is required.";
    if (!formData.fatherTamilName)
      errors.fatherTamilName = "Father's Tamil name is required.";
    if (!formData.motherTamilName)
      errors.motherTamilName = "Mother's Tamil name is required.";
    if (!formData.motherName) errors.motherName = "Mother's name is required.";
    if (!formData.aadharNumber)
      errors.aadharNumber = "AadharNumber Tamil  is required.";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required.";
    if (!formData.gender) errors.gender = "Gender Tamil is required.";
    if (!formData.dob) errors.dob = "Date of birth is required.";
    if (!formData.doj) errors.doj = "Date Of Joining  is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.pincode) errors.pincode = "Pincode is required.";
    if (!formData.bloodGroup) errors.bloodGroup = "Blood group is required.";
    if (!formData.religion) errors.religion = "Religion is required.";
    if (!formData.moi) errors.moi = "Medium of instruction is required.";
    if (!formData.community) errors.community = "Community is required.";
    if (!formData.groupCode) errors.groupCode = "GroupCode  is required.";
    if (!formData.disabilityName)
      errors.disabilityName = "Disability group is required.";
    if (!formData.motherTongue)
      errors.motherTongue = "Mother tongue is required.";
    if (!formData.bankAccount)
      errors.bankAccount = "Bank account  is required.";
    if (!formData.ifscCode) errors.ifscCode = "IFSC code is required.";
    if (!formData.micr) errors.micr = "MICR is required.";
    if (!formData.tcNumber) errors.tcNumber = "TC Number is required.";
    if (!formData.tcStatus) errors.tcStatus = "TC Status is required.";

    if (!formData.tcIssueDate)
      errors.tcIssueDate = "TC issue date is required.";
    if (!formData.admissionNumber)
      errors.admissionNumber = "Admission number is required.";

    if (Object.keys(errors).length) {
      setError(errors);
      return false;
    }

    setError({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // const formDataToSubmit = new FormData();
    // for (const key in formData) {
    //   formDataToSubmit.append(key, formData[key]);
    // }

    setLoading(true);
    try {
      const response = await request.put(`updateStudent/${_id}`, formData);
      console.log("Success:", response.data);
      setSuccess(true);
      setFormData({
        emisId: "",
        admissionNumber: "",
        name: "",
        nameInTamil: "",
        class: "",
        section: "",
        fatherName: "",
        fatherTamilName: "",
        motherName: "",
        motherTamilName: "",
        aadharNumber: "",
        phoneNumber: "",
        gender: "",
        dob: "",
        doj: "",
        address: "",
        pincode: "",
        bloodGroup: "",
        religion: "",
        moi: "",
        community: "",
        groupCode: "",
        disabilityName: "",
        motherTongue: "",
        bankAccount: "",
        ifscCode: "",
        micr: "",
        tcNumber: "",
        tcStatus: "",
        tcIssueDate: "",
        studentImg: null,
      });
      setSelectedFile(null);
      navigate("/Students");
      toast.success("Students Update successfully!"); 

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message); 
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormData((prevData) => ({ ...prevData, studentImg: file }));
  };
  return (
    <div className="container-fluid bg-pale-blue py-3">
      <Form className="studentregisterform roboto-font" onSubmit={handleSubmit} style={{marginBottom:'20%'}}>
        <div className="p-3 bg-white rounded-4">
          <Row className="justify-content-between align-items-center mt-2 mb-3">
            <Col xs={"auto"}>
              <span className="fw-600 roboto-font" style={{ fontSize: "20px" }}>
                New Student
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    EMIS id
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="Students-input"

                    name="emisId"
                    value={formData.emisId}
                    onChange={handleChange}
                    isInvalid={!!error.emisId}
                    placeholder="Enter EMIS ID"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.emisId}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Name
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="Students-input"

                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!error.name}
                    placeholder="Enter Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.name}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Name in Tamil
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="Students-input"

                    name="nameInTamil"
                    value={formData.nameInTamil}
                    onChange={handleChange}
                    isInvalid={!!error.nameInTamil}
                    placeholder="Enter Name in Tamil"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.nameInTamil}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Class
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    isInvalid={!!error.class}
                  >
                    <option value="">Select Class</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {error.class}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Section
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    isInvalid={!!error.section}
                  >
                    <option value="">Select section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {error.section}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Father Name
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="Students-input"

                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    isInvalid={!!error.fatherName}
                    placeholder="Enter Father's Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.fatherName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Father Name in Tamil
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="fatherTamilName"
                    value={formData.fatherTamilName}
                    onChange={handleChange}
                    className="Students-input"

                    isInvalid={!!error.fatherTamilName}
                    placeholder="Enter Father's Name in Tamil"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.fatherTamilName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col
              sm={6}
              xl={3}
            >
              <Row>
                <Col>
                  <Form.Label column sm={12}>
                    Mother Name
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="motherName"
                    className="Students-input"
                    value={formData.motherName}
                    onChange={handleChange}
                    isInvalid={!!error.motherName}
                    placeholder="Enter Mother's Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.motherName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
          </Row>
          <StudentUpdateclone
            handleChange={handleChange}
            formData={formData}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            handleFileClick={handleFileClick}
            handleFileRemove={handleFileRemove}
            error={error} // Pass error object

          />{" "}
        </div>

        <Row className="justify-content-end align-items-center my-4 gy-2">
          <Col xs={"auto"}>
            <Button
              className="fw-600"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#ED1C00",
                border: "none",
                width: "160px",
              }}
              onClick={handleDiscard}
            >
              Discard
            </Button>
          </Col>
          <Col xs={"auto"}>
            <Button
              className="fw-600"
              style={{
                backgroundColor: "#3474EB",
                color: "#FFFFFF",
                border: "none",
                width: "160px",
              }}
              type="submit"
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default StudentRegisterupdate;
