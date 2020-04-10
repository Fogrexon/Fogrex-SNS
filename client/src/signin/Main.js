import React from 'react';
import { ViewFrame } from '../components/ViewComponents';
import SignInForm from './Form';


export default (props) => {
  props.auth(props.match.url)();
  return (
    <React.Fragment>
      <ViewFrame title='SignIn'>
        <SignInForm />
      </ViewFrame>
    </React.Fragment>
  );
}