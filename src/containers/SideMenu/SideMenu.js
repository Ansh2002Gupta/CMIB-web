import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";

import SideMenuButton from "../../components/SideMenuButton";
import SideMenuItems from "../SideMenuItems";
import { setItem } from "../../services/encrypted-storage-service";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import {
  setGlobalSessionDetails,
  setSelectedSession,
} from "../../globalContext/globalSession/globalSessionActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { DASHBOARD } from "../../routes/routeNames";
import { filterMenuData } from "../../constant/utils";
import modules from "./sideMenuItems";
import { MODULE_KEYS, SESSION_KEY } from "../../constant/constant";
import { ReactComponent as Globe } from "../../themes/base/assets/icons/globe.svg";
import { ReactComponent as CaIndiaLogo } from "../../themes/base/assets/icons/ca-india-logo.svg";
import commonStyles from "../../common/commonStyles.module.scss";
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
  const { globalSessionList, selectedSession } = globalSessionDetails;

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
    setItem(SESSION_KEY, item.key?.toString());
    globalSessionDispatch(setSelectedSession(item));
    globalSessionDispatch(setGlobalSessionDetails(+item.key));
    setOpenSessionSelector(false);
  };

  const handleOnClickMenuItem = ({ key }) => {
    setSelectedKey(key);
    setOpenSideMenu(false);
    navigate(`/${selectedModule.key}/${key}`);
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
    globalSessionDispatch(setGlobalSessionDetails(globalSessionList?.[0]?.id));
  }, [selectedModule?.key]);

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
        <TwoRow
          className={commonStyles["customSrollBar-blue-bg"]}
          topSection={
            <>
              {!openSessionSelector && (
                <TwoRow
                  topSection={
                    !responsive?.isLg && (
                      <Typography className={styles.sectionHeading}>
                        {intl.formatMessage({ id: "label.module" })}
                      </Typography>
                    )
                  }
                  bottomSection={
                    <TwoColumn
                      className={styles.moduleSelector}
                      leftSectionClassName={styles.selectedModuleBox}
                      isLeftFillSpace
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
                  {!responsive.isLg &&
                    selectedModule?.key !== MODULE_KEYS.CA_JOBS_KEY &&
                    selectedModule?.key !== MODULE_KEYS.CONTROL_KEY && (
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
                            globalSessionList={globalSessionList?.map(
                              (item) => ({
                                key: item.id,
                                label: item.name,
                              })
                            )}
                            handleOnSelectItem={handleOnSelectSession}
                            selectedItem={selectedSession}
                            selectedModule={selectedModule}
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
                      openKeys={accessibleModules?.map((module) => module?.key)}
                      onSelect={handleOnClickMenuItem}
                      selectedKeys={selectedKey}
                    />
                  )}
                </>
              }
            />
          }
        />
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
            <ArrowRightOutlined className={styles.arrowIcon} />
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SideMenu;
