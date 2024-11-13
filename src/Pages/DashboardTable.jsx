import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { useOpening } from "../hooks/useOpening";
import { useCommon } from "../hooks/useCommon";

function DashboardTable() {
  const { openingBalanceData, handleGetAllOpeningBalance} = useOpening();
  const {getAmountWithCommas, getDate} = useCommon()

  useEffect(()=>{
    handleGetAllOpeningBalance(5)
  },[])
  const accoutHead = (data)=>{ 
    return data?.length > 18 ? `${data?.slice(0, 15)}...` : data
  }

  return (
    <div>
  <Card className="p-3 m-3">
      <div className="d-flex justify-content-between ">
    
        <div className="mt-3 mb-3">
          <h4>
            <b className="title ">Opening Balance List</b>
          </h4>
        </div>
        <div className="mt-3 mb-3">
          <Card style={{ borderColor: "#3474EB", height: "2rem" }}>
          <a href="/OpeningBalance" style={{textDecoration:'none'}}>

       
            <div className="p-1">
              <p style={{ color: "#3474EB" }}>View All</p>
            </div>
            </a>
          </Card>
        </div>
      </div>
      <div className="table-responsive">
        <Table responsive="xl">
          <thead style={{ color: "#505050" }}>
            <tr style={{ color: "#505050" }}>
              <th>Date</th>
              <th>Account Head</th>
              <th>Sub Account Head</th>
              <th>Cash Amount</th>
              <th>Bank Amount</th>
              <th>Diocesan Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              openingBalanceData.map((data)=>(
                <tr key={data._id} style={{fontSize:"15px"}}>
                  <td>{getDate(data.date)}</td>
                  <td>{accoutHead(data.accountHead)}</td>
                  <td>{accoutHead(data.subAccountHead) || "-"}</td>
                  <td>Rs. {getAmountWithCommas(data.cash || 0)}</td>
                  <td>Rs. {getAmountWithCommas(data.bank || 0)}</td>
                  <td>Rs. {getAmountWithCommas(data.diocesan || 0)}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      
      </div>
      </Card>
    </div>
  );
}

export default DashboardTable;
