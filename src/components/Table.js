import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="expand">Student's Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.id}</td>
                <td className="expand">{row.username}</td>
                <td>{row.class}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>   
    </div>
  );
};