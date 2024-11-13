import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FiPlus, FiDownload } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { GoFilter } from "react-icons/go";
import { IconContext } from "react-icons";
import InputGroup from "react-bootstrap/InputGroup";
import { LuPenLine } from "react-icons/lu";
import { LiaEyeSolid } from "react-icons/lia";
import JournalEntryCashEntry from "../Models/JournalEntryCashEntry";
import AdminPower from "../Models/AdminPower";
import JournalEntryDetailes from "../Models/JournalEntryDetailes";
import request from "../Request";
import { useJournal } from "../hooks/useJournal";
import { GetDate } from "../Pages/Date";
import AccountHead from "../Pages/AccountHead";
import { SubAccountHead } from "../Pages/SubAccountHead";
import { Search } from "../Pages/Search";
import { useCommon } from "../hooks/useCommon";
import Pagination from "./Pagination";
import { CustomTableColumn } from "../Pages/TransactionMode";
import { NoData } from "./NoData";
import { IoPrintOutline } from "react-icons/io5";
import Journaladd from "../Models/Journaladd";
import DownloadButton from "./DownloadButton";
import { toast } from "react-toastify";

function JournalEntry() {
  const { journalData, journalTotal, handleGetAllJournalData } = useJournal();
  const { getDate, getAmountWithCommas } = useCommon();
  const [modalJournalEntryCashEntry, setModalJournalEntryCashEntry] =
    useState(false);
  const [modalOpeningBalanceDetaies, setModalOpeningBalanceDetaies] =
    useState(false);
  const [modalCashBookEntryUpdate, setModalCashBookEntryUpdate] =
    useState(false);
  const itemsPerPage = 10;
  const [rp, setRp] = useState("");
  const [search, setSearch] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [transactionMode, setTrasactionMode] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountHead, setSelectedAccountHead] = useState("");
  const [selectedSubAccountHead, setSelectedSubAccountHead] = useState("");
  const [modalss, setModalss] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });
  const [selectedJournalEntryId, setSelectedJournalEntryId] = useState(null); // New state for selected entry ID
  // Helper function to truncate account head names

  const accoutHead = (data) => {
    return data?.length > 18 ? `${data?.slice(0, 15)}...` : data;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Effect to fetch journal data on relevant state changes

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
    handleGetAllJournalData(obj);
  }, [
    currentPage,
    fromDate,
    toDate,
    selectedAccountHead,
    selectedSubAccountHead,
    search,
    rp,
    transactionMode,
    modalJournalEntryCashEntry,
    modalss,
  ]);

  const fetchFullJournalData = async () => {
    if (!journalTotal || journalTotal <= 0) {
      return [];
    }

    try {
      const response = await request.get(
        `getJournalEntry?limit=${journalTotal}`
      );

      return response?.data?.data;
    } catch (error) {
      return [];
    }
  };

  const handleUpdateEntry = async (entry) => {
    const response = await request.updateJournalEntry(entry._id, entry);
    if (response.status === 200) {
      toast.success("Journal Entry updated successfully");
      handleGetAllJournalData({ page: currentPage, limit: itemsPerPage });
    } else {
      toast.error("Failed to update the entry!");
    }
  };

  const handleEditButtonClick = (data) => {
    setSelectedJournalEntryId(data._id);
    setSelectedAccountId(data._id);
    setModalCashBookEntryUpdate(true);
    setIsEdit(true);
  };

  const handlePostModel = () => {
    setModalss(true);
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="d-flex justify-content-between">
        <h4>
          <b className="title">Journal Entry </b>
        </h4>
        <Button className="addbuttons" onClick={handlePostModel}>
          <FiPlus /> Cash Book Entry
        </Button>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <div className="d-flex">
          <div className="me-2">
            <GetDate
              title={"From"}
              selectedDate={fromDate}
              setSelectedDate={setFromDate}
            />
          </div>
          <div>
            <GetDate
              title={"To"}
              selectedDate={toDate}
              setSelectedDate={setToDate}
              fromDate={fromDate}
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <DownloadButton
            fetchData={fetchFullJournalData}
            columns={[
              { header: "Date", dataKey: "date" },
              { header: "Receipt / Payment", dataKey: "rp" },
              { header: "Tra. Mode", dataKey: "transactionMode" },
              { header: "Account Head", dataKey: "accountHead" },
              { header: "Sub Account Head", dataKey: "subAccountHead" },
              { header: "Narration", dataKey: "narration" },
              { header: "Amount", dataKey: "amount" },
            ]}
            filename="JournalEntry"
            heading="JournalEntry"
            disabled={journalData.length===0}
          />
        </div>
      </div>

      <div className="row mb-2 d-flex justify-content-between align-items-center">
        <div className="col-auto mt-2">
        <div
            className="card d-flex align-items-center justify-content-center filterbody p-2"
            style={{ height: "35px" }}
          >
            <IconContext.Provider
              value={{ className: "react-icons", size: "1.5em" }}
            >
              <div className="d-flex align-items-center">
                <GoFilter className="Filteric" />
                <span className="Filteric p-1">Filter</span>
              </div>
            </IconContext.Provider>
          </div>
        </div>

        <div className="col-auto mt-2">
          <CustomTableColumn
            title={"Receipt/Payment :"}
            selectedItem={rp}
            setSelectedItem={setRp}
          />
        </div>

        <div className="col-auto mt-2">
          <CustomTableColumn
            title={"Tra.Mode :"}
            selectedItem={transactionMode}
            setSelectedItem={setTrasactionMode}
          />
        </div>

        <div className="col-auto mt-2">
          <AccountHead onSelect={setSelectedAccountHead} />
        </div>
        <div className="col-auto mt-2">
          <SubAccountHead onSelect={setSelectedSubAccountHead} />
        </div>
        <div className="col-auto mt-2">
          <Search search={search} setSearch={setSearch} />
        </div>
      </div>

      <div className="table-responsive">
        <Table responsive="xl">
          <thead style={{ color: "#505050" }}>
            <tr>
              <th>Date</th>
              <th>Receipt/Payment</th>
              <th>Tra. Mode</th>
              <th>Account Head</th>
              <th>Sub Account Head</th>
              <th>Narration</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {journalData.length > 0 &&
              journalData.map((data) => (
                <tr key={data._id} style={{ fontSize: "15px" }}>
                  <td>{getDate(data.date)}</td>

                  <td className={data.rp === "payment" ? "payment" : "receipt"}>
                    {data.rp === "payment" ? "Payment" : "Receipt"}
                  </td>

                  {/* <td>{data.rp}</td> */}
                  <td>{data.transactionMode}</td>
                  <td>{accoutHead(data.accountHead) || "-"}</td>
                  <td>{accoutHead(data.subAccountHead) || "-"}</td>
                  <td>{accoutHead(data.narration) || "-"}</td>
                  <td>Rs. {getAmountWithCommas(data.amount || 0)}</td>
                  <td>
                    <div
                      className="d-flex"
                      style={{ textAlign: "start", justifyContent: "start" }}
                    >
                      <LiaEyeSolid
                        style={{ fontSize: "1.5rem" }}
                        className="mx-1"
                        onClick={() => {
                          setSelectedJournalEntryId(data._id); // Set selected ID
                          setModalOpeningBalanceDetaies(true);
                        }}
                      />
                      <LuPenLine
                        style={{ fontSize: "1.5rem", color: "#3474EB" }}
                        onClick={() => handleEditButtonClick(data)} // Handle edit button click
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <NoData model={journalData} />
      </div>
      {journalData.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(journalTotal / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}

           {/* Modals for /updating entries */}

      <JournalEntryCashEntry
        open={modalJournalEntryCashEntry}
        edit={isEdit}
        onClose={() => setModalJournalEntryCashEntry(false)}
        accountId={selectedAccountId}
      />
        {/* Modals for detailes entries */}
      <JournalEntryDetailes
        open={modalOpeningBalanceDetaies}
        onClose={() => setModalOpeningBalanceDetaies(false)}
        accountId={selectedAccountId}
        entryId={selectedJournalEntryId} // Pass the selected journal entry ID
      />
      <AdminPower
        open={modalCashBookEntryUpdate}
        onClose={() => setModalCashBookEntryUpdate(false)}
        setModalJournalEntryCashEntry={setModalJournalEntryCashEntry}
        selectedEntry={selectedJournalEntryId}
        onUpdate={handleUpdateEntry}
      />
        {/* Modals for adding entries */}
      <Journaladd open={modalss} onClose={() => setModalss(false)} />
    </div>
  );
}

export default JournalEntry;
