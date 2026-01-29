import React from "react";
import styles from "../CSS/DataTable.module.css";

const Header = ({ columns, rows, selected, setSelected, gridColumns }) => {
  const handleCheckboxAll = () => {
    if (rows.length > 0 && selected.length === rows.length) {
      setSelected([]);
    } else {
      setSelected(rows);
    }
  };

  return (
    <div 
      className={`${styles.tableRow} ${styles.theadSection}`}
      style={{ 
        gridTemplateColumns: `repeat(${gridColumns}, auto)` 
      }}
    >
      {columns.map((col) => {
        let tHLabel = col.label;
        if (col.type === "radio") {
          tHLabel = <input type="radio" name="select_all" />;
        }
        if (col.type === "checkbox") {
          const isChecked =
            rows.length > 0 && selected.length === rows.length;
          console.log(isChecked, "isCheckedisCheckedisChecked");
          tHLabel = (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxAll}
            />
          );
        }

        return (
          <div key={col.key} className={`${styles.tableHead} ${styles.tableCell}`}>
            <span>{tHLabel}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
