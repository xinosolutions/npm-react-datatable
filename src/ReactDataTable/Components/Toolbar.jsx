import React from "react";
import styles from "../CSS/DataTable.module.css";
import SearchIcon from "./Icons/SearchIcon";
import ClearIcon from "./Icons/ClearIcon";

const Toolbar = ({
  toolbarLeft,
  showSearch,
  searchPlaceholder,
  searchValue,
  searchInputId,
  isServerSearch,
  showSubmitButton,
  onSearchChange,
  onSearchClear,
  onSearchSubmit,
}) => {
  if (!toolbarLeft && !showSearch) {
    return null;
  }

  const searchField = (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} width="16" height="16" />
      <input
        id={searchInputId}
        type="text"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search table data"
      />
      {searchValue ? (
        <button
          className={styles.clearButton}
          onClick={onSearchClear}
          aria-label="Clear search"
          type="button"
        >
          <ClearIcon />
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={styles.userDetailHead}>
      {toolbarLeft ? (
        <div className={styles.toolbarStart}>
          <div className={styles.toolbarLeft}>{toolbarLeft}</div>
        </div>
      ) : null}
      {showSearch &&
        (isServerSearch ? (
          <form className={styles.searchForm} onSubmit={onSearchSubmit}>
            {searchField}
            {showSubmitButton ? (
              <button type="submit" className={styles.searchSubmitButton}>
                Search
              </button>
            ) : null}
          </form>
        ) : (
          searchField
        ))}
    </div>
  );
};

export default Toolbar;
