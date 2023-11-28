import React, { useContext } from "react";
import { TwoColumn } from 'core/layouts';
import ThemeSwitcher from "../../components/ThemeSwitcher";
import HeaderName from "../../components/HeaderName";
import Styles from './header.module.scss'
import { AuthContext } from "../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from './../../globalContext/auth/authActions'

function useHeader() {
    const [, authDispatch] = useContext(AuthContext);

    const onLogout = () => {
      authDispatch(clearAuthAndLogout());
    }

    return {
      onLogout
    }
}

function HeaderContainer(props) {
    const { onLogout } = useHeader()
    return (
        <TwoColumn
            className={Styles.headerContainer}
            leftSection={<HeaderName />}
            rightSection={(
              <div className="flex alignCenter">
                <ThemeSwitcher />
                <div style={{ cursor: 'pointer' }} onClick={onLogout}>Logout</div>
              </div>
            )}
        />
    );
}
export default HeaderContainer;
