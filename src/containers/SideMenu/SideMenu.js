import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import {
  ArrowRightOutlined,
  GlobalOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import ModuleList from "./ModuleList";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { DASHBOARD } from "../../routes/routeNames";
import { setModuleDetails } from "../../globalContext/userProfile/userProfileActions";
import { filterMenuData } from "../../constant/utils";
import modules from "./sideMenuItems";
import { ReactComponent as CaIndiaLogo } from "../../themes/base/assets/icons/ca-india-logo.svg";
import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo }) => {
  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const intl = useIntl();
  const userData = userProfileDetails?.userDetails;
  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [selectedKey, setSelectedKey] = useState();
  const location = useLocation();
  const accessibleModules = filterMenuData(modules, userData?.menu_items);

  function updateLabelsForIntl(menuItems) {
    return menuItems?.map((item) => {
      const updatedLabel = intl.formatMessage({
        id: `label.menu.${item.label}`,
      });
      return {
        ...item,
        label: updatedLabel,
      };
    });
  }

  // TODO: need to create context for it if needed
  const handleOnSelectItem = (item) => {
    setSelectedModule(item);
    setOpenModuleSelector(false);
    userProfileDispatch(setModuleDetails(item));
  };
  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
    setSelectedKey([key]);
  };

  useEffect(() => {
    setSelectedModule(accessibleModules[0]);
  }, []);

  const handleOnClickLogo = () => {
    navigate(DASHBOARD);
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const select = `/${pathSegments[1]}`;
    setSelectedKey([select]);
  }, [userProfileDetails]);

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
              <TwoRow
                topSection={
                  !responsive?.isMd && (
                    <Typography className={styles.moduleText}>
                      {intl.formatMessage({ id: "label.module" })}
                    </Typography>
                  )
                }
                bottomSection={
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
              defaultSelectedKeys={selectedKey}
              mode="inline"
              items={updateLabelsForIntl(selectedModule.children)}
              expandIcon={<></>}
              openKeys={accessibleModules?.map((module) => module?.key)}
              onSelect={handleOnClickMenuItem}
              selectedKeys={selectedKey}
            />
          )}
        </div>
        <div>
          <Space className={styles.imageItemLogo}>
            <CaIndiaLogo />
          </Space>
          <Space
            className={styles.sideMenuBottomSection}
            align="center"
            direction="horizontal"
          >
            <Button
              className={styles.visitContainer}
              styles={{
                icon: {
                  paddingRight: "var(--sizeXXSmall, 8px)",
                },
              }}
              size="large"
              type="text"
              block
              icon={<GlobalOutlined className={styles.globeIcon} />}
            >
              <Typography.Text className={styles.visitText}>
                {intl.formatMessage({ id: "label.visitWebsite" })}
              </Typography.Text>
            </Button>
            <ArrowRightOutlined />
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SideMenu;
