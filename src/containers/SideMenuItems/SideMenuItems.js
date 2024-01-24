import React from "react";
import { useIntl } from "react-intl";
import { UpOutlined } from "@ant-design/icons";

import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";

import SideMenuButton from "../../components/SideMenuButton/SideMenuButton";
import ModuleList from "../SideMenu/ModuleList";
import styles from "./SideMenuItems.module.scss";

const SideMenuItems = ({
  openSelector,
  setOpenSelector,
  modules,
  handleOnSelectItem,
  selectedItem,
  sectionName,
}) => {
  const intl = useIntl();

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
            <SideMenuButton
              onBtnClick={() => setOpenSelector((prev) => !prev)}
              btnText={
                openSelector ? (
                  <UpOutlined />
                ) : (
                  intl.formatMessage({ id: "label.change" })
                )
              }
            />
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
