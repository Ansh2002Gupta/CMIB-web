import React, { useContext }  from "react";
import { ThemeContext } from 'core/providers/theme'

import Styles from "./Logo.module.scss";

const LogoComponent = () => {
  const { getImage } = useContext(ThemeContext);
  return (
    <img className={Styles.image} src={getImage('logo')} alt="logo" />
  );
};

export default LogoComponent;
