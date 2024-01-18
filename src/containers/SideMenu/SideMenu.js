import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import { ArrowRightOutlined, GlobalOutlined } from "@ant-design/icons";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import modules from "./sideMenuItems";

import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { setGlobalSessionDetails } from "../../globalContext/globalSession/globalSessionActions";
import useFetch from "../../core/hooks/useFetch";
import useResponsive from "core/hooks/useResponsive";
import SideMenuItems from "../SideMenuItems";
import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo }) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const responsive = useResponsive()
  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [openSessionSelector, setOpenSessionSelector] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const [, globalSessionDispatch] = useContext(GlobalSessionContext);
  const { data, fetchData, error, isError } = useFetch({ url: "core/global-sessions" });
  const [selectedSession, setSelectedSession] = useState(
    data?.length > 0 ? { key: data[0].id, label: data[0].name } : {}
  );

  // TODO: need to create context for it if needed
  const handleOnSelectItem = (item) => {
    setSelectedModule(item);
    setOpenModuleSelector(false);
  };

  const handleOnSelectSession = (item) => {
    setSelectedSession(item);
    globalSessionDispatch(setGlobalSessionDetails(+item.id));
    setOpenSessionSelector(false);
  };

  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
  };

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const handleTryAgain = () => {
      fetchData();
  };

  useEffect(() => {
    if (data) {
      setSelectedSession({ key: data[0].id, label: data[0].name });
      globalSessionDispatch(setGlobalSessionDetails(data[0].id));
    }
  }, [data]);

  return (
    <>
    {/* {isError && (
        <div className={styles.box}>
          <ErrorMessageBox
            onClick={handleTryAgain}
            errorText={errorString}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )} */}
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
          <div className={styles.appLogo}>{logo}</div>
          {!openSessionSelector && (
            <>
              <Typography className={styles.sectionHeading}>Module</Typography>
              <SideMenuItems
                openSelector={openModuleSelector}
                setOpenSelector={setOpenModuleSelector}
                modules={modules}
                handleOnSelectItem={handleOnSelectItem}
                selectedItem={selectedModule}
                sectionName="module"
              />
              {!openModuleSelector && selectedModule && (
                <Menu
                  className={styles.sideMenuOptionsContainer}
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={selectedModule.children}
                  expandIcon={<></>}
                  openKeys={modules.map((module) => module.key)}
                  onSelect={handleOnClickMenuItem}
                />
              )}
            </>
          )}

          {data && !openModuleSelector && !responsive.isMd && (
            <>
              <Typography className={styles.sectionHeading}>Session</Typography>
              <SideMenuItems
                openSelector={openSessionSelector}
                setOpenSelector={setOpenSessionSelector}
                modules={data?.map((item) => ({
                  key: item.id,
                  label: item.name,
                }))}
                handleOnSelectItem={handleOnSelectSession}
                selectedItem={selectedSession}
                sectionName="session"
              />
            </>
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
            <Typography.Text>Visit Website</Typography.Text>
          </Button>
          <ArrowRightOutlined />
        </Space>
      </div>
    </ConfigProvider>
    </>
  );
};

export default SideMenu;
