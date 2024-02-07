import React from "react";
import { Outlet } from "react-router-dom";

import HeaderContentWithFooterLayout from "../layouts/HeaderContentWithFooterLayout/HeaderContentWithFooterLayout";
import PublicHeader from "../containers/PublicHeader/PublicHeader";
import PublicFooter from "../containers/PublicFooter/PublicFooter";

function HeaderContentWithFooter() {
  return (
    <HeaderContentWithFooterLayout
      header={<PublicHeader />}
      footer={<PublicFooter />}
      content={<Outlet />} // view component
    />
  );
}

export default HeaderContentWithFooter;
