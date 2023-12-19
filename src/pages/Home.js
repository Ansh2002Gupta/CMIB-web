import React from "react";
// will be replaced by view component injected through route
import { Outlet } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import MenuContainer from "../containers/Menu/Menu";
import HeaderContainer from "../containers/Header";

function Home({ noOuterPadding }) {
  return (
    <MainLayout
      menu={<MenuContainer />}
      header={<HeaderContainer />}
      content={<Outlet />} // view component
      {...{ noOuterPadding }}
    />
  );
}

export default Home;
