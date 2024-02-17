import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import SideMenuButton from "../../components/SideMenuButton";
import SideMenuItems from "../SideMenuItems";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useGlobalSessionListApi from "../../services/api-services/GlobalSessionList/useGlobalSessionListApi";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { DASHBOARD } from "../../routes/routeNames";
import { filterMenuData } from "../../constant/utils";
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
  const [openSessionSelector, setOpenSessionSelector] = useState(false);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [globalSessionDetails, globalSessionDispatch] =
    useContext(GlobalSessionContext);
  const { getGlobalSessionList } = useGlobalSessionListApi();
  const globalSessionList = globalSessionDetails?.globalSessionList;

  const [selectedSession, setSelectedSession] = useState(
    globalSessionList.length > 0
      ? { key: globalSessionList?.[0].id, label: globalSessionList?.[0].name }
      : {}
  );

  const location = useLocation();
  const accessibleModules = filterMenuData(modules, userData?.menu_items);

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

  const handleOnSelectSession = (item) => {
    setSelectedSession(item);
    globalSessionDispatch(setGlobalSessionDetails(+item.key));
    setOpenSessionSelector(false);
  };

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

  useEffect(() => {
    if (globalSessionList?.length) {
      selectedModule?.key && getGlobalSessionList(selectedModule?.key);
      setSelectedSession({
        key: globalSessionList?.[0]?.id,
        label: globalSessionList?.[0]?.name,
      });
      globalSessionDispatch(
        setGlobalSessionDetails(globalSessionList?.[0]?.id)
      );
    }
  }, [selectedKey?.key]);

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
        {
          <TwoRow
            topSection={
              <>
                {!openSessionSelector && (
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
                )}
              </>
            }
            bottomSection={
              <TwoRow
                topSection={
                  <>
                    {!!globalSessionList?.length && !responsive.isMd && (
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
                            modules={globalSessionList?.map((item) => ({
                              key: item.id,
                              label: item.name,
                            }))}
                            handleOnSelectItem={handleOnSelectSession}
                            selectedItem={selectedSession}
                          />
                        }
                      />
                    )}
                  </>
                }
                bottomSection={
                  <>
                    {selectedModule && !openSessionSelector && (
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
                        openKeys={accessibleModules?.map(
                          (module) => module?.key
                        )}
                        onSelect={handleOnClickMenuItem}
                        selectedKeys={selectedKey}
                      />
                    )}
                  </>
                }
              />
            }
          />
        }

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
