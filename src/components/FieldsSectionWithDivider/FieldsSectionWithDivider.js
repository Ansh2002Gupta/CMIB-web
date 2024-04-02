import React from 'react';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import styles from './FieldsSectionWithDivider.module.scss';
import CustomGrid from '../CustomGrid';

const FieldsSectionWithDivider = ({ fields }) => {
  const intl = useIntl();

  const renderFields = (fields) => fields?.map((item) => (
    <div key={item.id} className={styles.gridItem}>
      <Typography className={styles.grayText}>
        {intl.formatMessage({ id: `label.${item.label}` })}
      </Typography>
      <div className={styles.blackText}>{item.value}</div>
    </div>
  ));

  const renderDivider = () => (
    <hr className={[styles.divider, styles.fullWidth].join(" ")} />
  );

  return (
    <CustomGrid>
      {fields.map((fields, index) => (
        <React.Fragment key={index}>
          {renderFields(fields)}
          {index < fields.length - 1 && renderDivider()}
        </React.Fragment>
      ))}
    </CustomGrid>
  );
};

export default FieldsSectionWithDivider;