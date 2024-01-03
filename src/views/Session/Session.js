import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import CustomTabs from "../../components/CustomTabs";
import SessionDetails from "../../containers/SessionDetails";
import SessionRound from "../SessionRound";
import {
  ROUND_ONE_CARD_LIST,
  ROUND_TWO_CARD_LIST,
} from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import styles from "./session.module.scss";

function Session() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState("1");
  const [addSession, setAddSession] = useState(false);
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "session.sessionDetails" }),
      children: (
        <SessionDetails addSession={addSession} setAddSession={setAddSession} />
      ),
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundOne" }),
      children: (
        <SessionRound
          roundList={ROUND_ONE_CARD_LIST}
          switchLabel={intl.formatMessage({ id: "session.roundOneStatus" })}
        />
      ),
    },
    {
      key: "3",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: (
        <SessionRound
          roundList={ROUND_TWO_CARD_LIST}
          switchLabel={intl.formatMessage({ id: "session.roundTwoStatus" })}
        />
      ),
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={
            <ContentHeader
              customStyles={!responsive?.isMd ? styles.customStyles : null}
              headerText={intl.formatMessage({ id: "label.session" })}
              rightSection={
                !addSession && (
                  <CustomButton
                    btnText={intl.formatMessage({
                      id: "session.setUpNewSession",
                    })}
                    customStyle={!responsive.isMd ? styles.buttonStyles : null}
                    iconUrl={responsive.isMd && getImage("addIcon")}
                    textStyle={styles.textStyle}
                    onClick={() => {
                      setAddSession(true);
                    }}
                  />
                )
              }
            />
          }
          bottomSection={
            !addSession && (
              <CustomTabs
                tabs={tabItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )
          }
        />
      }
      bottomSection={
        addSession ? (
          <SessionDetails {...{ addSession, setAddSession }} />
        ) : (
          !!activeTabChildren && activeTabChildren.children
        )
      }
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
      }}
    />
  );
}

export default Session;
