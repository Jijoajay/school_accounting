import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDashboard } from "../hooks/useDashboard";
import { useCommon } from "../hooks/useCommon";

function JournalEntryCashEntryDetailes() {

  const {dashBoard, handleFetchDashboardData} = useDashboard()
  const {getAmountWithCommas} = useCommon()
  useEffect(()=>{
      handleFetchDashboardData()
  },[])



  const mainBalanceDetails = [
    {
        id:1,
        title:"C/B CASH",
        apiTitle:"totalCash",
    },
    {
        id:2,
        title:"C/B BANK",
        apiTitle:"totalBank",
    },
    {
        id:3,
        title:"C/B DIO",
        apiTitle:"totalDiocesan",
    },
]

  return (
    <div>
        <div className="p-3">

      
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
                        <div style={{width:'100px',textAlign:'start'}}>
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

        </div>  
    </div>
  )
}

export default JournalEntryCashEntryDetailes