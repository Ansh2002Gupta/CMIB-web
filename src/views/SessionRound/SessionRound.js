import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Select, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";

import CustomSwitch from "../../components/CustomSwitch";
import RoundCard from "../../containers/RoundCard";
import { CITY_CENTERS } from "../../constant/constant";
import { classes } from "./SessionRound.styles";
import styles from "./SessionRound.module.scss";

const SessionRound = ({ roundList, switchLabel }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [status, setStatus] = useState(false);
  const [city, setCity] = useState([]);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoColumn
          className={styles.cityContainer}
          leftSectionStyle={classes.leftSectionStyle}
          rightSectionStyle={classes.rightSectionStyle}
          leftSection={
            <CustomSwitch
              checked={status}
              label={switchLabel}
              onChange={() => {
                setStatus(!status);
              }}
            />
          }
          rightSection={
            <TwoRow
              className={styles.centerContainer}
              topSection={
                <Typography className={styles.grayText}>
                  {intl.formatMessage({
                    id: `session.rounds.centres`,
                  })}
                  <span className={styles.redText}> *</span>
                </Typography>
              }
              bottomSection={
                <Select
                  bordered={false}
                  size={"large"}
                  style={classes.multiSelectStyle}
                  className={styles.multilpleInput}
                  onChange={(val) => {
                    setCity(val);
                  }}
                  options={CITY_CENTERS}
                  placeholder={intl.formatMessage({
                    id: `session.rounds.selectCentres`,
                  })}
                  value={city}
                  mode="multiple"
                />
              }
            />
          }
        />
      }
      bottomSection={
        <div className={styles.gridClass}>
          {roundList.map((item) => {
            return (
              <RoundCard
                key={item.id}
                headingDescription={item.headingDescription}
                headingIntl={item.headingIntl}
                imageUrl={item.imageUrl}
                onClick={() => {
                  navigate(item.onclickNaviagtion);
                }}
              />
            );
          })}
        </div>
      }
      bottomSectionStyle={
        responsive?.isXl
          ? classes.bottomSectionStyle
          : classes.mobileBottomSectionStyle
      }
    />
  );
};

SessionRound.defaultProps = {
  roundList: [],
  switchLabel: "",
};

SessionRound.propTypes = {
  roundList: PropTypes.array,
  switchLabel: PropTypes.string,
};

export default SessionRound;
