import React from "react";

/**
 * Single long sort arrow (up = asc, down = desc / idle).
 * @param {"asc"|"desc"|null|undefined} direction — active direction, or idle
 */
const SortArrowsIcon = ({
  className,
  direction,
  width = "14",
  height = "14",
  ...props
}) => {
  const isAsc = direction === "asc";

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {isAsc ? (
        <>
          <line x1="7" y1="12" x2="7" y2="2" />
          <polyline points="3 6 7 2 11 6" />
        </>
      ) : (
        <>
          <line x1="7" y1="2" x2="7" y2="12" />
          <polyline points="3 8 7 12 11 8" />
        </>
      )}
    </svg>
  );
};

export default SortArrowsIcon;
