import React from "react";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow";
import useResponsive from "../../core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import SubscriptionsTable from "../../containers/SubscriptionsTable";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./Subscriptions.module.scss";

const Subscriptions = () => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customContainerStyle={styles.customContainerStyle}
          headerText={intl.formatMessage({ id: "label.manageSubscriptions" })}
          rightSection={
            <CustomButton
              customButtonContainerStyle={styles.customButtonContainerStyle}
              btnText={
                responsive.isMd
                  ? intl.formatMessage({
                      id: "label.addSubscription",
                    })
                  : ""
              }
              IconElement={PlusIcon}
              onClick={() => {}}
            />
          }
        />
      }
      bottomSection={<SubscriptionsTable />}
    />
  );
};

export default Subscriptions;
