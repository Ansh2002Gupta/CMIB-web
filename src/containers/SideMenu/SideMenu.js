import React, { useState } from "react";
import { Button, ConfigProvider, Menu, Space, Typography } from "antd";
import {
  ArrowRightOutlined,
  GlobalOutlined,
  UpOutlined,
} from "@ant-design/icons";

import ModuleList from "./ModuleList";
import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import modules from "./sideMenuItems";

import styles from "./sideMenu.module.scss";

const SideMenu = ({ logo }) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  // TODO: need to create context for it if needed
  const handleOnSelectItem = (item) => {
    setSelectedModule(item);
    setOpenModuleSelector(false);
  };
  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
  };
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
          <div className={styles.appLogo}>{logo}</div>
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
                      : selectedModule.label}
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
                  modules={modules}
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
              openKeys={modules.map((module) => module.key)}
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
            <Typography.Text>Visit Website</Typography.Text>
          </Button>
          <ArrowRightOutlined />
        </Space>
      </div>
    </ConfigProvider>
  );
};

export default SideMenu;
