import React from 'react';
import { Redirect } from "react-router-dom";

import { handleAuthentication } from '../services/auth';

const Callback = (props) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    handleAuthentication();
  }

  return (
    <Redirect to="/" />
  )
}

export default Callback;
