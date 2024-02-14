import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import CustomTabs from "../../components/CustomTabs";
import SessionDetails from "../../containers/SessionDetails";
import SessionRound from "../SessionRound";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, SESSIONS } from "../../constant/apiEndpoints";
import {
  ROUND_ONE_CARD_LIST,
  ROUND_TWO_CARD_LIST,
} from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import { ReactComponent as AddIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./session.module.scss";

function Session() {
  const intl = useIntl();

  const [activeTab, setActiveTab] = useState("1");
  const [addSession, setAddSession] = useState(false);
  const [sessionId, setSessionId] = useState(1); //TODO : 1 has to replace once Global Session will implement as we will take id from there using useContext
  const {
    data: sessionData,
    error: sessionError,
    fetchData,
    isError: isSessionError,
    isLoading: isGettingSessions,
    isSuccess,
    setData,
  } = useFetch({
    url: ADMIN_ROUTE + SESSIONS + `/${sessionId}`,
  });

  const responsive = useResponsive();

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "session.sessionDetails" }),
      children: (
        <SessionDetails
          key={Date.now()}
          {...{
            addSession,
            isGettingSessions,
            isSessionError,
            fetchData,
            sessionData,
            sessionError,
            setAddSession,
            setSessionId,
          }}
        />
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
              customStyles={!responsive?.isMd ? styles.customStyles : ""}
              headerText={intl.formatMessage({ id: "label.session" })}
              rightSection={
                !addSession && (
                  <CustomButton
                    btnText={intl.formatMessage({
                      id: "session.setUpNewSession",
                    })}
                    customStyle={!responsive.isMd ? styles.buttonStyles : ""}
                    IconElement={responsive.isMd ? AddIcon : null}
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
          <SessionDetails
            key={Date.now()}
            {...{
              addSession,
              isGettingSessions,
              isSessionError,
              fetchData,
              sessionData,
              sessionId,
              sessionError,
              setAddSession,
              setSessionId,
            }}
          />
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
