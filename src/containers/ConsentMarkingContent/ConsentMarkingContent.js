import React from "react";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import CustomGrid from "../../components/CustomGrid";

import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = () => {
  return <TwoRow topSection={<CustomGrid></CustomGrid>} />;
};

export default ConsentMarkingContent;
