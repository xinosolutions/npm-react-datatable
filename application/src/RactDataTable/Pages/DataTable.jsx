import React, { useState } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import Radio from "../Components/HTML/Radio";

const DataTable = ({ rows, columns, setSelected, selected }) => {
  const [search, setSearch] = useState("");

  const hanldeData = () => {
    if (!search) return rows;
    return rows.filter((row) =>
      columns.some((col) => {
        if (row[col.key]) {
          return row[col.key].toLowerCase().includes(search);
        }
        return false;
      }),
    );
  };

  const filteredRows = hanldeData();

  return (
    <div className={styles.userDetail}>
      <div className={styles.userDetailHead}>
        <label htmlFor="searchInput">Search Table Data</label>
        <div className={styles.searchContainer}>
          <input
            id="searchInput"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <img
            src="https://cdn.dribbble.com/userupload/20993779/file/original-955a1fae5634d26aa5126ce11a53c47d.gif"
            width={36}
            height={36}
            alt=""
          />
        </div>
      </div>
      <div className={styles.userDetailTable}>
        <table className={styles.table} border={1}>
          <thead className={styles.theadSection}>
            <Header {...{ columns, rows, selected, setSelected }} />
          </thead>
          <tbody className={styles.tbodySection}>
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "50px",
                  }}
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => {
                    let tData = <span>{row[col.key]}</span>;
                    if (col.type === "radio") {
                      tData = <Radio {...{ row, col, selected }} />;
                    } else if (col.type === "checkbox") {
                      tData = (
                        <Checkbox {...{ col, row, selected, setSelected }} />
                      );
                    } else if (col.type === "number") {
                      tData = rowIndex + 1;
                    } else if (col.type === "html") {
                      tData = (
                        <div
                          dangerouslySetInnerHTML={{ __html: row[col.key] }}
                        />
                      );
                    }

                    return <td key={col.key}>{tData}</td>;
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
