import React, { useContext } from "react";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";
import { ThemeContext } from "core/providers/theme";

import SideMenuButton from "../../components/SideMenuButton/SideMenuButton";
import ModuleList from "../SideMenu/ModuleList";
import styles from "./SideMenuItems.module.scss";
import { Image, Input } from "antd";

const SideMenuItems = ({
  openSelector,
  setOpenSelector,
  modules,
  handleOnSelectItem,
  selectedItem,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

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
            leftSection={<div className={styles.imageContainer}>
              <Image src={getImage("arrowLeft")} preview={false} />
            </div>}
            rightSection={
              <div className={styles.searchBarContainer}>
                <Input
                  prefix={
                    <Image
                      src={getImage("searchIcon")}
                      className={styles.searchIcon}
                      preview={false}
                    />
                  }
                  placeholder={intl.formatMessage({
                    id: "label.searchByCentreNameOrId",
                  })}
                  allowClear
                  className={styles.searchBar}
                  // value={searchedValue}
                  // onChange={(e) => handleOnUserSearch(e.target.value)}
                />
              </div>
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
