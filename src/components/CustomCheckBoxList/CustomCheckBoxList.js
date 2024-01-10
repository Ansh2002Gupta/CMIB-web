import React from "react";

import styles from "./CustomCheckBoxList.module.scss";
import { PERMISION_AND_ROLE } from "../../constant/constant";

const CustomCheckBoxList = () => {
  return <div>
    {
        PERMISION_AND_ROLE?.map(item=>{
            return <div>
                {/* TDOD: complete this */}
            </div>
        })
    }
  </div>;
};

export default CustomCheckBoxList;
