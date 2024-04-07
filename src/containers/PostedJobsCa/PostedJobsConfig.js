import styles from "./PostedJobsCa.module.scss";
import { SORT_VALUES } from "../../constant/constant";

const getJobsColumn = ({
  intl,
  getImage,
  goToJobDetailsPage,
  renderColumn,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.jobId" }),
      dataIndex: "job_id",
      key: "job_id",
      renderText: { isTextLink: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.designation" }),
      dataIndex: "designation",
      key: "designation",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.applicants" }),
      dataIndex: "number_of_applications",
      key: "number_of_applications",
      renderText: { isTextLink: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.scheduledInterviews" }),
      dataIndex: "number_of_interviews",
      key: "number_of_interviews",
      renderText: { isTextLink: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.activeInactive" }),
      dataIndex: "status",
      key: "status",
      renderChip: {
        visible: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.activeInactive" }),
      dataIndex: "approve",
      key: "approve",
      renderText: {
        visible: true,
        isBooleanHandlerKey: true,
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            label: intl.formatMessage({ id: "label.view_job_details" }),
          },
          {
            key: 2,
            label: intl.formatMessage({ id: "label.approve" }),
          },
        ],
        onMenuClick: (rowData) => goToJobDetailsPage(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};

export default getJobsColumn;
