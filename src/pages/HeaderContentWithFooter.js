import React from "react";
import { Outlet } from "react-router-dom";

import HeaderContentWithFooterLayout from "../layouts/HeaderContentWithFooterLayout/HeaderContentWithFooterLayout";

function HeaderContentWithFooter() {
  return (
    <HeaderContentWithFooterLayout
      content={<Outlet />} // view component
    />
  );
}

export default HeaderContentWithFooter;
