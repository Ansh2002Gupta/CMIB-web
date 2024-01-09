import moment from "moment";

const useTableColumns = () => {
  const getLayout = (type, data) => {
    if (type === "company") {
      return [
        {
          key: "1",
          label: `Company Name`,
          children: data?.name,
        },
        {
          key: "2",
          label: `Non-registered Student/Company`,
          children: `Non-registered Company`,
        },
        {
          key: "3",
          label: `Query Type`,
          children: data?.query_type,
        },
        {
          key: "4",
          label: `Query`,
          span: 3,
          children: data?.query,
        },
        {
          // TODO: Please remove hardcode value once this value starts coming from API,
          key: "5",
          label: `Entity`,
          children: "Firm of Chartered Accountants",
        },
        {
          key: "6",
          label: `Firm Registration No. [FRN]`,
          children: data?.firm_registration_number,
        },
        {
          key: "7",
          label: `Partners (No.) *`,
          children: data?.partners_number || 0,
        },
        {
          key: "8",
          label: `Current Industry`,
          children: data?.current_industry,
        },
        {
          key: "9",
          label: `Contact Person Name`,
          children: data?.contact_person_name,
        },
        {
          key: "10",
          label: `Contact Person Designation`,
          children: data?.contact_person_designation,
        },
        {
          key: "10",
          label: `Mobile Number`,
          children: data?.mobile,
        },
        {
          key: "11",
          label: `Email ID`,
          children: data?.email,
        },
        {
          key: "12",
          label: `Date Created On`,
          children: moment(new Date(data?.created_at)).format("DD/MM/YYYY"),
        },
      ];
    }

    return [
      {
        key: "1",
        label: `Student Name`,
        children: data?.name,
      },
      {
        // TODO: please confirm that this data will shown as it is or require some changes.
        key: "2",
        label: `Non-registered Student/Company`,
        children: `Non-registered Student`,
      },
      {
        key: "3",
        label: `Query Type`,
        children: data?.query_type,
      },
      {
        key: "4",
        label: `Query`,
        span: 3,
        children: data?.query,
      },
      {
        key: "5",
        label: `Mobile Number`,
        children: data?.mobile,
      },
      {
        key: "6",
        label: `Email ID`,
        children: data?.email,
      },
      {
        key: "7",
        label: `Date Created On`,
        children: moment(new Date(data?.created_at)).format("DD/MM/YYYY"),
      },
    ];
  };

  return {
    getLayout,
  };
};

export default useTableColumns;
