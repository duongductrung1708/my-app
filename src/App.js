import { useState, useEffect } from "react";
import React from "react";

import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: "1708",
      username: "John Doe",
      class: "SE1732",
      email: "johndoe@gmail.com",
      phone: "0334230359",
      status: "Male",
    },
    {
      id: "0608",
      username: "David Smith",
      class: "SE1732",
      email: "davidsmith@gmail.com",
      phone: "0283728465",     
      status: "Male",
    },
    {
      id: "2404",
      username: "Jane Doe",
      class: "SE1732",
      email: "janedoe@gmail.com",
      phone: "0562538664",      
      status: "Female",
    },
  ]);

    const localStorageKey = "tableData";

  const saveTableDataToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  const loadTableDataFromLocalStorage = () => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      setRows(JSON.parse(storedData));
    }
  };

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

  useEffect(() => {
    loadTableDataFromLocalStorage();
  }, []);

  const handleDeleteRow = (targetIndex) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + targetIndex;

    const updatedRows = [...rows];

    updatedRows.splice(actualIndex, 1);

    setRows(updatedRows);
    saveTableDataToLocalStorage(updatedRows);
  };

  const handleEditRow = (targetIndex) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + targetIndex;

    setRowToEdit(actualIndex);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      setRows([...rows, newRow]);
    } else {
      const editedRowIndex = (currentPage - 1) * itemsPerPage + rowToEdit;

      const updatedRows = [...rows];
      updatedRows[editedRowIndex] = newRow;

      setRows(updatedRows);
    }

    saveTableDataToLocalStorage(rows);
  };

  return (
    <div className="App">
      <h1>Students List</h1>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      <Table
        rows={itemsToDisplay.filter((row) =>
          row.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          defaultValue={rowToEdit !== null && itemsToDisplay[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;