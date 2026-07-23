/**
 * Stable row identity used by selection (checkbox / radio / select-all).
 */
export const getRowId = (row, selectBy = "_id") => {
  if (row == null) return "";
  if (selectBy != null && row[selectBy] !== undefined && row[selectBy] !== null) {
    return String(row[selectBy]);
  }
  try {
    return JSON.stringify(row);
  } catch {
    return String(row);
  }
};

export const getRowKey = (row, selectBy, index) => {
  if (row == null) return `row-${index}`;
  if (selectBy != null && row[selectBy] != null) return String(row[selectBy]);
  if (row.id != null) return String(row.id);
  if (row._id != null) return String(row._id);
  return `row-${index}`;
};
