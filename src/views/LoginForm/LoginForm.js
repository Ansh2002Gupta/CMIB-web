import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useIntl } from "react-intl";
import { Button, Space, Typography, Input } from "antd";
import { Base } from "core/layouts";
import { AuthContext } from "../../globalContext/auth/authProvider";
import { setAuth } from "./../../globalContext/auth/authActions";
import { AuthService } from "./../../services";
import Styles from "./loginForm.module.scss";

export function useLoginForm(initialState = {}) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: initialState.username || "",
    password: initialState.password || "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [, authDispatch] = useContext(AuthContext);
  const onLogin = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    const response = await AuthService.login(formValues);
    authDispatch(setAuth(response));
    setIsProcessing(false);
    navigate("/");
  };
  return {
    formValues,
    setFormValues,
    onLogin,
    isProcessing,
  };
}

function LoginForm(props) {
  const intl = useIntl();
  const { formValues, setFormValues, onLogin, isProcessing } = useLoginForm();
  const { username, password } = formValues || {};
  const isLoginActionDisabled =
    !username.trim() || !password.trim() || isProcessing;
  return (
    <Base>
      <div className={Styles.loginForm}>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Typography>{intl.formatMessage({ id: "signIn" })}</Typography>
          <Input
            placeholder={intl.formatMessage({ id: "username" })}
            value={username}
            onChange={(e) => {
              setFormValues((v) => {
                v.username = e.target.value;
                return { ...v };
              });
            }}
          />
          <Input
            type="password"
            placeholder={intl.formatMessage({ id: "password" })}
            value={password}
            onChange={(e) => {
              setFormValues((v) => {
                v.password = e.target.value;
                return { ...v };
              });
            }}
          />
          <Button
            onClick={() => {
              onLogin();
            }}
            type="primary"
            disabled={isLoginActionDisabled}
          >
            {intl.formatMessage({ id: "login" })}
          </Button>
        </Space>
      </div>
    </Base>
  );
}

export default LoginForm;
