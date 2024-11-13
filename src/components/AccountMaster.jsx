import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FiPlus } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { GoFilter } from "react-icons/go";
import { IconContext } from "react-icons";
import { LuPenLine } from "react-icons/lu";
import AccountMasterEntry from "../Models/AccountMasterEntry";
import AccountMasterUpdate from "../Models/AccountMasterUpdate";
import request from "../Request"; // Adjust the path as necessary
import { RiDeleteBinLine } from "react-icons/ri";
import Pagination from "../components/Pagination";
import AccountHead from "../Pages/AccountHead";
import { GetDate } from "../Pages/Date";
import { NoData } from "./NoData";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner
import { useCommon } from "../hooks/useCommon";

function AccountMaster() {
  const [modalCashBookEntry, setModalCashBookEntry] = useState(false);
  const [modalCashBookEntryUpdate, setModalCashBookEntryUpdate] =
    useState(false);
  const [accountData, setAccountData] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedAccountHead, setSelectedAccountHead] = useState("");
  const itemsPerPage = 10;
  const { getDate } = useCommon();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  const [totalPages, setTotalPages] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  // Function to refresh account data (used after adding/updating)

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await request.get(
        `/getAccountMaster?search=${searchTerm}&from=${fromDate}&to=${toDate}&accountHead=${selectedAccountHead}&page=${currentPage}&limit=${itemsPerPage}`
      );
      if (Array.isArray(response.data.data)) {
        setAccountData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        console.error(
          "Expected response.data.data to be an array",
          response.data.data
        );
        setAccountData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAccountData([]);
    } finally {
      setLoading(false); // End loading
    }
  };
  // Effect to fetch data when dependencies change
  const refreshData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await request.get(
        `/getAccountMaster?search=${searchTerm}&fromDate=${fromDate}&toDate=${toDate}&accountHead=${selectedAccountHead}&page=${currentPage}&limit=${itemsPerPage}`
      );
      if (Array.isArray(response.data.data)) {
        setAccountData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        console.error(
          "Expected response.data.data to be an array",
          response.data.data
        );
        setAccountData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAccountData([]);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    searchTerm,
    currentPage,
    fromDate,
    toDate,
    selectedAccountHead,
    modalCashBookEntry,
    modalCashBookEntryUpdate,
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (accountId) => {
    setSelectedAccounts((prev) => {
      if (prev.includes(accountId)) {
        return prev.filter((id) => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === accountData.length) {
      setSelectedAccounts([]);
    } else {
      const allAccountIds = accountData.map((account) => account._id);
      setSelectedAccounts(allAccountIds);
    }
  };

  const isAnySelected = selectedAccounts.length > 0;

  const handleEditClick = (accountId) => {
    setSelectedAccountId(accountId);
    setModalCashBookEntryUpdate(true);
  };

  const handleDeleteAccountMaster = async () => {
    try {
      await request.post(`deleteAccountMaster`, {
        selectedIds: selectedAccounts,
      });
      toast.success("Deleted successfully");
      await fetchData();
      setSelectedAccounts([]);
    } catch (error) {
      console.log("Error at deleting account master", error);
    }
  };

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="d-flex justify-content-between">
        <h4 className="title">
          <b>Account Master</b>
        </h4>
        <div className="col-auto">
          <Button
            className="addbuttons"
            onClick={() => setModalCashBookEntry(true)}
          >
            <FiPlus /> New Account Head
          </Button>
        </div>
        {isAnySelected && (
          <Button
            style={{
              backgroundColor: "white",
              color: "red",
              borderColor: "red",
            }}
            onClick={handleDeleteAccountMaster}
          >
            <RiDeleteBinLine /> Delete
          </Button>
        )}
      </div>

      <div className="row mb-2 mt-4 align-items-center" style={{gap:"10px"}}>
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
          <AccountHead onSelect={setSelectedAccountHead} />
        </div>

        <div className="col-auto mt-2">
          <GetDate
            title={"From"}
            selectedDate={fromDate}
            setSelectedDate={setFromDate}
          />
        </div>

        <div className="col-auto mt-2">
          <GetDate
            title={"To"}
            selectedDate={toDate}
            setSelectedDate={setToDate}
            fromDate={fromDate}
          />
        </div>

        <div className="col-auto mt-2">
          <Form.Control
            placeholder="Search...."
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        
      </div>

      <div className="table-responsive">
        <Table responsive>
          <thead style={{ color: "#505050" }}>
            <tr>
              <th>
                <div className="checkbox-wrapper-13">
                  <input
                    id="select-all"
                    type="checkbox"
                    checked={
                      accountData.length > 0 &&
                      accountData.length === selectedAccounts.length
                    }
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th>Created on</th>
              <th>Account Head</th>
              <th>Sub Account Head</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                {/* <td colSpan="5" style={{ textAlign: "center" }}>
                                    <Spinner animation="border" role="status" variant="primary" />
                                </td> */}
              </tr>
            ) : (
              accountData.map((account) => (
                <tr key={account._id}>
                  <td>
                    <div className="checkbox-wrapper-13">
                      <input
                        id={`checkbox-${account._id}`}
                        type="checkbox"
                        checked={selectedAccounts.includes(account._id)}
                        onChange={() => handleCheckboxChange(account._id)}
                      />
                    </div>
                  </td>
                  <td>{getDate(account?.createdAt)}</td>
                  <td>{account.accountHead}</td>
                  <td>{account.subAccountHead || "N/A"}</td>
                  <td>
                    <div className="d-flex">
                      <LuPenLine
                        style={{ fontSize: "1.5rem", color: "#3474EB" }}
                        onClick={() => handleEditClick(account._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <NoData model={accountData} /> {/* Show when there are no accounts */}
      </div>
      {accountData.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}   // Pagination controls
        />
      )}
      <AccountMasterEntry
        open={modalCashBookEntry} // Close new account modal
        onClose={() => setModalCashBookEntry(false)}
      />
      <AccountMasterUpdate
        open={modalCashBookEntryUpdate}// Close update modal
        onClose={() => setModalCashBookEntryUpdate(false)}
        accountId={selectedAccountId}
        refreshData={refreshData}
      />
    </div>
  );
}

export default AccountMaster;
