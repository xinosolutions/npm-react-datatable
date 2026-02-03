import React from "react";
import styles from "../CSS/DataTable.module.css";

const Header = ({ columns, rows, selected, setSelected, gridColumns }) => {
  const handleCheckboxAll = () => {
    // Get IDs of current page rows
    const currentPageRowIds = rows.map((row) => row.id || JSON.stringify(row));
    
    // Check if all current page rows are selected
    const allCurrentPageSelected = rows.length > 0 && 
      rows.every((row) => {
        const rowId = row.id || JSON.stringify(row);
        return selected.some((sel) => {
          const selId = sel.id || JSON.stringify(sel);
          return selId === rowId;
        });
      });

    if (allCurrentPageSelected) {
      // Deselect all current page rows
      setSelected((prevSelected) =>
        prevSelected.filter((sel) => {
          const selId = sel.id || JSON.stringify(sel);
          return !currentPageRowIds.includes(selId);
        })
      );
    } else {
      // Select all current page rows (merge with existing selections)
      setSelected((prevSelected) => {
        const newSelections = rows.filter((row) => {
          const rowId = row.id || JSON.stringify(row);
          return !prevSelected.some((sel) => {
            const selId = sel.id || JSON.stringify(sel);
            return selId === rowId;
          });
        });
        return [...prevSelected, ...newSelections];
      });
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
          // Check if all current page rows are selected
          const isChecked =
            rows.length > 0 &&
            rows.every((row) => {
              const rowId = row.id || JSON.stringify(row);
              return selected.some((sel) => {
                const selId = sel.id || JSON.stringify(sel);
                return selId === rowId;
              });
            });
          tHLabel = (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxAll}
              aria-label="Select all rows on current page"
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
