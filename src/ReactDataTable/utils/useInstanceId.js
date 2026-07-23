import { useRef } from "react";

let globalCounter = 0;

/**
 * Stable unique id per component instance (works on React 16.8+).
 */
const useInstanceId = (prefix = "dt") => {
  const ref = useRef(null);
  if (ref.current === null) {
    globalCounter += 1;
    ref.current = `${prefix}-${globalCounter}`;
  }
  return ref.current;
};

export default useInstanceId;
