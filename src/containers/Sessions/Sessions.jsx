import React, { useContext, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Button, Dropdown, Menu, Typography } from "antd";

import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import useFetch from "../../core/hooks/useFetch";
import { CORE_ROUTE, GLOBAL_SESSION_LIST } from "../../constant/apiEndpoints";
import styles from "./sessions.module.scss";

function Sessions() {
  const intl = useIntl();
  const [, globalSessionDispatch] = useContext(GlobalSessionContext);
  const { data: globalSessionList } = useFetch({ url: CORE_ROUTE + GLOBAL_SESSION_LIST });

  const [selectedKey, setSelectedKey] = useState(
    globalSessionList?.length ? globalSessionList[0].id : null
  );

  const handleMenuClick = ({ key }) => {
    setSelectedKey(+key);
    globalSessionDispatch(setGlobalSessionDetails(+key));
  };

  useEffect(() => {
    if (globalSessionList?.length) {
      setSelectedKey(globalSessionList[0].id);
      globalSessionDispatch(setGlobalSessionDetails(globalSessionList[0].id));
    }
  }, [globalSessionList]);

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
