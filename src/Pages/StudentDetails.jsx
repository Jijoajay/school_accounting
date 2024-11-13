import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { useParams } from "react-router-dom";
import request from "../Request";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { _id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request.get(`getStudentById/${_id}`);
      if (response.data && response.data.data) {
        setUserDetails(response.data.data); // Update this line to access the correct data
      } else {
        throw new Error("User details not found");
      }
    } catch (error) {
      setError("Error fetching user details");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const details = [
    { label: "EMIS Number", value: userDetails.emisId },
    { label: "Name", value: userDetails.name },
    { label: "Name In Tamil", value: userDetails.nameInTamil },
    { label: "Class", value: userDetails.class },
    { label: "Section", value: userDetails.section },
    { label: "Father Name", value: userDetails.fatherName },
    { label: "Father Tamil Name", value: userDetails.fatherTamilName },
    { label: "Mother Name", value: userDetails.motherName },
    { label: "Mother Tamil Name", value: userDetails.motherTamilName },
    { label: "Aadhaar Number", value: userDetails.aadharNumber },
    { label: "Phone Number", value: userDetails.phoneNumber },
    {
      label: "Date of Birth",
      value: new Date(userDetails.dob).toLocaleDateString(),
    },
    { label: "Gender", value: userDetails.gender },
    {
      label: "Date of Joining",
      value: new Date(userDetails.doj).toLocaleDateString(),
    },
    { label: "Address", value: userDetails.address },
    { label: "Pin Code", value: userDetails.pincode },
    { label: "Blood Group", value: userDetails.bloodGroup },
    { label: "Religion", value: userDetails.religion },
    { label: "Medium of Instruction", value: userDetails.moi },
    { label: "Admission Number", value: userDetails.admissionNumber },
    { label: "Community", value: userDetails.community },
    { label: "Disability Group Name", value: userDetails.disabilityName },
    { label: "Group Code", value: userDetails.groupCode },
    { label: "Mother Tongue", value: userDetails.motherTongue },
    { label: "Bank Account", value: userDetails.bankAccount },
    { label: "IFSC Code", value: userDetails.ifscCode },
    { label: "MICR", value: userDetails.micr },
    { label: "TC Number", value: userDetails.tcNumber },
    { label: "TC Status", value: userDetails.tcStatus },
    {
      label: "TC Issue Date",
      value: new Date(userDetails.tcIssueDate).toLocaleDateString(),
    },
  ];
  const handleStudentClick = (userDetails) => {
    navigate(`/StudentRegisterupdate/${userDetails._id}`);
  };

  return (
    <div className="container-fluid bg-pale-blue roboto-font" style={{marginBottom:'20%'}}>
      <Row className="p-0 py-2 ps-1 bg-pale-blue">
        <Col className="p-0">
          <a
            href="/Students"
            style={{ textDecoration: "none", color: "#505050" }}
          >
            <FaArrowLeftLong size={24} />
          </a>
        </Col>
      </Row>
      <Row>
        <Col
          className="p-0 mb-2 rounded-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="detailsdiv border-1 p-3">
            <Row className="justify-content-between align-items-center pb-2">
              <Col xs={"auto"}>
                <span
                  className="fw-600"
                  style={{ fontSize: "20px", color: "#3474EB" }}
                >
                  Student Info
                </span>
              </Col>
              <Col xs={"auto"}>
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "#3474EB",
                    border: "none",
                  }}
                >
                  <Row>
                    <Col className="d-flex justify-content-center align-items-center pb-0 pe-1">
                      <LuPencilLine size={20} />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center ps-0">
                      <span
                        className="fw-600 poppins-font fw-normal"
                        style={{ lineHeight: "1" }}
                        onClick={() => handleStudentClick(userDetails)}

                      >
                        Edit
                      </span>
                    </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {details.map((detail, index) => (
                  <Row className="mb-2" key={index}>
                    <Col sm={6} lg={4}>
                      <p className="detailslabel text-break">{detail.label}</p>
                    </Col>
                    <Col sm={6} lg={8}>
                      <p className="detailsvalue text-break">{detail.value}</p>
                    </Col>
                  </Row>
                ))}
              </Col>
              {/* <Col sm={12} lg={4}>
                <Row className="justify-content-center justify-content-lg-end">
                  <Col xs={"auto"}>
                    <div className="studentdetailsimagediv">
                      <img
                        src={userDetails.studentImg}
                        alt="student"
                        className="studentsdetailsimage"
                      />
                    </div>
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDetails;
