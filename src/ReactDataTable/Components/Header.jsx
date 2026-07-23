import React from "react";
import styles from "../CSS/DataTable.module.css";
import { getRowId } from "../utils/getRowId";

const Header = ({
  columns,
  rows,
  selected,
  setSelected,
  selectBy = "_id",
  hasCheckboxSelection = false,
  selectionMode = "multiple",
}) => {
  const handleCheckboxAll = () => {
    const currentPageRowIds = rows.map((row) => getRowId(row, selectBy));

    const allCurrentPageSelected =
      rows.length > 0 &&
      rows.every((row) => {
        const rowId = getRowId(row, selectBy);
        return selected.some((sel) => getRowId(sel, selectBy) === rowId);
      });

    if (allCurrentPageSelected) {
      setSelected((prevSelected) =>
        prevSelected.filter(
          (sel) => !currentPageRowIds.includes(getRowId(sel, selectBy)),
        ),
      );
    } else {
      setSelected((prevSelected) => {
        const newSelections = rows.filter((row) => {
          const rowId = getRowId(row, selectBy);
          return !prevSelected.some(
            (sel) => getRowId(sel, selectBy) === rowId,
          );
        });
        return [...prevSelected, ...newSelections];
      });
    }
  };

  const isAllChecked =
    hasCheckboxSelection &&
    selectionMode === "multiple" &&
    rows.length > 0 &&
    rows.every((row) => {
      const rowId = getRowId(row, selectBy);
      return selected.some((sel) => getRowId(sel, selectBy) === rowId);
    });

  return (
    <div className={`${styles.tableRow} ${styles.theadSection}`}>
      {hasCheckboxSelection && (
        <div
          className={`${styles.tableHead} ${styles.tableCell} ${styles.stickyCol} ${styles.selectionCell}`}
        >
          {selectionMode === "multiple" ? (
            <label className={styles.customCheckbox}>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleCheckboxAll}
                aria-label="Select all rows on current page"
              />
              <span className={styles.checkboxLabel}></span>
            </label>
          ) : (
            <span className={styles.selectionHeaderSpacer} aria-hidden="true" />
          )}
        </div>
      )}
      {columns.map((col, index) => {
        const stickyFirst =
          !hasCheckboxSelection && index === 0 ? styles.stickyColFirst : "";
        return (
          <div
            key={col.key || `col-${index}`}
            className={`${styles.tableHead} ${styles.tableCell} ${stickyFirst}`}
          >
            <span className={styles.cellText}>{col.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
