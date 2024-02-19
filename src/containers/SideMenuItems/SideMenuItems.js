import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Input, Typography } from "antd";
import { capitalize } from "lodash";

import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";
import { ThemeContext } from "core/providers/theme";

import ModuleList from "../SideMenu/ModuleList";
import SideMenuButton from "../../components/SideMenuButton/SideMenuButton";
import { classes } from "./SideMenuItems.styles";
import styles from "./SideMenuItems.module.scss";
import "./Override.css";

const SideMenuItems = ({
  handleOnSelectItem,
  globalSessionList,
  openSelector,
  selectedItem,
  setOpenSelector,
}) => {
  const intl = useIntl();
  const [sessionList, setSessionList] = useState(globalSessionList);
  const { getImage } = useContext(ThemeContext);
  const handleOnUserSearch = (val) => {
    let filteredList = globalSessionList.filter((ele) =>
      ele.label.toLowerCase().includes(val)
    );
    setSessionList(filteredList);
  };

  useEffect(() => {
    setSessionList(globalSessionList);
  }, [globalSessionList]);

  return (
    <TwoRow
      className={styles.module}
      topSection={
        !openSelector ? (
          <TwoColumn
            className={styles.moduleSelector}
            isLeftFillSpace
            leftSectionStyle={classes.leftSectionStyle}
            leftSection={
              <div className={styles.moduleSelectorHeading}>
                {capitalize(
                  selectedItem?.label ||
                    intl.formatMessage({ id: "label.noSessionsAvailable" })
                )}
              </div>
            }
            rightSection={
              <SideMenuButton
                onBtnClick={() =>
                  selectedItem?.label && setOpenSelector((prev) => !prev)
                }
                btnText={intl.formatMessage({ id: "label.change" })}
              />
            }
          />
        ) : (
          <TwoColumn
            className={styles.imageAndSearchBarContainer}
            leftSection={
              <div
                onClick={() => {
                  setSessionList(globalSessionList);
                  setOpenSelector((prev) => !prev);
                }}
                className={styles.imageContainer}
              >
                <Image src={getImage("arrowLeft")} preview={false} />
              </div>
            }
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
        openSelector &&
        (sessionList?.length ? (
          <ModuleList
            modules={sessionList}
            onSelectItem={(val) => {
              setSessionList(globalSessionList);
              handleOnSelectItem(val);
            }}
          />
        ) : (
          <Typography className={styles.noResultText}>
            {intl.formatMessage({ id: "label.noResultsFound" })}
          </Typography>
        ))
      }
    />
  );
};

export default SideMenuItems;
