import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../../containers/ContentHeader";
import CustomTabs from "../../components/CustomTabs";
import SessionDetails from "../../containers/SessionDetails";
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
      children: <div>Round 1</div>,
    },
    {
      key: "3",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: <div>Round 2</div>,
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
              customStyles={styles.spaceBetween}
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
