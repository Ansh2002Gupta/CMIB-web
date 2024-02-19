import { useEffect } from "react";

const useHandleInfiniteScroll = (handleLoadMore, listRef) => {
  const handleInfiniteScroll = () => {
    if (!listRef.current) return;

    const { scrollTop } = listRef.current;
    const threshold = 0.1;
    if (scrollTop <= threshold) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    const element = listRef.current;

    if (element) {
      element.addEventListener("scroll", handleInfiniteScroll, {
        passive: true,
      });
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleInfiniteScroll);
      }
    };
  }, [handleLoadMore, listRef]);
};

export default useHandleInfiniteScroll;
