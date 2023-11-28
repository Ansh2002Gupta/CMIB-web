import React from "react";
import AuthImage from "../components/AuthImage";
// will be replaced by view component injected through route
import { Outlet } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

function Auth() {
  return (
    <AuthLayout leftSection={<AuthImage />} rightSection={<Outlet />} /> // view component
  );
}

export default Auth;
