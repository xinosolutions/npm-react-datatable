import React from "react";
import styles from "../../CSS/DataTable.module.css";
import { getRowId } from "../../utils/getRowId";

const Checkbox = ({ row, selected, setSelected, selectBy = "_id" }) => {
  const rowId = getRowId(row, selectBy);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, row]);
    } else {
      setSelected((prev) =>
        prev.filter((r) => getRowId(r, selectBy) !== rowId),
      );
    }
  };

  const isChecked = selected.some((s) => getRowId(s, selectBy) === rowId);

  return (
    <label className={styles.customCheckbox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
        aria-label={`Select row ${rowId || "item"}`}
      />
      <span className={styles.checkboxLabel}></span>
    </label>
  );
};

export default Checkbox;
