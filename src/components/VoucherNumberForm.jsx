import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FiPlus } from "react-icons/fi";
import { GoFilter } from "react-icons/go";
import { IconContext } from "react-icons";
import { LuPenLine } from "react-icons/lu";
import VoucherCashEnter from "../Models/VoucherCashEnter";
import VoucherAdmin from "../Models/VoucherAdmin";
import { useVoucher } from "../hooks/useVoucher";
import { useCommon } from "../hooks/useCommon";
import AccountHead from "../Pages/AccountHead";
import { Search } from "../Pages/Search";
import { NoData } from "./NoData";
import Pagination from "./Pagination";
import DownloadButton from './DownloadButton';
import request from "../Request"; 

function VoucherNumberForm() {
  // State for modals
  const [modalJournalEntryCashEntry, setModalJournalEntryCashEntry] = useState(false);
  const [modalCashBookEntryUpdate, setModalCashBookEntryUpdate] = useState(false);
  
  // Items per page for pagination
  const itemsPerPage = 10;

  // State for search input and editing
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedAccountHead, setSelectedAccountHead] = useState("");

  // Hooks for common utilities and voucher management
  const { getAmountWithCommas } = useCommon();
  const { voucherData, voucherTotal, handleGetAllVoucher } = useVoucher();
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  // Function to truncate account head names for display
  const accoutHead = (data) => {
    return data?.length > 20 ? `${data?.slice(0, 20)}...` : data;
  };

  // Handle page changes in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch voucher data whenever filters or page changes
  useEffect(() => {
    const obj = {
      accountHead: selectedAccountHead,
      limit: itemsPerPage,
      page: currentPage,
      search: search,
    };
    handleGetAllVoucher(obj);
  }, [selectedAccountHead, search, currentPage, modalJournalEntryCashEntry]);

  // Function to fetch full voucher data for download
  const fetchFullVoucherData = async () => {
    if (!voucherTotal || voucherTotal <= 0) {
      return [];
    }

    try {
      const response = await request.get(`getAllVoucher?limit=${voucherTotal}`);
      return response?.data?.data;
    } catch (error) {
      return [];
    }
  };

  // Open modal for editing an existing voucher
  const handleOpenAdminModal = (id) => {
    setModalCashBookEntryUpdate(true);
    setIsEdit(true);
    setSelectedId(id);
  };

  // Open modal for creating a new voucher
  const handleOpenPostModel = () => {
    setModalJournalEntryCashEntry(true);
    setIsEdit(false);
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="d-flex justify-content-between">
        <div>
          <h4>
            <b className="title">Voucher Number List</b>
          </h4>
        </div>
        <div></div>
      </div>

      <div className="row mb-2 d-flex justify-content-between align-items-center">
        {/* Filter Button */}
        <div className="col-auto d-flex mt-2">
          <div className="card d-flex align-items-center justify-content-center filterbody p-2" style={{ height: "35px" }}>
            <IconContext.Provider value={{ className: "react-icons", size: "1.5em" }}>
              <div className="d-flex align-items-center">
                <GoFilter className="Filteric" />
                <span className="Filteric p-1">Filter</span>
              </div>
            </IconContext.Provider>
          </div>
        </div>
        
        {/* Account Head Selector */}
        <div className="col-auto mt-2">
          <AccountHead onSelect={setSelectedAccountHead} />
        </div>
        
        {/* Search Input */}
        <div className="col-auto mt-2">
          <Search search={search} setSearch={setSearch} />
        </div>
        
        {/* Download Button */}
        <div className="col-auto mt-2">
          <div className="d-flex align-items-center">
            <DownloadButton
              fetchData={fetchFullVoucherData}
              columns={[
                { header: "Account Head", dataKey: "accountHead" },
                { header: "Remarks", dataKey: "remarks" },
                { header: "Cash", dataKey: "cash" },
                { header: "Bank", dataKey: "bank" },
                { header: "Voucher No", dataKey: "voucherNo" }
              ]}
              filename="Vouchers"
              heading="Vouchers"
              disabled={voucherData.length===0}
            />
          </div>
        </div>

        {/* Button to Add Voucher */}
        <div className="col-auto mt-2">
          <Button className="addbuttons" onClick={handleOpenPostModel}>
            <span>
              <FiPlus /> Voucher Number
            </span>
          </Button>
        </div>
      </div>

      {/* Table for Displaying Vouchers */}
      <div className="table-responsive">
        <Table responsive="xl">
          <thead style={{ color: "#505050" }}>
            <tr>
              <th>Account Head</th>
              <th>Remarks</th>
              <th>Cash</th>
              <th>Bank</th>
              <th>Voucher Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              voucherData.length > 0 &&
              voucherData.map((data) => (
                <tr key={data._id} style={{ fontSize: "15px" }}>
                  <td>{accoutHead(data.accountHead) || "-"}</td>
                  <td>{accoutHead(data.remarks) || "-"}</td>
                  <td>Rs. {getAmountWithCommas(data.cash || 0)}</td>
                  <td>Rs. {getAmountWithCommas(data.bank || 0)}</td>
                  <td>{getAmountWithCommas(data.voucherNo || 0)}</td>
                  <td>
                    <div className="d-flex">
                      {/* Edit Icon for Voucher */}
                      <LuPenLine
                        style={{ fontSize: "1.5rem", color: "#3474EB" }}
                        onClick={() => handleOpenAdminModal(data?._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        
        {/* No Data Component */}
        <NoData model={voucherData} />
      </div>

      {/* Pagination Controls */}
      {
        voucherData.length !== 0 &&
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(voucherTotal / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      }

      {/* Modals for Adding and Editing Vouchers */}
      <VoucherCashEnter
        open={modalJournalEntryCashEntry}
        edit={isEdit}
        selectedId={selectedId}
        onClose={() => setModalJournalEntryCashEntry(false)}
      />
      <VoucherAdmin
        open={modalCashBookEntryUpdate}
        onClose={() => setModalCashBookEntryUpdate(false)}
        setModalJournalEntryCashEntry={setModalJournalEntryCashEntry}
      />
    </div>
  );
}

export default VoucherNumberForm;
