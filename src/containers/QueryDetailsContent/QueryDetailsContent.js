import React from "react";

import QueryDetailsContentTemplate from "./QueryDetailsContentTemplate";
import useTableColumns from "./controllers/useTableColumns";

const QueryDetailsContent = ({ type, data }) => {
  const { getLayout } = useTableColumns();

  return <QueryDetailsContentTemplate {...{ type, data, getLayout }} />;
};

export default QueryDetailsContent;
