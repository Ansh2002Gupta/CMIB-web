import React from "react";
import { TwoRow } from 'core/layouts';
import LogoComponent from "../../components/Logo";
import useResponsive from 'core/hooks/useResponsive'

import Styles from "./menu.module.scss";

function MenuContainer(props) {
    const responsive = useResponsive();
    return (
        responsive.isSm ? (
            <TwoRow
                className={Styles.sideMenuContainer}
                topSection={<LogoComponent />}
                bottomSection={null}
            />
        ) : (
            <TwoRow
                className={Styles.sideMenuContainer}
                bottomSection={null}
            />
        )
    );
}
export default MenuContainer;
