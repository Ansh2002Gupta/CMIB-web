import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import DataTable from "../../components/DataTable";
import { HYPHEN } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";

const CompanyDetailsApprovalCard = ({
  heading,
  columns,
  dataSource,
  customTableStyle,
}) => {
  return (
    <TwoRow
      className={commonStyles.cardContainer}
      topSection={
        <Typography className={commonStyles.headingText}>{heading}</Typography>
      }
      bottomSection={
        !!dataSource.length ? (
          <DataTable
            customTableClassName={customTableStyle}
            columns={columns}
            originalData={dataSource}
            hidePagination
          />
        ) : (
          <Typography>{HYPHEN}</Typography>
        )
      }
    />
  );
};

CompanyDetailsApprovalCard.defaultProps = {
  heading: "",
  columns: [],
  dataSource: [],
  customTableStyle: {},
};

CompanyDetailsApprovalCard.propTypes = {
  heading: PropTypes.string,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  customTableStyle: PropTypes.object,
};

export default CompanyDetailsApprovalCard;
