import { useEffect, useRef, useState } from "react";

/**
 * Collapse toggle (burger menu) on mouseClick.
 * Source: CI Walkthrough Videos
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpended] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpended(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpended, ref };
};

export default useClickOutsideToggle;
