import React from "react";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import trash from "../img/trash.svg";

const StudentRegisterclone = ({
  handleChange,
  formData,
  handleFileChange,
  selectedFile,
  handleFileClick,
  handleFileRemove,
  error,
}) => {
  return (
    <div>
      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Mother Name in Tamil
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="Students-input"
                type="text"
                name="motherTamilName"
                value={formData.motherTamilName}
                onChange={handleChange}
                isInvalid={!!error.motherTamilName}
                placeholder="Enter Mother Name in Tamil"
              />
              <Form.Control.Feedback type="invalid">
                {error.motherTamilName}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Aadhar Number
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="aadharNumber"
                className="Students-input"
                value={formData.aadharNumber}
                onChange={handleChange}
                isInvalid={!!error.aadharNumber}
                placeholder="Enter Aadhar Number"
              />
              <Form.Control.Feedback type="invalid">
                {error.aadharNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Phone Number
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="phoneNumber"
                className="Students-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                isInvalid={!!error.phoneNumber}
                placeholder="Enter Phone Number"
              />
              <Form.Control.Feedback type="invalid">
                {error.phoneNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Date of Birth
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                name="dob"
                className="Students-input"
                value={formData.dob}
                onChange={handleChange}
                isInvalid={!!error.dob}
              />
              <Form.Control.Feedback type="invalid">
                {error.dob}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Gender
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!error.gender}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {error.gender}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Date of Joining
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                name="doj"
                className="Students-input"
                value={formData.doj}
                onChange={handleChange}
                isInvalid={!!error.doj}
              />
              <Form.Control.Feedback type="invalid">
                {error.doj}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Address
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="address"
                className="Students-input"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!error.address}
              />

              <Form.Control.Feedback type="invalid">
                {error.address}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Pincode
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="pincode"
                className="Students-input"
                isInvalid={!!error.pincode}
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode"
              />
              <Form.Control.Feedback type="invalid">
                {error.pincode}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Blood Group
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                isInvalid={!!error.bloodGroup}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {error.bloodGroup}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Religion
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="religion"
                className="Students-input"
                value={formData.religion}
                onChange={handleChange}
                isInvalid={!!error.religion}
                placeholder="Enter Religion"
              />
              <Form.Control.Feedback type="invalid">
                {error.religion}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Medium of Instruction
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="moi"
                className="Students-input"
                value={formData.moi}
                onChange={handleChange}
                isInvalid={!!error.moi}
                placeholder="Enter Medium of Instruction"
              />
              <Form.Control.Feedback type="invalid">
                {error.moi}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Admission Number
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="admissionNumber"
                placeholder="Enter Admission Number"
                value={formData.admissionNumber}
                onChange={handleChange}
                isInvalid={!!error.admissionNumber}
              />
              <Form.Control.Feedback type="invalid">
                {error.admissionNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Community
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="community"
                value={formData.community}
                onChange={handleChange}
                isInvalid={!!error.community}
                placeholder="Enter Community"
              />
              <Form.Control.Feedback type="invalid">
                {error.community}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Disability Group Name
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="disabilityName"
                value={formData.disabilityName}
                onChange={handleChange}
                placeholder="Enter Disability Group Name"
                isInvalid={!!error.disabilityName}
              />
              <Form.Control.Feedback type="invalid">
                {error.disabilityName}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Group Code
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="groupCode"
                className="Students-input"
                value={formData.groupCode}
                onChange={handleChange}
                placeholder="Enter Group Code"
                isInvalid={!!error.groupCode}
              />
              <Form.Control.Feedback type="invalid">
                {error.groupCode}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Mother Tongue
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleChange}
                isInvalid={!!error.motherTongue}
                placeholder="Enter Mother Tongue"
              />
              <Form.Control.Feedback type="invalid">
                {error.motherTongue}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                Bank Account
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                isInvalid={!!error.bankAccount}
                placeholder="Enter Bank Account"
              />
              <Form.Control.Feedback type="invalid">
                {error.bankAccount}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                IFSC Code
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                isInvalid={!!error.ifscCode}
                placeholder="Enter ifsc code"
              />
              <Form.Control.Feedback type="invalid">
                {error.ifscCode}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                MICR
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="micr"
                value={formData.micr}
                onChange={handleChange}
                isInvalid={!!error.micr}
                placeholder="Enter MICR"
              />
              <Form.Control.Feedback type="invalid">
                {error.micr}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                TC Number
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                className="Students-input"
                name="tcNumber"
                value={formData.tcNumber}
                onChange={handleChange}
                placeholder="Enter TC Number"
                isInvalid={!!error.tcNumber}
              />
              <Form.Control.Feedback type="invalid">
                {error.tcNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                TC Status
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                name="tcStatus"
                className="Students-input"
                value={formData.tcStatus}
                onChange={handleChange}
                isInvalid={!!error.tcStatus}
              >
                <option value="">Select Status</option>
                <option value="issue"> Issue</option>
                <option value="discontinue"> Discontinue</option>
                <option value="derminal Class"> Terminal Class</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {error.tcStatus}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          <Row>
            <Col>
              <Form.Label column sm={12}>
                TC Issue Date
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                className="Students-input"
                name="tcIssueDate"
                value={formData.tcIssueDate}
                onChange={handleChange}
                isInvalid={!!error.tcIssueDate}
              />
              <Form.Control.Feedback type="invalid">
                {error.tcIssueDate}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Col>
        <Col sm={6} xl={3}>
          {/* <Row>
            <Col>
              <Form.Label column sm={12}>
                Photo of Student
              </Form.Label>
            </Col>
          </Row> */}
          {/* <Row className="align-items-center">
            <Col>
              <Form.Control
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {!selectedFile ? (
                <Row>
                  <Col>
                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "#3474EB",
                        width: "100%",
                        border: "1px dashed #3474EB",
                      }}
                      onClick={handleFileClick}
                    >
                      Upload Image
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col xs="auto" className="d-flex align-items-center">
                    <span
                      className="me-1 mt-2"
                      style={{
                        wordBreak: "break-all",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                        color: "#3474EB",
                      }}
                    >
                      {selectedFile.name}
                    </span>
                    <Button
                      variant="link"
                      onClick={handleFileRemove}
                      className=" p-0  d-flex justify-content-center align-items-center mt-2"
                      style={{ width: "16px", height: "16px" }}
                    >
                      <img
                        className=""
                        src={trash}
                        alt="Delete"
                        style={{
                          width: "14px",
                          height: "14px",
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row> */}
          <Row>
            <Col className="d-flex justify-content-start align-items-center"></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StudentRegisterclone;
