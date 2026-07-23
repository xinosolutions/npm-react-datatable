import React from "react";
import styles from "../../CSS/DataTable.module.css";
import { getRowId } from "../../utils/getRowId";

const Radio = ({
  row,
  selected,
  setSelected,
  selectBy = "_id",
  name = "table_row_selection",
}) => {
  const rowId = getRowId(row, selectBy);

  const handleRadioChange = () => {
    setSelected([row]);
  };

  const isChecked = selected.some((s) => getRowId(s, selectBy) === rowId);

  return (
    <label className={styles.customRadio}>
      <input
        type="radio"
        name={name}
        checked={isChecked}
        onChange={handleRadioChange}
        aria-label={`Select row ${rowId || "item"}`}
      />
      <span className={styles.radioLabel}></span>
    </label>
  );
};

export default Radio;
