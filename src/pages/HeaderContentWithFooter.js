import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "core/providers/theme";
import { Image } from "antd";

import HeaderContentWithFooterLayout from "../layouts/HeaderContentWithFooterLayout/HeaderContentWithFooterLayout";
import PublicHeader from "../containers/PublicHeader";

function HeaderContentWithFooter() {
  const { getImage } = useContext(ThemeContext);

  return (
    <HeaderContentWithFooterLayout
      header={<PublicHeader />}
      content={<Outlet />} // view component
      footer={<Image src={getImage("publicFooter")} preview={false} />}
    />
  );
}

export default HeaderContentWithFooter;
