import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import { ArrowRightOutlined, GlobalOutlined } from "@ant-design/icons";

import {  TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import SideMenuButton from "../../components/SideMenuButton";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { CORE_ROUTE, GLOBAL_SESSION_LIST } from "../../constant/apiEndpoints";
import { DASHBOARD } from "../../routes/routeNames";
import { filterMenuData } from "../../constant/utils";
import modules from "./sideMenuItems";
import { ReactComponent as CaIndiaLogo } from "../../themes/base/assets/icons/ca-india-logo.svg";
import SideMenuItems from "../SideMenuItems";
import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo, setIsModalOpen, setOpenSideMenu }) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const intl = useIntl();
  const userData = userProfileDetails?.userDetails;
  const [selectedKey, setSelectedKey] = useState();
  const [openSessionSelector, setOpenSessionSelector] = useState(false);

  const [, globalSessionDispatch] = useContext(GlobalSessionContext);
  const { data, fetchData } = useFetch({
    url: CORE_ROUTE + GLOBAL_SESSION_LIST,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const [selectedSession, setSelectedSession] = useState(
    data?.length > 0 ? { key: data[0].id, label: data[0].name } : {}
  );

  const location = useLocation();
  const accessibleModules = filterMenuData(modules, userData?.menu_items);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  function updateLabelsForIntl(menuItems, selectedKey) {
    return menuItems?.map((item) => {
      const updatedLabel = intl.formatMessage({
        id: `label.menu.${item.label}`,
      });
      let icon = item.icon;
      if (item.selectedIcon && item.key === selectedKey) {
        icon = item.selectedIcon;
      }
      return {
        ...item,
        label: updatedLabel,
        icon,
      };
    });
  }

  const handleOnSelectSession = (item) => {
    setSelectedSession(item);
    globalSessionDispatch(setGlobalSessionDetails(+item.key));
    setOpenSessionSelector(false);
  };

  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
    setSelectedKey(key);
  };

  const handleOnClickLogo = () => {
    navigate(DASHBOARD);
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const select = `/${pathSegments[1]}`;
    setSelectedKey(select);
  }, [userProfileDetails]);

  useEffect(() => {
    if (data) {
      setSelectedSession({ key: data[0].id, label: data[0].name });
      globalSessionDispatch(setGlobalSessionDetails(data[0].id));
    }
  }, [data]);

  useEffect(() => {
    if (!responsive.isMd && !data) {
      fetchData({});
    }
  }, [openSessionSelector]);

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
        <div className={styles.appLogoContainer}>
          <div className={styles.sideMenuTopSection}>
            <div className={styles.appLogoBox}>
              <div onClick={handleOnClickLogo} className={styles.appLogo}>
                {logo}
              </div>
            </div>
          </div>
        </div>
        {!openSessionSelector && (
          <TwoRow
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
                      <div className={styles.moduleSelectorHeading}>
                        {selectedModule?.label}
                      </div>
                    }
                    rightSection={
                      <SideMenuButton
                        onBtnClick={() => {
                          setIsModalOpen(true);
                          setOpenSessionSelector(false);
                          setOpenSideMenu(false);
                        }}
                        btnText={intl.formatMessage({ id: "label.change" })}
                      />
                    }
                  />
                }
              />
            }
            bottomSection={
              selectedModule && (
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
                  onSelect={handleOnClickMenuItem}
                  selectedKeys={selectedKey}
                />
              )
            }
          />
        )}
        {data && !responsive.isMd && (
          <TwoRow
            className={styles.sessionContainer}
            topSection={
              !openSessionSelector && (
                <Typography className={styles.sectionHeading}>
                  {intl.formatMessage({ id: "label.session" })}
                </Typography>
              )
            }
            bottomSection={
              <SideMenuItems
                openSelector={openSessionSelector}
                setOpenSelector={setOpenSessionSelector}
                modules={data?.map((item) => ({
                  key: item.id,
                  label: item.name,
                }))}
                handleOnSelectItem={handleOnSelectSession}
                selectedItem={selectedSession}
              />
            }
          />
        )}
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
