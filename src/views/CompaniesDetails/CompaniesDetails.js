import React from "react";
import { useParams } from "react-router-dom";

const CompaniesDetails = () => {
  const { companyId } = useParams();

  return <div>Companies details {companyId}</div>;
};

export default CompaniesDetails;
