import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CompaniesList from "../../containers/Companies/CompaniesList/CompaniesList";
import styles from "./Candidates.module.scss";
import CandidateHeader from "../../containers/Candidate/CandidateHeader";
import CandidateContent from "../../containers/Candidate/CandidateList";

const Candidates = () => {
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<CandidateHeader />}
      bottomSection={<CandidateContent />}
    />
  );
};

export default Candidates;
