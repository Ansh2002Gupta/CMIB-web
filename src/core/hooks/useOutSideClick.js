import { useEffect, useRef } from "react";

const useOutSideClick = ({ onOutSideClick, elementNotToBeConsidered }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    const outSideClick = (event) => {
      if (wrapperRef?.current && !wrapperRef.current.contains(event.target)) {
        if (elementNotToBeConsidered?.current) {
          !elementNotToBeConsidered.current.contains(event.target) &&
            onOutSideClick();
        } else {
          onOutSideClick();
        }
      }
    };
    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, [wrapperRef, onOutSideClick]);

  return { wrapperRef };
};

export default useOutSideClick;
