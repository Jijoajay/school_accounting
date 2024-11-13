import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Table, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import request from "../Request"; // Adjust the path as necessary
import useAccountHeads from "../hooks/useAccountHeads"; // Adjust the import path

import { toast } from "react-toastify"; // Import toast

function VoucherCashEnter({ open, onClose, edit, selectedId }) {
    // Initial form state
  const initialValue = {
    accountHead: "",
    remarks: "",
    cash: 0,
    bank: 0,
    voucherNo: 0,
  };
  // State variables
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialValue);
  const { accountHeads   } = useAccountHeads();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "cash" || name === "bank"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };
  // Validate form data

  const validate = () => {
    const newErrors = {};
    if (!formData.accountHead)
      newErrors.accountHead = "Account Head is required.";
    if (isNaN(formData.cash) || formData.cash < 0)
      newErrors.cash = "Cash must be a positive number.";
    if (isNaN(formData.bank) || formData.bank < 0)
      newErrors.bank = "Bank must be a positive number.";
    if (!formData.voucherNo)
      newErrors.voucherNo = "Voucher Number is required.";
    return newErrors;
  };
  // Handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();// Prevent default form submission behavior
    setLoading(true);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
        // Determine API endpoint based on edit mode

    const url = edit
      ? request.put(`updateVoucher/${selectedId}`, formData)
      : request.post("addVoucher", formData);

    url
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        if (response.status === 201) {
          toast.success("Voucher added successfully!");
          setFormData(initialValue)
          onClose();
        } else if (response.status === 200) {
          toast.success("Voucher updated successfully!");
          setFormData(initialValue)
          onClose();
        }
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        toast.error(err.response?.data?.message);
        setErrors({ submit: "Error submitting form. Please try again." });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Fetch voucher data if editing an existing voucher

  useEffect(() => {
    if (selectedId && edit) {
      const handleGetVoucherData = async () => {
        try {
          const response = await request.get(`getVoucherById/${selectedId}`);
          setFormData(response.data.data);
        } catch (error) {
          console.log("error at fetching single voucher data", error);
        }
      };
      handleGetVoucherData();
    } else if (!edit) {
      setFormData(initialValue);
    }
  }, [edit]);

  return (
    <Modal show={open} onHide={onClose} size="xl" centered>
      <Modal.Body>
        <div className="container-fluid p-3">
          <Form
            className="openingbalanceform roboto-font stylelabel styleinput"
            onSubmit={handleSubmit}
          >
            <Row className="justify-content-between align-items-center mt-2 mb-3">
              <Col xs={"auto"}>
                <span className="modalformheading">Voucher Number Form</span>
              </Col>
              <Col xs={"auto"}>
                <IoIosCloseCircleOutline
                  size={32}
                  className="modalformclosebtn"
                  onClick={onClose}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <Row>
                  <Col>
                    <Form.Label column sm={12}>
                      Account Head
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                    {errors.accountHead && (
                      <div className="text-danger">{errors.accountHead}</div>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col>
                    <Form.Label column sm={12}>
                      Remarks
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className=""
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                    />
                    {errors.remarks && (
                      <div className="text-danger">{errors.remarks}</div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={6}>
                <Row>
                  <Col>
                    <Form.Label column sm={12}>
                      Cash
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder=""
                      className=""
                      name="cash"
                      value={formData.cash}
                      onChange={handleInputChange}
                    />
                    {errors.cash && (
                      <div className="text-danger">{errors.cash}</div>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col>
                    <Form.Label column sm={12}>
                      Bank
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder=""
                      className=""
                      name="bank"
                      value={formData.bank}
                      onChange={handleInputChange}
                    />
                    {errors.bank && (
                      <div className="text-danger">{errors.bank}</div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <Row>
                  <Col>
                    <Form.Label column sm={12}>
                      Voucher Number
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className=""
                      name="voucherNo"
                      value={formData.voucherNo}
                      onChange={handleInputChange}
                    />
                    {errors.voucherNo && (
                      <div className="text-danger">{errors.voucherNo}</div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="justify-content-end align-items-center my-4 gy-2">
              <Col xs={"auto"}>
                <Button
                  className="fw-600 modalformdiscardbtn"
                  onClick={onClose}
                >
                  Discard
                </Button>
              </Col>
              <Col xs={"auto"}>
                <Button
                  className="fw-600 modalformsavebtn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : edit ? (
                    "Update"
                  ) : (
                    "Save"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default VoucherCashEnter;
