import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import {
  ArrowRightOutlined,
  GlobalOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ModuleList from "./ModuleList";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { DASHBOARD } from "../../routes/routeNames";
import { getAccessibleModules } from "../../constant/utils";
import modules from "./sideMenuItems";
import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo }) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const intl = useIntl();
  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const [userProfileState] = useContext(UserProfileContext);

  // TODO: need to create context for it if needed
  const handleOnSelectItem = (item) => {
    setSelectedModule(item);
    setOpenModuleSelector(false);
  };
  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
  };

  const accessibleModules = getAccessibleModules(
    userProfileState?.userDetails?.role,
    modules
  );

  const handleOnClickLogo = () => {
    navigate(DASHBOARD);
  };

  useEffect(() => {
    setSelectedModule(accessibleModules[0]);
  }, [userProfileState]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "var(--textPrimary, #fff)",
        },
        components: {
          Menu: {
            darkItemSelectedBg: "white",
            darkItemSelectedColor: "black",
          },
          Button: {
            textHoverBg: "var(--sideMenuColor)",
          },
        },
      }}
    >
      <div className={styles.sideMenuContainer}>
        <div className={styles.sideMenuTopSection}>
          <div className={styles.appLogoContainer}>
            <div className={styles.appLogoBox}>
              <div onClick={handleOnClickLogo} className={styles.appLogo}>
                {logo}
              </div>
            </div>
          </div>
          <TwoRow
            style={{ overflow: "visible" }}
            topSection={
              <TwoColumn
                className={styles.moduleSelector}
                leftSection={
                  <div
                    className={
                      openModuleSelector ? "" : styles.moduleSelectorHeading
                    }
                  >
                    {openModuleSelector
                      ? "Choose a module"
                      : selectedModule?.label}
                  </div>
                }
                rightSection={
                  <Button
                    size="small"
                    shape="round"
                    type="text"
                    style={{
                      color: "var(--textPrimary,#fff)",
                      background: "#262d52",
                      fontSize: "var(--fontSizeXSmall,12px)",
                    }}
                    onClick={() => setOpenModuleSelector((prev) => !prev)}
                  >
                    {openModuleSelector ? <UpOutlined /> : "Change"}
                  </Button>
                }
              />
            }
            bottomSection={
              openModuleSelector && (
                <ModuleList
                  modules={accessibleModules}
                  onSelectItem={handleOnSelectItem}
                />
              )
            }
          />

          {!openModuleSelector && selectedModule && (
            <Menu
              className={styles.sideMenuOptionsContainer}
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={selectedModule.children}
              expandIcon={<></>}
              openKeys={accessibleModules.map((module) => module.key)}
              onSelect={handleOnClickMenuItem}
            />
          )}
        </div>
        <Space
          className={styles.sideMenuBottomSection}
          align="center"
          direction="horizontal"
        >
          <Button
            styles={{
              icon: {
                paddingRight: "var(--sizeXXSmall, 8px)",
              },
            }}
            size="large"
            type="text"
            block
            icon={<GlobalOutlined />}
          >
            <Typography.Text className={styles.visitText}>
              {intl.formatMessage({ id: "label.visitWebsite" })}
            </Typography.Text>
          </Button>
          <ArrowRightOutlined />
        </Space>
      </div>
    </ConfigProvider>
  );
};

export default SideMenu;
