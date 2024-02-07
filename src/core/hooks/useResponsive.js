import { useState, useLayoutEffect } from "react";
import breakpoints from '../themes/mixins/responsive.scss';

function useResponsive() {
  const [responsiveDetails, setResponsiveDetails] = useState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight })
  useLayoutEffect(() => {
    function onResize(event = {}) {
      setResponsiveDetails(() => ({ innerWidth: window.innerWidth, innerHeight: window?.innerHeight }))
    }
    window.addEventListener('resize', onResize, true);
    onResize()
    return window.removeEventListener('resize', onResize);
  }, [])
  
  const isXxl = responsiveDetails?.innerWidth > parseInt(breakpoints['xl-max']);
  const isXl = responsiveDetails?.innerWidth > parseInt(breakpoints['lg-max']);
  const isLg = responsiveDetails?.innerWidth > parseInt(breakpoints['md-max']);
  const isMd = responsiveDetails?.innerWidth > parseInt(breakpoints['sm-max']);
  const isSm = responsiveDetails?.innerWidth > parseInt(breakpoints['xs-max']);
  const isXs = true;
  return {
    isXxl,
    isXl,
    isLg,
    isMd,
    isSm,
    isXs
  }
}

export default useResponsive;
