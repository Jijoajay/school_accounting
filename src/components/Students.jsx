import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FiPlus, FiDownload } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { GoFilter } from "react-icons/go";
import { IconContext } from "react-icons";
import InputGroup from "react-bootstrap/InputGroup";
import { LuPenLine } from "react-icons/lu";
import request from "../Request"; // Adjust the path as necessary
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // State for gender
  const itemsPerPage = 10;

  const handleStudentClick = (student) => {
    navigate(`/StudentDetails/${student._id}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await request.get(`/getAllStudent`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: itemsPerPage,
          class: selectedClass,
          section: selectedSection,
          gender: selectedGender, // Include gender in the request
        },
      });
      setStudents(response.data.data || []);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // Set total pages for pagination
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, selectedClass, selectedSection, selectedGender]); // Fetch data when any filter changes

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setCurrentPage(1); // Reset to first page on class change
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    setCurrentPage(1); // Reset to first page on section change
  };

  const handleGenderChange = (event) => {
    // New handler for gender
    setSelectedGender(event.target.value);
    setCurrentPage(1); // Reset to first page on gender change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div style={{textAlign:'center',justifyContent:'center',justifyItems:'center',marginTop:'20%'}}>      <Spinner animation="border" variant="primary" />
</div>;
  }

  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <h4>
        <b className="title">Students</b>
      </h4>
      <div
        className="row mb-2 mt-5 d-flex justify-content-between align-items-center"
        style={{ position: "sticky" }}
      >
        {/* Filter Button */}
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

        {/* Class Dropdown */}
        <div className="col-auto mt-2">
          <InputGroup>
            <InputGroup.Text
              id="basic-addon1"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Class :
            </InputGroup.Text>
            <Form.Select
              aria-describedby="basic-addon1"
              style={{ borderLeft: "none" }}
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">All</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>

              {/* Add more classes as needed */}
            </Form.Select>
          </InputGroup>
        </div>

        {/* Section Dropdown */}
        <div className="col-auto mt-2">
          <InputGroup className="InputGroupText">
            <InputGroup.Text
              id="basic-addon1"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Section :
            </InputGroup.Text>
            <Form.Select
              aria-describedby="basic-addon1"
              style={{ borderLeft: "none" }}
              value={selectedSection}
              onChange={handleSectionChange}
            >
              <option value="">All</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
              <option value="F">Section F</option>
              <option value="G">Section G</option>

              {/* Add more sections as needed */}
            </Form.Select>
          </InputGroup>
        </div>

        {/* Gender Dropdown */}
        <div className="col-auto mt-2">
          <InputGroup className="InputGroupText">
            <InputGroup.Text
              id="basic-addon1"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Gender :
            </InputGroup.Text>
            <Form.Select
              aria-describedby="basic-addon1"
              style={{ borderLeft: "none" }}
              value={selectedGender}
              onChange={handleGenderChange} // Update the onChange handler
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </InputGroup>
        </div>

        {/* Search Field */}
        <div className="col-auto mt-2">
          <Form.Control
            id="Search"
            type="text"
            placeholder="Search"
            name="Search"
            value={searchTerm}
            onChange={handleSearch}
            style={{ fontSize: "small" }}
          />
        </div>

        {/* Download Icon */}
        <div className="col-auto d-flex align-items-center">
        <a href='/Students/Import'>
        <FiDownload style={{ fontSize: "1.5rem", color: "#3474EB" }} />

        </a>
        </div>

        {/* New Student Button */}
        <div className="col-auto mt-2" style={{ position: "sticky" }}>
          <a
            href="/StudentRegister"
            style={{ textDecoration: "none", color: "#505050" }}
          >
            <Button className="addbuttons" style={{ position: "sticky" }}>
              <span style={{ fontSize: "auto" }}>
                <FiPlus /> New Student
              </span>
            </Button>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        {students.length > 0 ? (
          <Table responsive>
            <thead style={{ color: "#505050" }}>
              <tr>
                <th>EMIS ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Father's Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Phone No.</th>
                <th>Aadhar No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.emisId}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.name}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.class}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.section}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.fatherName}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.gender}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {new Date(student.dob).toLocaleDateString()}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.phoneNumber}
                  </td>
                  <td onClick={() => handleStudentClick(student)}>
                    {student.aadharNumber}
                  </td>
                  <td>
                    <a
                      href={`/StudentRegisterupdate/${student._id}`}
                      style={{ textDecoration: "none", color: "#505050" }}
                    >
                      <LuPenLine
                        style={{ fontSize: "1.5rem", color: "#3474EB" }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No students available.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Students;
