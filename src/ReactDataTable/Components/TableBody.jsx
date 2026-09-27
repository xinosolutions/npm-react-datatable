import React, { useState } from "react";
import styles from "../CSS/DataTable.module.css";
import Checkbox from "./HTML/Checkbox";
import Radio from "./HTML/Radio";
import NoDataIcon from "./Icons/NoDataIcon";
import MenuDropdown from "./MenuDropdown";
import { getRowKey } from "../utils/getRowId";

const TableBody = ({
  useCards,
  loading,
  filteredRows,
  paginatedRows,
  visibleColumns,
  startIndex,
  isEmptyFromSearch,
  hasCheckboxSelection,
  selectionMode,
  selected,
  setSelected,
  selectBy,
  radioGroupName,
  handleMenu,
  sanitizeHtml,
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const renderCellContent = (col, row, actualRowIndex) => {
    if (col.type === "action") {
      const menuItems = handleMenu ? handleMenu(row) : [];
      return (
        <MenuDropdown
          menuItems={menuItems}
          row={row}
          rowIndex={actualRowIndex}
        />
      );
    }
    if (col.render && typeof col.render === "function") {
      return col.render(row, actualRowIndex);
    }
    if (col.type === "number") {
      return <span className={styles.cellText}>{actualRowIndex + 1}</span>;
    }
    if (col.type === "html") {
      const raw = row[col.key] || "";
      const html =
        typeof sanitizeHtml === "function" ? sanitizeHtml(raw) : raw;
      return (
        <div
          className={styles.htmlCell}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    if (col.key && row[col.key] !== undefined) {
      return <span className={styles.cellText}>{row[col.key]}</span>;
    }
    return <span className={styles.cellText}></span>;
  };

  const renderSelectionControl = (row) => {
    if (!hasCheckboxSelection) return null;
    if (selectionMode === "single") {
      return (
        <Radio
          row={row}
          selected={selected}
          setSelected={setSelected}
          selectBy={selectBy}
          name={radioGroupName}
        />
      );
    }
    return (
      <Checkbox
        row={row}
        selected={selected}
        setSelected={setSelected}
        selectBy={selectBy}
      />
    );
  };

  const renderEmptyState = (isSearchEmpty) => (
    <div className={useCards ? styles.cardsEmpty : styles.tableRow}>
      <div
        className={styles.noDataCell}
        style={useCards ? undefined : { gridColumn: "1 / -1" }}
      >
        <div className={styles.noDataContent}>
          <NoDataIcon className={styles.noDataIcon} />
          <h3 className={styles.noDataTitle}>
            {isSearchEmpty ? "No Data Found" : "No Data Available"}
          </h3>
          <p className={styles.noDataMessage}>
            {isSearchEmpty
              ? "No records match your search. Try a different query."
              : "There are no records to display. Add some data to get started."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className={useCards ? styles.cardsEmpty : styles.tableRow}>
      <div
        className={styles.noDataCell}
        style={useCards ? undefined : { gridColumn: "1 / -1" }}
      >
        <div className={styles.noDataContent}>
          <p className={styles.loadingMessage}>Loading…</p>
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoadingState();
  if (filteredRows.length === 0) {
    return renderEmptyState(isEmptyFromSearch);
  }

  if (useCards) {
    return paginatedRows.map((row, rowIndex) => {
      const actualRowIndex = startIndex + rowIndex;
      const rowKey = getRowKey(row, selectBy, actualRowIndex);
      const actionCol = visibleColumns.find((c) => c.type === "action");
      const fieldColumns = visibleColumns.filter((c) => c.type !== "action");

      return (
        <div key={rowKey} className={styles.mobileCard}>
          <div className={styles.mobileCardHeader}>
            <div className={styles.mobileCardHeaderLeft}>
              {renderSelectionControl(row)}
              {fieldColumns.some((c) => c.type === "number") && (
                <span className={styles.mobileCardBadge}>
                  #{actualRowIndex + 1}
                </span>
              )}
            </div>
            {actionCol && (
              <MenuDropdown
                menuItems={handleMenu ? handleMenu(row) : []}
                row={row}
                rowIndex={actualRowIndex}
              />
            )}
          </div>
          <div className={styles.mobileCardBody}>
            {fieldColumns
              .filter((c) => c.type !== "number")
              .map((col, colIndex) => (
                <div
                  key={col.key || `card-col-${colIndex}`}
                  className={styles.mobileCardField}
                >
                  <span className={styles.mobileCardLabel}>{col.label}</span>
                  <div className={styles.mobileCardValue}>
                    {renderCellContent(col, row, actualRowIndex)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    });
  }

  return paginatedRows.map((row, rowIndex) => {
    const actualRowIndex = startIndex + rowIndex;
    const rowKey = getRowKey(row, selectBy, actualRowIndex);
    const hoverClass =
      hoveredRowIndex === actualRowIndex ? styles.rowHover : "";

    const onCellEnter = () => setHoveredRowIndex(actualRowIndex);
    const onCellLeave = (event) => {
      const next = event.relatedTarget;
      if (next instanceof Element) {
        const sibling = next.closest("[data-row-index]");
        if (
          sibling &&
          Number(sibling.getAttribute("data-row-index")) === actualRowIndex
        ) {
          return;
        }
      }
      setHoveredRowIndex((current) =>
        current === actualRowIndex ? null : current,
      );
    };

    return (
      <div
        key={rowKey}
        className={styles.tableRow}
        data-row-index={actualRowIndex}
      >
        {hasCheckboxSelection && (
          <div
            className={`${styles.tableCell} ${styles.stickyCol} ${styles.selectionCell} ${
              actualRowIndex % 2 === 1 ? styles.evenRow : ""
            } ${hoverClass}`}
            data-row-index={actualRowIndex}
            onMouseEnter={onCellEnter}
            onMouseLeave={onCellLeave}
          >
            {renderSelectionControl(row)}
          </div>
        )}
        {visibleColumns.map((col, colIndex) => {
          const stickyFirst =
            !hasCheckboxSelection && colIndex === 0
              ? styles.stickyColFirst
              : "";
          return (
            <div
              key={col.key || `col-${colIndex}`}
              className={`${styles.tableCell} ${
                col.type === "action" ? styles.actionCell : ""
              } ${stickyFirst} ${
                actualRowIndex % 2 === 1 ? styles.evenRow : ""
              } ${hoverClass}`}
              data-row-index={actualRowIndex}
              onMouseEnter={onCellEnter}
              onMouseLeave={onCellLeave}
            >
              {renderCellContent(col, row, actualRowIndex)}
            </div>
          );
        })}
      </div>
    );
  });
};

export default TableBody;
