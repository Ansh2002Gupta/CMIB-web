import React, { useState } from 'react';
import { TwoRow } from 'core/layouts';

import ContentHeader from '../../containers/ContentHeader';
import { useIntl } from 'react-intl';
import TwoColumn from '../../core/layouts/TwoColumn/TwoColumn';
import styles from './session.module.scss';
import CustomButton from '../../components/CustomButton';
import variables from '../../themes/base/styles/variables';
import { Tabs } from 'antd';

import SessionDetails from '../../containers/SessionDetails';

function Session() {
  const intl = useIntl();
  const [activeTabKey, setActiveTabKey] = useState('1');

  const onChange = (key) => {
    setActiveTabKey(key);
  };

  const TabItems = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'session.sessionDetails' }),
      children: <SessionDetails />,
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'session.roundOne' }),
      children: <div>Round 1</div>,
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'session.roundTwo' }),
      children: <div>Round 2</div>,
    },
  ];

  const activeTab = TabItems.find((tab) => tab.key === activeTabKey);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={
            <TwoColumn
              className={styles.spaceBetween}
              leftSection={
                <ContentHeader
                  headerText={intl.formatMessage({ id: 'label.session' })}
                />
              }
              rightSection={
                <CustomButton
                  btnText={intl.formatMessage({
                    id: 'session.setUpNewSession',
                  })}
                  customStyle={styles.buttonStyles}
                  iconUrl={'./add.png'}
                  textStyle={styles.textStyle}
                />
              }
            />
          }
          bottomSection={
            <Tabs
              defaultActiveKey="1"
              activeKey={activeTabKey}
              onChange={onChange}
              style={{
                width: variables.fullWidth,
                borderWidth: '0px',
                padding: '0px',
              }}
            >
              {TabItems.map((tab) => (
                <Tabs.TabPane key={tab.key} tab={tab.label} />
              ))}
            </Tabs>
          }
        />
      }
      bottomSection={!!activeTab && activeTab.children}
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
      }}
    />
  );
}

export default Session;
