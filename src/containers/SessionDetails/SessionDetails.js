import React, { useState } from 'react';
import { Typography, Image, Switch } from 'antd';
import { TwoRow, TwoColumn } from '../../core/layouts';

import styles from './SessionDetails.module.scss';
import { useIntl } from 'react-intl';
import variables from '../../themes/base/styles/variables';
import CustomInput from '../../components/CustomInput';

const FIELDSONE = [
  {
    id: 1,
    headingIntl: 'sessionName',
    headingLabel: 'Session Name *',
    value: 'Campus Placement Programme',
  },
  {
    id: 2,
    headingIntl: 'natureOfGoods',
    headingLabel: 'Nature of services/goods *',
    value: 'Services/goods',
  },
  {
    id: 3,
    headingIntl: 'invoiceNumberFormat',
    headingLabel: 'Perfoma Invoice Number Format *',
    value: 'Augsept-***-2023',
  },
  {
    id: 4,
    headingIntl: 'examinationSessionPeriod',
    headingLabel: 'Examination Session Period *',
    value: 'May 2023',
  },
  {
    id: 5,
    headingIntl: 'gmcsCompletetionDate',
    headingLabel: 'GMCS Completetion Date *',
    value: '10/10/2022',
  },
  {
    id: 6,
    headingIntl: 'membershipCompletetionDate',
    headingLabel: 'Membership Completetion Date *',
    value: '10/10/2022',
  },
  {
    id: 7,
    headingIntl: 'articleshipCompletetionFromDate',
    headingLabel: 'Articleship Completetion From Date *',
    value: '10/10/2022',
  },
  {
    id: 8,
    headingIntl: 'articleshipCompletetionToDate',
    headingLabel: 'Articleship Completetion To Date`*',
    value: '10/10/2022',
  },
  {
    id: 9,
    headingIntl: 'bankACNumberOffline',
    headingLabel: 'Bank A/C number offline *',
    value: '1233 9344 0234 0234',
  },
  {
    id: 10,
    headingIntl: 'bankACNumberOnline',
    headingLabel: 'Bank A/C number online*',
    value: '1233 9344 0234 0234',
  },
];

const SessionDetails = () => {
  const intl = useIntl();
  const [status, setStatus] = useState(true);
  const [edit, setEdit] = useState(false);
  const handleStatusChange = () => {
    setStatus(!status);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <TwoRow
      className={styles.sessionDetails}
      topSection={
        <TwoColumn
          className={styles.headerContainer}
          leftSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: 'session.sessionDetails' })}
            </Typography>
          }
          rightSection={
            <TwoColumn
              onClick={handleEdit}
              className={styles.editContainer}
              leftSection={
                <Image
                  src={'./edit.png'}
                  className={styles.editIcon}
                  preview={false}
                />
              }
              rightSection={
                <Typography className={styles.blackText}>
                  {intl.formatMessage({ id: 'session.edit' })}
                </Typography>
              }
            />
          }
        />
      }
      bottomSection={
        <div className={styles.gridContainer}>
          {FIELDSONE.map((item) => {
            return (
              <TwoRow
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({ id: `session.${item.headingIntl}` })}
                    <span className={styles.redText}>*</span>
                  </Typography>
                }
                bottomSection={
                  // <Typography className={styles.blackText}>
                  //   {item.value}
                  // </Typography>
                  <CustomInput
                    value={item.value}
                    disabled={edit}
                    customLabelStyles={styles.inputLabel}
                    customInputStyles={styles.input}
                  />
                }
              />
            );
          })}
          <TwoRow
            className={styles.gridItem}
            topSection={
              <Typography className={styles.grayText}>
                {intl.formatMessage({ id: 'label.status' })}
                <span className={styles.redText}>*</span>
              </Typography>
            }
            bottomSection={
              <TwoColumn
                className={styles.statusContainer}
                leftSection={
                  <Switch
                    style={status && { backgroundColor: variables.greenBtnBg }}
                    checked={status}
                    onChange={handleStatusChange}
                    disabled={edit}
                  />
                }
                rightSection={
                  <Typography className={styles.blackText}>
                    {status
                      ? intl.formatMessage({ id: 'label.active' })
                      : intl.formatMessage({ id: 'label.inactive' })}
                  </Typography>
                }
              />
            }
          />
        </div>
      }
    />
  );
};
export default SessionDetails;
