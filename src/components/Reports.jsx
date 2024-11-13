import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import { useCommon } from "../hooks/useCommon";
import { useReports } from "../hooks/useReports";
import AccountHead from "../Pages/AccountHead";
import { SubAccountHead } from "../Pages/SubAccountHead";
import { GetDate } from "../Pages/Date";
import { CustomTableColumn } from "../Pages/TransactionMode";
import { NoData } from "./NoData";
import Pagination from "./Pagination";
import DownloadButton from './DownloadButton';
import request from "../Request"; 

function Reports() {
  const itemsPerPage = 10;
  const [rp, setRp] = useState("");
  const [search, setSearch] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [transactionMode, setTrasactionMode] = useState("");
  const [selectedAccountHead, setSelectedAccountHead] = useState("");
  const [selectedSubAccountHead, setSelectedSubAccountHead] = useState("");
  
  const { getDate, getAmountWithCommas } = useCommon();
  const { reportData, reportTotal, handleGetAllReports } = useReports();
  
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  const accoutHead = (data) => {
    return data?.length > 18 ? `${data?.slice(0, 15)}...` : data;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const obj = {
      page: currentPage,
      limit: itemsPerPage,
      from: fromDate,
      to: toDate,
      accountHead: selectedAccountHead,
      subAccountHead: selectedSubAccountHead,
      search: search,
      rp: rp,
      transactionMode: transactionMode,
    };
    handleGetAllReports(obj);
  }, [
    currentPage,
    fromDate,
    toDate,
    selectedAccountHead,
    selectedSubAccountHead,
    search,
    rp,
    transactionMode,
    search,
  ]);


  const fetchFullReportsData = async () => {
    if (!reportTotal || reportTotal <= 0) {
        return [];
    }

    try {
        const response = await request.get(`getAllReports?limit=${reportTotal}`);
        
        const flattenedData = response?.data?.data.map(report => ({
            date: report.date,
            narration: report.narration,
            cash_r: report?.r?.cash,
            bank_r: report?.r?.bank,
            diocesan_r: report?.r?.diocesan,
            cash_p: report?.p?.cash,
            bank_p: report?.p?.bank,
            diocesan_p: report?.p?.diocesan
        }));
        return flattenedData;
    } catch (error) {
        return [];
    }
};



  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="d-flex justify-content-between">
        <div>
          <h4>
            <b className="title">Reports</b>
          </h4>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <DownloadButton
                fetchData={fetchFullReportsData}
                columns={[
                  { header: "Date", dataKey: "date" },
                  { header: "Narration", dataKey: "narration" },
                  { header: "R.Cash", dataKey: "cash_r" },
                  { header: "R.Bank", dataKey: "bank_r" },
                  { header: "R. Diocesan", dataKey: "diocesan_r" },
                  { header: "P.Cash", dataKey: "cash_p" },
                  { header: "P.Bank", dataKey: "bank_p" },
                  { header: "P. Diocesan", dataKey: "diocesan_p" }
                ]} 
                filename="Reports"
                heading="Reports"
                disabled={reportData.length===0}
            />
          </div>
        </div>
      </div>

      <div className="row mb-2 mt-5 ">
        <div className="col-sm-6 mt-2" >
        <Form.Label></Form.Label>

          <CustomTableColumn title={"Receipt/Payment :"} selectedItem={rp} setSelectedItem={setRp}/>
        </div>

        {/* Section Dropdown */}
        <div className="col ">
          <Form.Label>Select Account Head</Form.Label>
          <AccountHead onSelect={setSelectedAccountHead} isTitle={false} />
        </div>
      </div>


      <div className="row mb-2 mt-2 ">
        <div className="col-sm-6 ">
          <Form.Label>Select Sub Account Head</Form.Label>
          <SubAccountHead
            onSelect={setSelectedSubAccountHead}
            isTitle={false}
          />
        </div>

        {/* Section Dropdown */}
        <div className="col mt-2">
        <Form.Label></Form.Label>
<div className="d-flex">
<div>
            <GetDate
              title={"From"}
              selectedDate={fromDate}
              setSelectedDate={setFromDate}
            />
          </div>
          <div className="mx-2">
            <GetDate
              title={"To"}
              selectedDate={toDate}
              setSelectedDate={setToDate}
              fromDate={fromDate}
            />
          </div>
          <div >


              <Form.Control
                type="text"
                placeholder="search...."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                style={{
              
                  color: "#FFFFFF",
                }}
              />
          
          </div>
</div>
         
        </div>
      </div>

      {/* New Student Button */}

      {/* Table */}
      <div className="table-responsive">
        <Table responsive="xl">
          <thead style={{ color: "#505050" }}>
            <tr>
              <th>Date</th>
              <th>Narration</th>
              {
                rp !== "Payment" &&
                <>
                  <th>R. Cash</th>
                  <th>R. Bank</th>
                  <th>R. Diocesan</th>
                </>
              }
              {
                rp !== "Receipt" &&
                <>
                  <th>P. Cash</th>
                  <th>P. Bank</th>
                  <th>P. Diocesan</th>
                </>
              }
            </tr>
          </thead>
          <tbody>
            {
              reportData.length > 0 &&
              reportData.map((data)=>(
                  <tr key={data._id} style={{ cursor: "pointer" }}>
                    <td>
                      <a
                      href="/StudentDetails"
                      style={{ textDecoration: "none", color: "#505050" }}
                    >
                      {getDate(data.date)}
                    </a>
                    </td>
                    <td>{accoutHead(data.narration) || "-"}</td>
                    {
                      rp !== "Payment" &&
                      <>
                        <td>Rs. {getAmountWithCommas(data.r.cash || 0)}</td>
                        <td>Rs. {getAmountWithCommas(data.r.bank || 0)}</td>
                        <td>Rs. {getAmountWithCommas(data.r.diocesan || 0)}</td>
                      </>
                    }
                    {
                      rp !== "Receipt" &&
                      <>
                        <td>Rs. {getAmountWithCommas(data.p.cash || 0)}</td>
                        <td>Rs. {getAmountWithCommas(data.p.bank || 0)}</td>
                        <td>Rs. {getAmountWithCommas(data.p.diocesan || 0)}</td>
                      </>
                    }
                  </tr>
                ))
            }
          </tbody>
        </Table>
        <NoData model={reportData} />
      </div>
      {
        reportData.length !== 0 &&
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(reportTotal / itemsPerPage)}
            onPageChange={handlePageChange}
        />
      }
    </div>
  );
}

export default Reports;
