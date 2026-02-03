import React from "react";
import styles from "../CSS/DataTable.module.css";

const Header = ({
  columns,
  rows,
  selected,
  setSelected,
  selectBy = "_id",
  hasCheckboxSelection = false
}) => {
  const handleCheckboxAll = () => {
    const currentPageRowIds = rows.map((row) => row[selectBy] || JSON.stringify(row));

    const allCurrentPageSelected = rows.length > 0 &&
      rows.every((row) => {
        const rowId = row[selectBy] || JSON.stringify(row);
        return selected.some((sel) => {
          const selId = sel[selectBy] || JSON.stringify(sel);
          return selId === rowId;
        });
      });

    if (allCurrentPageSelected) {
      setSelected((prevSelected) =>
        prevSelected.filter((sel) => {
          const selId = sel[selectBy] || JSON.stringify(sel);
          return !currentPageRowIds.includes(selId);
        })
      );
    } else {
      setSelected((prevSelected) => {
        const newSelections = rows.filter((row) => {
          const rowId = row[selectBy] || JSON.stringify(row);
          return !prevSelected.some((sel) => {
            const selId = sel[selectBy] || JSON.stringify(sel);
            return selId === rowId;
          });
        });
        return [...prevSelected, ...newSelections];
      });
    }
  };

  const isAllChecked = hasCheckboxSelection && rows.length > 0 &&
    rows.every((row) => {
      const rowId = row[selectBy] || JSON.stringify(row);
      return selected.some((sel) => {
        const selId = sel[selectBy] || JSON.stringify(sel);
        return selId === rowId;
      });
    });

  return (
    <div
      className={`${styles.tableRow} ${styles.theadSection}`}
    >
      {hasCheckboxSelection && (
        <div className={`${styles.tableHead} ${styles.tableCell}`}>
          <label className={styles.customCheckbox}>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleCheckboxAll}
              aria-label="Select all rows on current page"
            />
            <span className={styles.checkboxLabel}></span>
          </label>
        </div>
      )}
      {columns.map((col, index) => {
        return (
          <div
            key={col.key || `col-${index}`}
            className={`${styles.tableHead} ${styles.tableCell}`}
          >
            <span>{col.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
