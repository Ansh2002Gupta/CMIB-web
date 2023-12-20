import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { TwoRow, TwoColumn } from 'core/layouts';

import variables from '../../themes/base/styles/variables';
import ContentHeader from '../../containers/ContentHeader';
import SessionDetails from '../../containers/SessionDetails';
import CustomButton from '../../components/CustomButton';
import CustomTabs from '../../components/CustomTabs';

import styles from './session.module.scss';

function Session() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState('1');

  const TabItems = [
    {
      key: '1',
      title: intl.formatMessage({ id: 'session.sessionDetails' }),
      children: <SessionDetails />,
    },
    {
      key: '2',
      title: intl.formatMessage({ id: 'session.roundOne' }),
      children: <div>Round 1</div>,
    },
    {
      key: '3',
      title: intl.formatMessage({ id: 'session.roundTwo' }),
      children: <div>Round 2</div>,
    },
  ];

  const activeTabChildren = TabItems.find((tab) => tab.key === activeTab);

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
            <CustomTabs
              tabs={TabItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        />
      }
      bottomSection={!!activeTabChildren && activeTabChildren.children}
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
      }}
    />
  );
}

export default Session;
