import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import { Image, Typography } from "antd";
import styles from "./ModuleChange.module.scss";
import { useIntl } from "react-intl";
import { classes } from "./Module.styles";

const ModuleChange = ({ setIsModalOpen }) => {
  const [selectedModule, setSelectedModule] = useState(1);
  const items = [
    {
      id: 1,
      title: "Control",
      isExperiencedMember: false,
      image: "flagOnPedestal",
    },
    {
      id: 2,
      title: "Newly Qualified Placements",
      isExperiencedMember: false,
      image: "global",
    },
    { id: 3, title: "CA Jobs", isExperiencedMember: false, image: "scholar" },
    {
      id: 4,
      title: "Overseas Chapters",
      isExperiencedMember: true,
      image: "settings",
    },
    {
      id: 5,
      title: "Career Ascent",
      isExperiencedMember: true,
      image: "suiteCase",
    },
    {
      id: 6,
      title: "Woman Part Time",
      isExperiencedMember: true,
      image: "woman",
    },
  ];

  const { getImage } = useContext(ThemeContext);
  const intl = useIntl();

  return (
    <TwoRow
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
          {items?.map((obj) => {
            return (
              <div
                key={obj.id}
                className={[
                  styles.moduleBox,
                  selectedModule === obj?.id ? styles.activeModule : "",
                ].join(" ")}
              >
                <div className={styles.imageAndTextContainer}>
                  <Image src={getImage(obj.image)} preview={false} />
                  <div>
                    <Typography className={styles.moduleText}>
                      {obj?.title}
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
