import React from "react";

const Radio = ({ col, row, selected }) => {
  const isChecked = selected.some((s) => s[col.key] === row[col.key]);

  return (
    <>
      <input type="radio" name="select_all" />
    </>
  );
};

export default Radio;
