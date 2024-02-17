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

  const { globalSessionId } = globalSessionDetails;

  const globalSessionList = globalSessionDetails?.globalSessionList;

  const handleMenuClick = ({ key }) => {
    globalSessionDispatch(setGlobalSessionDetails(+key));
  };

  useEffect(() => {
    selectedModule?.key && getGlobalSessionList(selectedModule?.key);
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
      <Button shape="round" size="middle">
        <Typography.Text>
          {intl.formatMessage({ id: "label.sessionPrefix" })}
        </Typography.Text>{" "}
        &nbsp;
        <Typography.Text strong>
          {
            globalSessionList?.find((item) => +item.id === +globalSessionId)
              ?.name
          }
        </Typography.Text>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default Sessions;
