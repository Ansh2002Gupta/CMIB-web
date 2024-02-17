import { CENTRE_TYPE } from "../../../constant/constant";
import { ALPHANUMERIC_REGEX } from "../../../constant/regex";

export const FIELDS = (centreName, bigSmallCentre, centreId) => {
  return [
    {
      id: 1,
      headingIntl: "centreName",
      label: "centre_name",
      value: centreName,
      rules: [
        {
          required: true,
          message: "Please enter Centre Name",
        },
      ],
    },
    {
      id: 2,
      headingIntl: "bigSmallCentre",
      label: "centre_type",
      value: bigSmallCentre,
      selectOptions: CENTRE_TYPE,
      rules: [
        {
          required: true,
          message: "Please select Center Type",
        },
      ],
    },
    {
      id: 3,
      headingIntl: "centreCode",
      label: "centre_code",
      value: centreId,
      rules: [
        {
          required: true,
          message: "Please enter Centre Id",
        },
        {
          pattern: ALPHANUMERIC_REGEX,
          message: "Please enter valid Centre Id",
        },
      ],
    },
  ];
};
