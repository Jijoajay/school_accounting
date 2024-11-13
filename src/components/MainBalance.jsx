import React, { useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useCommon } from "../hooks/useCommon";
import { Modal, Row, Col,  } from "react-bootstrap";


export const MainBalance = () => {
    const {dashBoard, handleFetchDashboardData} = useDashboard()
    const {getAmountWithCommas} = useCommon()
    useEffect(()=>{
        handleFetchDashboardData()
    },[])

    const mainBalanceDetails = [
        {
            id:1,
            title:"C/B CASH ",
            apiTitle:"totalCash",
        },
        {
            id:2,
            title:"C/B BANK ",
            apiTitle:"totalBank",
        },
        {
            id:3,
            title:"C/B DIOCESAN ",
            apiTitle:"totalDiocesan",
        },
    ]

  return (
    <Modal.Body style={{ borderColor: "#3474EB" }}>
      <div className="p-3 ">
        <div
          style={{
            textAlign: "center",
            borderTop: "2px solid #3474EB",
            borderBottom: "2px solid #3474EB",
          }}
        >
          <h4 className="mt-3 mb-3">
            <b style={{ textAlign: "center", color: "#00A62F" }}>
              Closing Balance as on 25/10/2024
            </b>
          </h4>
        </div>

        <Row className=" mt-2 mb-3 ">
          <Col
            style={{
              textAlign: "start",
            }}
            className="mx-5"
          >
            <div style={{marginBottom:"1rem"}}>
              <h5>
                <b className="title ">MAIN CASH BOOK BALANCE</b>
              </h5>
            </div>
            {
                mainBalanceDetails.map((item) => (
                  <div
                    className="d-flex justify-content-start gap-1"
                    style={{ textAlign: "center", gap:"8px",alignItems:'center' }}
                    key={item.id}
                    >
                        <div style={{width:'150px',textAlign:'start'}}>
                            {" "}
                            <h5>
                            <b className="title" >{item.title}</b>
                            </h5>
                        </div>
                        <p className="title mx-2" ><b>:</b></p>
                        <div className="mx-4">
                            {" "}
                            <h5>
                            <b style={{color: dashBoard[0]?.[item?.apiTitle] < 0 ? "red" : ""}}>₹ {getAmountWithCommas(dashBoard[0]?.[item?.apiTitle] || 0)}</b>
                            </h5>
                        </div>
                    </div>
                ))
            }
          </Col>
        </Row>
      </div>
    </Modal.Body>
  );
};
