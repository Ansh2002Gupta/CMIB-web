import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Input } from "antd";

import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";
import { ThemeContext } from "core/providers/theme";

import ModuleList from "../SideMenu/ModuleList";
import SideMenuButton from "../../components/SideMenuButton/SideMenuButton";
import styles from "./SideMenuItems.module.scss";
import "./Override.css"

const SideMenuItems = ({
  handleOnSelectItem,
  modules,
  openSelector,
  selectedItem,
  setOpenSelector,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const handleOnUserSearch = (val) =>{}
  return (
    <TwoRow
      style={{ overflow: "visible" }}
      topSection={
        !openSelector ? (
          <TwoColumn
            className={styles.moduleSelector}
            leftSection={
              <div className={styles.moduleSelectorHeading}>
                {selectedItem?.label}
              </div>
            }
            rightSection={
              <SideMenuButton
                onBtnClick={() => setOpenSelector((prev) => !prev)}
                btnText={intl.formatMessage({ id: "label.change" })}
              />
            }
          />
        ) : (
          <TwoColumn
            className={styles.imageAndSearchBarContainer}
            leftSection={<div onClick={() => setOpenSelector((prev) => !prev)} className={styles.imageContainer}>
              <Image src={getImage("arrowLeft")} preview={false} />
            </div>}
            isRightFillSpace
            rightSection={
                <Input
                  prefix={
                    <Image
                      src={getImage("searchIcon")}
                      className={styles.searchIcon}
                      preview={false}
                    />
                  }
                  placeholder={intl.formatMessage({
                    id: "label.search",
                  })}
                  className={styles.searchBar}
                  onChange={(e) => handleOnUserSearch(e.target.value)}
                />
            }
          />
        )
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
