import { useEffect, useState } from "react";

const useHorizontalScroll = ({ ref }) => {
  const [scrollX, setScrollX] = useState(0);
  const [isScrollToEnd, setIsScrollToEnd] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (ref.current) {
      const hasOverflow = ref.current.scrollWidth > ref.current.clientWidth;
      setIsOverflowing(hasOverflow);
    }
  };

  const onHorizontalScroll = () => {
    if (ref.current) {
      setScrollX(ref.current.scrollLeft);
      setIsScrollToEnd(
        Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
          ref.current.clientWidth
      );
    }
  };

  const slide = (shift) => {
    if (ref.current) {
      ref.current.scrollLeft += shift;
      onHorizontalScroll();
    }
  };

 useEffect(() => {
   return () => {
     setIsScrollToEnd(false);
     setScrollX(0);
   };
 }, []);

  return {
    isScrollToEnd,
    onHorizontalScroll,
    scrollX,
    slide,
    isOverflowing,
    checkOverflow,
  };
};

export default useHorizontalScroll;
