import React, { useState, useEffect } from "react";
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
      class: "SE1733",
      email: "davidsmith@gmail.com",
      phone: "0283728465",
      status: "Male",
    },
    {
      id: "2404",
      username: "Jane Doe",
      class: "SE1734",
      email: "janedoe@gmail.com",
      phone: "0562538664",
      status: "Female",
    },
    {
      id: "1202",
      username: "Jenny Huynh",
      class: "SE1735",
      email: "jennyhuynh@gmail.com",
      phone: "0128726382",
      status: "Female",
    },
    {
      id: "2512",
      username: "Ariana Grande",
      class: "SE1736",
      email: "arianagrande@gmail.com",
      phone: "0338496354",
      status: "Female",
    },
    {
      id: "0507",
      username: "Jack Sparrow",
      class: "SE1735",
      email: "jacksparrow@gmail.com",
      phone: "0985313008",
      status: "Male",
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

  const itemsToDisplay = rows
    .filter((row) =>
      row.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

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
    let updatedRows;

    if (rowToEdit === null) {
      updatedRows = [...rows, newRow];
    } else {
      if (rowToEdit !== null) {
        const editedRowIndex = rowToEdit;
        updatedRows = [...rows];
        updatedRows[editedRowIndex] = newRow;
      } else {
        updatedRows = [...rows];
      }
    }

    setRows(updatedRows);
    saveTableDataToLocalStorage(updatedRows);

    setRowToEdit(null);
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
        rows={itemsToDisplay}
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
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
        />
      )}
    </div>
  );
}

export default App;
