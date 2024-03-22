import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import ContentHeader from "../../ContentHeader";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ customHeaderStyling, tabComponent }) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const { centreId } = useParams();

  return (
    <div className={`${styles.headerContainer} ${customHeaderStyling}`}>
      <ContentHeader
        headerText={intl.formatMessage({
          id: `label.${"global_configurations"}`,
        })}
        customStyles={[
          styles.headerResponsiveStyle,
          selectedModule?.key ===
          intl.formatMessage({
            id: `label.${"nqca-placements"}`,
          })
            ? styles.marginBottom
            : {},
        ].join(" ")}
      />
      {selectedModule?.key !==
        intl.formatMessage({
          id: `label.${"nqca-placements"}`,
        }) && tabComponent}
    </div>
  );
};

export default ConfigureCentreHeader;
