import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { Base, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { filterMenuData } from "../../constant/utils";
import { DASHBOARD } from "../../routes/routeNames";
import modules from "./sideMenuItems";
import { ReactComponent as Globe } from "../../themes/base/assets/icons/globe.svg";
import { ReactComponent as CaIndiaLogo } from "../../themes/base/assets/icons/ca-india-logo.svg";
import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo, setIsModalOpen, setOpenSideMenu }) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const intl = useIntl();
  const userData = userProfileDetails?.userDetails;
  const [selectedKey, setSelectedKey] = useState();
  const location = useLocation();
  const accessibleModules = filterMenuData(modules, userData?.menu_items);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  function updateLabelsForIntl(menuItems, selectedKey) {
    return menuItems?.map((item) => {
      const updatedLabel = intl.formatMessage({
        id: `label.menu.${item.label}`,
      });
      let icon = item.icon;
      if (item?.selectedicon && item.key === selectedKey) {
        icon = item?.selectedicon;
      }
      return {
        ...item,
        label: updatedLabel,
        icon,
      };
    });
  }

  const handleOnClickMenuItem = ({ key }) => {
    navigate(`/${selectedModule.key}/${key}`);
    setSelectedKey(key);
  };

  const handleOnClickLogo = () => {
    navigate(`/${selectedModule.key}/${DASHBOARD}`);
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const select = pathSegments?.[2] ? `${pathSegments[2]}/` : "";
    setSelectedKey(select);
  }, [userProfileDetails, navigate]);

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
          <Base style={{ overflow: "visible" }}>
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
                    <div className={styles.moduleSelectorHeading}>
                      {selectedModule?.label}
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
                      onClick={() => {
                        setIsModalOpen(true);
                        setOpenSideMenu(false);
                      }}
                    >
                      {intl.formatMessage({ id: "label.change" })}
                    </Button>
                  }
                />
              }
            />
          </Base>

          {selectedModule && (
            <div>
              <Menu
                className={styles.sideMenuOptionsContainer}
                theme="dark"
                defaultSelectedKeys={selectedKey}
                mode="inline"
                items={updateLabelsForIntl(
                  selectedModule.children,
                  selectedKey
                )}
                expandIcon={<></>}
                openKeys={accessibleModules?.map((module) => module?.key)}
                onClick={handleOnClickMenuItem}
                selectedKeys={selectedKey}
              />
            </div>
          )}
        </div>
        <div>
          <Space className={styles.imageItemLogo}>
            <CaIndiaLogo className={styles.width40} />
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
              icon={<Globe className={styles.globeIcon} />}
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