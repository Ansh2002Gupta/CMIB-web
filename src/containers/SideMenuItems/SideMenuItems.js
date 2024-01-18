import React from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";

import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";
import ModuleList from "../SideMenu/ModuleList";
import styles from "./SideMenuItems.module.scss";

const SideMenuItems = ({
  openSelector,
  setOpenSelector,
  modules,
  handleOnSelectItem,
  selectedItem,
  sectionName
}) => {
  return (
    <TwoRow
      style={{ overflow: "visible" }}
      topSection={
        <TwoColumn
          className={styles.moduleSelector}
          leftSection={
            <div className={openSelector ? "" : styles.moduleSelectorHeading}>
              {openSelector ? `Choose a ${sectionName}` : selectedItem?.label}
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
              onClick={() => setOpenSelector((prev) => !prev)}
            >
              {openSelector ? <UpOutlined /> : "Change"}
            </Button>
          }
        />
      }
      bottomSection={
        openSelector && (
          <ModuleList modules={modules} onSelectItem={handleOnSelectItem} />
        )
      }
    />
  );
};

export default SideMenuItems;
