import React from "react";

import CustomButton from "../../components/CustomButton/CustomButton";
import ContentHeader from "../ContentHeader/ContentHeader";
import StatusChip from "../../components/StatusChip";
import { ReactComponent as CheckIconWhite } from "../../themes/base/assets/images/check-white.svg";
import styles from "./QueryDetailsHeader.module.scss";

const QueryDetailsHeader = () => {
  return (
    <ContentHeader
      headerText="Q623738137"
      headerComponent={<StatusChip isPending statusText={"Pending"} />}
      rightSection={
        <CustomButton IconElement={CheckIconWhite} btnText={"Mark Answered"} />
      }
    />
  );
};

export default QueryDetailsHeader;
