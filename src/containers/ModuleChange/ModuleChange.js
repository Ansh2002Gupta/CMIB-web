import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { filterMenuData } from "../../constant/utils";
import { setModuleDetails } from "../../globalContext/userProfile/userProfileActions";
import modules from "../SideMenu/sideMenuItems";
import styles from "./ModuleChange.module.scss";
import { classes } from "./Module.styles";

const ModuleChange = ({ setIsModalOpen }) => {
  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const userData = userProfileDetails?.userDetails;
  const accessibleModules = filterMenuData(modules, userData?.menu_items);
  const [selectedModule, setSelectedModule] = useState();

  const { getImage } = useContext(ThemeContext);
  const intl = useIntl();

  const handleModuleSelect = (item) => {
    setIsModalOpen(false);
    userProfileDispatch(setModuleDetails(item));
  };

  useEffect(() => {
    if (userProfileDetails?.moduleDetails) {
      setSelectedModule(userProfileDetails?.moduleDetails);
    } else {
      setSelectedModule(accessibleModules[0]);
    }
  }, [userProfileDetails]);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <div className={styles.topContainer}>
          <Typography className={styles.moduleText}>
            {intl.formatMessage({ id: "label.selectModules" })}
          </Typography>
          <Image
            src={getImage("cross")}
            preview={false}
            onClick={() => setIsModalOpen(false)}
            className={styles.crossIcon}
          />
        </div>
      }
      bottomSectionStyle={classes.bottonContainer}
      bottomSection={
        <div className={styles.modulesContainer}>
          {accessibleModules?.map((obj) => {
            return (
              <div
                key={obj.id}
                className={[
                  styles.moduleBox,
                  selectedModule?.id === obj?.id ? styles.activeModule : "",
                ].join(" ")}
                onClick={() => {
                  handleModuleSelect(obj);
                }}
              >
                <div className={styles.imageAndTextContainer}>
                  <Image
                    src={getImage(obj.image)}
                    preview={false}
                    className={styles.imageStyle}
                  />
                  <div>
                    <Typography className={styles.moduleText}>
                      {obj?.label}
                    </Typography>
                    {obj.isExperiencedMember && (
                      <Typography className={styles.subText}>
                        {`( ${intl.formatMessage({
                          id: "label.experiencedMember",
                        })} )`}
                      </Typography>
                    )}
                  </div>
                </div>
                {selectedModule === obj?.id && (
                  <Image
                    preview={false}
                    src={getImage("blueCheckSign")}
                    className={styles.checkMark}
                  />
                )}
              </div>
            );
          })}
        </div>
      }
    />
  );
};

ModuleChange.defaultProps = {
  setIsModalOpen: () => {},
};

ModuleChange.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default ModuleChange;
