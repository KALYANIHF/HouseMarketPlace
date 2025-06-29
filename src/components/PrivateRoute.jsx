import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function PrivateRoute() {
  const navigate = useNavigate();
  const loggedIn = true;
  useEffect(() => {
    if (!loggedIn) {
      navigate("/signin");
    }
  }, [loggedIn]);
  return <Outlet />;
}

export default PrivateRoute;
