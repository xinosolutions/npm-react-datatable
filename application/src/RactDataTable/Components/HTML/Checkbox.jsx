import React from "react";

const Checkbox = ({ col, row, selected, setSelected }) => {
  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, row]);
    } else {
      setSelected((prev) => prev.filter((r) => r[col.key] !== row[col.key]));
    }
  };

  const isChecked = selected.some((s) => s[col.key] === row[col.key]);

  return (
    <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
  );
};

export default Checkbox;
