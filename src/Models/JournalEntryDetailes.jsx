import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Row, Col } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import request from "../Request"; // Ensure this is the correct import path for your request utility
import { toast } from 'react-toastify'; // Import toast
import { useCommon } from "../hooks/useCommon";

function JournalEntryDetailes({ open, onClose, accountId, entryId }) {
  const {getAmountWithCommas, getDate} = useCommon()

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

  useEffect(() => {
    if (entryId) {
      const handleGetSingleJournal = async () => {
        try {
          const response = await request.get(`getJournalEntryById/${entryId}`);
          const fetchedData = response.data.data;

          setFormData({
            rp: fetchedData.rp || "",
            transactionMode: fetchedData.transactionMode || "",
            accountHead: fetchedData.accountHead || "",
            subAccountHead: fetchedData.subAccountHead || "",
            amount: fetchedData.amount || "",
            diocesan: fetchedData.diocesan || 0,
            narration: fetchedData.narration || "",
            date: fetchedData.date ? getDate(fetchedData.date) : '',
          });
        } catch (error) {
          console.log("Error fetching journal entry:", error);
          toast.error(error?.response?.data.message);
        }
      };
      handleGetSingleJournal();
    }
  }, [entryId]);

  return (
    <Modal show={open} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div className="container-fluid p-3">
          <div className='openingbalanceform roboto-font detailsdiv'>
            <Row className='justify-content-end align-items-center mt-2 mb-3'>
              <Col xs={'auto'}>
                <IoIosCloseCircleOutline size={32} className='modalformclosebtn' onClick={onClose} />
              </Col>
            </Row>
            <Row>
              <Col className='text-break'>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Date</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.date}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Receipt/Payment</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.rp}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Transaction Mode</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.transactionMode}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Account Head</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.accountHead}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Sub Account Head</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.subAccountHead}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Amount</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>₹ {formData.amount}</p>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col sm={6}>
                    <p className='detailslabel'>Narration</p>
                  </Col>
                  <Col sm={6}>
                    <p className='detailsvalue'>{formData.narration}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default JournalEntryDetailes;
