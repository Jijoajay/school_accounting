import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams } from "react-router-dom"; 
import request from "../Request"; 
import { useNavigate } from "react-router-dom";

function UserAccessnewDetailes() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user details based on userId.
  const fetchUserDetails = async () => {
    setLoading(true);// Set loading to true while fetching data.
    setError(null); // Reset any previous errors.
    try {
      const response = await request.get(`getUserById/${userId}`);
      if (response.data) {
        setUserDetails(response.data.data);// Store user details in state if available.
      } else {
        throw new Error("User details not found");
      }
    } catch (error) {
      setError("Error fetching user details");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch operation completes.
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);// Empty dependency array to run only once on mount.

  // Function to handle user deletion.
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await request.delete(`deleteUser/${userId}`); // Make API call to delete user
        navigate("/UserAccess");
      } catch (error) {
        setError("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  };
  // Define access items to display user access rights.
  const accessItems = [
    { label: "Students", key: "isStudent" },
    { label: "Transaction", key: "isTransaction" },
    { label: "Account View", key: "isAccountView" },
    { label: "Reports", key: "isReports" },
    { label: "Account Master", key: "isAccountMaster" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container p-3">
      <div className="bg-white p-3 mb-3 detailsdiv">
        <div className="d-flex justify-content-between align-items-center">
          <h4><b className="title">User</b></h4>
          <p className="DeleteUser" onClick={handleDelete}><RiDeleteBinLine /> Delete User</p>
        </div>

        {userDetails && (
          <>
            <Row className="mt-4 mb-2">
              <Col lg={2}><p className="detailslabel">Name</p></Col>
              <Col lg={8}><p className="detailsvalue">{userDetails.name}</p></Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col lg={2}><p className="detailslabel">User Name</p></Col>
              <Col lg={8}><p className="detailsvalue">{userDetails.userName}</p></Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col lg={2}><p className="detailslabel">Phone Number</p></Col>
              <Col lg={8}><p className="detailsvalue">{userDetails.phoneNumber}</p></Col>
            </Row>
          </>
        )}
      </div>

      <div className="bg-white p-3 mb-3">
        <Row className="mt-4 mb-4">
          <Col>
            <Form.Label><b>Access To</b></Form.Label>
            <div className="d-flex flex-wrap">
              {userDetails && userDetails.accessTo && accessItems.map(({ label, key }, index) => (
                <div className="checkbox-wrapper-28 me-3 mb-2" key={index}>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    className="promoted-input-checkbox"
                    checked={userDetails.accessTo[key]}
                    readOnly

                  />
                  <svg>
                    <use xlinkHref="#checkmark-28" />
                  </svg>
                  <label htmlFor={`checkbox-${index}`}>
                    <b style={{color:'#505050'}}>{label}</b>
                  </label>
                </div>
              ))}
              <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="checkmark-28" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeMiterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1" />
                </symbol>
              </svg>
            </div>
          </Col>
        </Row>
      </div>

      {/* <div className="d-flex justify-content-end">
        <Button
          className="Discard me-3"
          style={{ height: "35px" }}
          onClick={() => window.location.href="/UserAccess"}
        >
          Discard
        </Button>
        <Button className="addbuttons" style={{ height: "35px" }}>
          Set Access
        </Button> */}
      {/* </div> */}
    </div>
  );
}

export default UserAccessnewDetailes;
