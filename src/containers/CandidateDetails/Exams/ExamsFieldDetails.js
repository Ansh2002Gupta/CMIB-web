export const FOUNDATION_FIELD = (
  month,
  year,
  marks_in_per,
  rank_medal,
  foundation_attempt_count,
) =>{
  return [
    {
      id: 1,
      headingIntl: "month",
      label: "month",
      value: month,
    },
    {
      id: 2,
      headingIntl: "year",
      label: "year",
      value: year,
    },
    {
      id: 3,
      headingIntl: "marks_in_per",
      label: "marks_in_per",
      value: marks_in_per,
    },
    {
      id: 4,
      headingIntl: "rank_medal",
      label: "rank_medal",
      value: rank_medal,
    },
    {
      id: 5,
      headingIntl: "foundation_attempt_count",
      label: "foundation_attempt_count",
      value: foundation_attempt_count,
    },
  ]
}

export const INTER_AND_FINAL_FIELD = (
  month,
  year,
  marks_in_per,
  rank_medal,
) =>{
  return [
    {
      id: 1,
      headingIntl: "month",
      label: "month",
      value: month,
    },
    {
      id: 2,
      headingIntl: "year",
      label: "year",
      value: year,
    },
    {
      id: 3,
      headingIntl: "marks_in_per",
      label: "marks_in_per",
      value: marks_in_per,
    },
    {
      id: 4,
      headingIntl: "rank_medal",
      label: "rank_medal",
      value: rank_medal,
    },
  ]
}
