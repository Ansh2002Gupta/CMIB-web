import React from "react";
// will be replaced by view component injected through route
import { Outlet } from "react-router-dom";

import HeaderContentWithFooterLayout from "../layouts/HeaderContentWithFooterLayout/HeaderContentWithFooterLayout";

// import MenuContainer from "../containers/Menu/Menu";
// import HeaderContainer from "../containers/Header";

function HeaderContentWithFooter() {
  return (
    <HeaderContentWithFooterLayout
      // menu={<MenuContainer />}
      // header={<HeaderContainer />}
      content={<Outlet />} // view component
    />
  );
}

export default HeaderContentWithFooter;
