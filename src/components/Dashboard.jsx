import React, { useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardTable from "../Pages/DashboardTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CashAmount from "../img/CashAmount.png";
import Card from "react-bootstrap/Card";
import CashAmount2 from "../img/CashAmount2.png";
import BankAmount from "../img/BankAmount.png";
import BankAmount2 from "../img/BankAmount2.png";
import DiocesanAmount from "../img/DiocesanAmount.png";
import DiocesanAmount2 from "../img/DiocesanAmount2.png";
import { useDashboard } from "../hooks/useDashboard";
import { useCommon } from "../hooks/useCommon";

function Dashboard() {
  const {dashBoard, handleFetchDashboardData} = useDashboard()
  const { getAmountWithCommas } = useCommon()

  useEffect(()=>{
    handleFetchDashboardData()
  },[])

  const dashboardDetails = [
    {
      id:1,
      img:CashAmount,
      title:"Cash Amount",
      designImg:CashAmount2,
      bgColor:"#E0F9FC",
      backTitle:"totalCash"
      
    },
    {
      id:2,
      img:BankAmount,
      title:"Bank Amount",
      designImg:BankAmount2,
      bgColor:"#FCEAEB",
      backTitle:"totalBank"
    },
    {
      id:3,
      img:DiocesanAmount,
      title:"Diocesan Amount",
      designImg:DiocesanAmount2,
      bgColor:"#E6F7EE",
      backTitle:"totalDiocesan"
    },
  ] 
  return (
    <>
      <div>
        <div className="p-3">
          <h4>
            <b className="title">Opening Balance </b>
          </h4>
        </div>

        <Row className="p-3">
          {
            dashboardDetails.map((item)=>(
              <Col key={item.id}>
                <Card
                  style={{
                    backgroundColor: item?.bgColor,
                    borderRadius: "30px",
                    height: "13rem",
                  }}
                >
                  <div className="d-flex pt-3 px-3">
                    <div>
                      <img src={item?.img} alt="Cash Amount" />
                    </div>
                    <div className="mx-4">
                      <h1 className=" d-flex">
                        <b className="CashAmount"> ₹ {getAmountWithCommas(dashBoard[0]?.[item?.backTitle] || 0)}</b>
                      </h1>
                      <p style={{ color: "#9F9F9F" }}>{item?.title}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <img
                      src={item?.designImg}
                      alt="Cash Amount"
                      style={{ background: "cover", height: "100%" }}
                    />
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
      <DashboardTable />
    </>
  );
}

export default Dashboard;
