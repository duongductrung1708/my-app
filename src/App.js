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
      description: "Duong Duc Trung",
      class: "SE1732",
      email: "trungyna1708@gmail.com",
      phone: "0334230359",
      status: "Online",
    },
    {
      page: "0608",
      description: "Duong Hoai Nam",
      class: "SE1732",
      email: "namyna0608@gmail.com",
      phone: "0283728465",     
      status: "Offline",
    },
    {
      page: "2404",
      description: "Nguyen Thi Phuong Nghi",
      class: "SE1732",
      email: "nghiyna2404@gmail.com",
      phone: "0562538664",      
      status: "Busy",
    },
  ]);
  
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="search-bar">
      <input className="search-input"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button">Search</button>
      </div>

      <Table rows={rows.filter((row) => row.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      row.page.toLowerCase().includes(searchQuery.toLowerCase()) || 
      row.class.toLowerCase().includes(searchQuery.toLowerCase()) || 
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      row.phone.toLowerCase().includes(searchQuery.toLowerCase()) || 
      row.status.toLowerCase().includes(searchQuery.toLowerCase()))} 

      deleteRow={handleDeleteRow} editRow={handleEditRow} />
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