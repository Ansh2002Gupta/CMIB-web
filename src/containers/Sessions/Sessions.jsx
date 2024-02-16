import React, { useContext, useEffect, useState } from "react";
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
  const {getGlobalSessionList} = useGlobalSessionListApi();
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [globalSessionDetails, globalSessionDispatch] = useContext(GlobalSessionContext);

  const globalSessionList = globalSessionDetails?.globalSessionList;
  const [selectedKey, setSelectedKey] = useState(
    globalSessionDetails?.globalSessionList?.length ? globalSessionList[0].id : null
  );

  const handleMenuClick = ({ key }) => {
    setSelectedKey(+key);
    globalSessionDispatch(setGlobalSessionDetails(+key));
  };

  useEffect(() => {
    getGlobalSessionList(selectedModule?.key);
    if (globalSessionList?.length) {
      setSelectedKey(globalSessionList[0].id);
    }
  }, [selectedModule?.key]);

  const menu = (
    <Menu
      selectedKeys={[`${selectedKey}`]}
      onClick={handleMenuClick}
      className={styles.menu}
    >
      {selectedKey &&
        globalSessionList?.map((item) => (
          <Menu.Item
            key={+item.id}
            className={`${styles.customDropdownItem} ${
              selectedKey === +item.id
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
          {globalSessionList?.find((item) => item.id === selectedKey)?.name}
        </Typography.Text>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default Sessions;
