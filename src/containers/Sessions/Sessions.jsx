import React, { useContext, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Button, Dropdown, Menu, Typography } from "antd";

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
      {globalSessionList?.map((item) => (
        <Menu.Item
          key={+item.id}
          className={`${styles.customDropdownItem} ${
            +globalSessionId === +item.id
              ? styles.menuItemFontWeightBold
              : styles.menuItemFontWeightNormal
          }`}
        >
          <span className={styles.menuItemText}>{item.name}</span>
        </Menu.Item>
      ))}
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
            {globalSessionList?.find((item) => +item.id === +globalSessionId)
              ?.name || intl.formatMessage({ id: "label.noSession" })}
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
