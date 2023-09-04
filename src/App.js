import { useState } from "react";
import React from "react";

import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "1708",
      description: "John Doe",
      class: "SE1732",
      email: "johndoe@gmail.com",
      phone: "0334230359",
      status: "Male",
    },
    {
      page: "0608",
      description: "David Smith",
      class: "SE1732",
      email: "davidsmith@gmail.com",
      phone: "0283728465",     
      status: "Male",
    },
    {
      page: "2404",
      description: "Jane Doe",
      class: "SE1732",
      email: "janedoe@gmail.com",
      phone: "0562538664",      
      status: "Female",
    },
  ]);
  
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = rows.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
    <h1>Students List</h1>
      <div className="search-bar">
      <input className="search-input"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button">Search</button>
      </div>

<Table
  rows={itemsToDisplay.filter((row) =>
    row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.status.toLowerCase().includes(searchQuery.toLowerCase())
  )}
  deleteRow={handleDeleteRow}
  editRow={handleEditRow}
/>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>      
      <button onClick={() => setModalOpen(true)} className="btn">
        Create Student
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;