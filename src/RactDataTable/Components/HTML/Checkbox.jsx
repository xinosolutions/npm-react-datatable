import React from "react";
import styles from "../../CSS/DataTable.module.css";

const Checkbox = ({ row, selected, setSelected, selectBy = "_id" }) => {
  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, row]);
    } else {
      setSelected((prev) => prev.filter((r) => r[selectBy] !== row[selectBy]));
    }
  };

  const isChecked = selected.some((s) => s[selectBy] === row[selectBy]);

  return (
    <label className={styles.customCheckbox}>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckbox}
        aria-label={`Select row ${row[selectBy] || 'item'}`}
      />
      <span className={styles.checkboxLabel}></span>
    </label>
  );
};

export default Checkbox;
