import React from "react";
import styles from "../../CSS/DataTable.module.css";

const Radio = ({ col, row, selected, setSelected, selectBy = "_id", handleChange }) => {
  const handleRadioChange = () => {
    // If custom handleChange is provided in column definition, use it
    if (handleChange && typeof handleChange === "function") {
      handleChange({
        type: "radio",
        column: col,
        row: row,
        selected: selected,
        setSelected: setSelected,
        selectBy: selectBy,
        isChecked: true
      });
      return;
    }

    // Default behavior: select only this row (single selection)
    setSelected([row]);
  };

  const isChecked = selected.some((s) => s[selectBy] === row[selectBy]);

  return (
    <label className={styles.customRadio}>
      <input 
        type="radio" 
        name="table_row_selection"
        checked={isChecked}
        onChange={handleRadioChange}
        aria-label={`Select row ${row[selectBy] || 'item'}`}
      />
      <span className={styles.radioLabel}></span>
    </label>
  );
};

export default Radio;
