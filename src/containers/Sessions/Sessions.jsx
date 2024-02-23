import React, { useContext, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { capitalize } from "lodash";
import { useIntl } from "react-intl";
import { Button, Dropdown, Menu, Tooltip, Typography } from "antd";

import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import { setItem } from "../../services/encrypted-storage-service";
import { MODULE_KEYS, SESSION_KEY } from "../../constant/constant";
import styles from "./sessions.module.scss";

function Sessions() {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [globalSessionDetails, globalSessionDispatch] =
    useContext(GlobalSessionContext);

  const { globalSessionId, globalSessionList } = globalSessionDetails;

  const handleMenuClick = ({ key }) => {
    setItem(SESSION_KEY, key?.toString());
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
            <Tooltip title={item.name.length > 43 ? item.name : null}>
              <span className={styles.menuItemText}>
                {capitalize(item.name)}
              </span>
            </Tooltip>
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
    <>
      {selectedModule?.key !== MODULE_KEYS.CA_JOBS_KEY &&
        selectedModule?.key !== MODULE_KEYS.CONTROL_KEY && (
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
                    globalSessionList?.find(
                      (item) => +item.id === +globalSessionId
                    )?.name ||
                      intl.formatMessage({ id: "label.noSessionsAvailable" })
                  )}
                </Typography.Text>
              </div>
              <div>
                <DownOutlined />
              </div>
            </Button>
          </Dropdown>
        )}
    </>
  );
}

export default Sessions;
