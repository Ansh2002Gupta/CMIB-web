import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router'
import { AuthContext } from "../globalContext/auth/authProvider";


function withPrivateAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (_.isEmpty(authState)) {
        navigate('/login')
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState])

    if (_.isEmpty(authState)) {
      return null
    }
    return (
      <Component {...props}  />
    )
  }
}

export default withPrivateAccess
