import React, { useContext, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Button, Dropdown, Menu, Typography } from "antd";
import { capitalize } from "lodash";

import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import useGlobalSessionListApi from "../../services/api-services/GlobalSessionList/useGlobalSessionListApi";
import styles from "./sessions.module.scss";

function Sessions() {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const { getGlobalSessionList } = useGlobalSessionListApi();
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [globalSessionDetails, globalSessionDispatch] =
    useContext(GlobalSessionContext);

  const { globalSessionId, globalSessionList } = globalSessionDetails;

  const handleMenuClick = ({ key }) => {
    globalSessionDispatch(setGlobalSessionDetails(+key));
  };

  useEffect(() => {
    if (globalSessionList?.length) {
      globalSessionDispatch(setGlobalSessionDetails(+globalSessionList[0].id));
    }
  }, [selectedModule?.key]);

  const menu = (
    <Menu
      selectedKeys={[`${+globalSessionId}`]}
      onClick={handleMenuClick}
      className={styles.menu}
    >
      {globalSessionList?.length ? (
        globalSessionList?.map((item) => (
          <Menu.Item
            key={+item.id}
            className={`${styles.customDropdownItem} ${
              +globalSessionId === +item.id
                ? styles.menuItemFontWeightBold
                : styles.menuItemFontWeightNormal
            }`}
          >
            <span className={styles.menuItemText}>{capitalize(item.name)}</span>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item className={styles.emptySessionContainer}>
          <span className={styles.menuItemText}>
            {intl.formatMessage({ id: "label.noSessionsAvailable" })}
          </span>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown
      trigger={["click"]}
      overlay={menu}
      className={styles.sessionContainer}
      overlayClassName={styles.customDropdownMenu}
    >
      <Button
        shape="round"
        size="middle"
        className={styles.sessionDropdownContainer}
      >
        <div className={styles.sessionTextContainer}>
          <Typography.Text className={styles.sessionText}>
            {intl.formatMessage({ id: "label.sessionPrefix" })}
          </Typography.Text>
          &nbsp;
          <Typography.Text className={styles.valueText}>
            {capitalize(
              globalSessionList?.find((item) => +item.id === +globalSessionId)
                ?.name ||
                intl.formatMessage({ id: "label.noSessionsAvailable" })
            )}
          </Typography.Text>
        </div>
        <div>
          <DownOutlined />
        </div>
      </Button>
    </Dropdown>
  );
}

export default Sessions;
