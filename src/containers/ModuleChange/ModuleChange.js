import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import { Image, Typography } from "antd";
import styles from "./ModuleChange.module.scss";
import { useIntl } from "react-intl";

const ModuleChange = ({ setIsModalOpen }) => {
  const [selectedModule, setSelectedModule] = useState(1);
  const items = [
    {
      id: 1,
      title: "Control",
      image: "flagOnPedestal",
    },
    {
      id: 2,
      title: "Newly Qualified Placements",
      image: "global",
    },
    { id: 3, title: "CA Jobs", image: "scholar" },
    { id: 4, title: "Overseas Chapters", image: "settings" },
    { id: 5, title: "Career Ascent", image: "suiteCase" },
    { id: 6, title: "Woman Part Time", image: "woman" },
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
      bottomSection={
        <div className={styles.modulesContainer}>
          {items?.map((obj) => {
            return (
              <div key={obj.id} className={styles.moduleBox}>
                <Image src={getImage(obj.image)} preview={false} />
                <Typography className={styles.moduleText}>
                  {obj?.title}
                </Typography>
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
