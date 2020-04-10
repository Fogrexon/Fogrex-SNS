import React from 'react';
import { ViewFrame } from '../components/ViewComponents';
import SignUpForm from './Form';

export default (props) => {
  props.auth(props.match.url)();
  return (
    <React.Fragment>
      <ViewFrame title='SignUp'>
        <SignUpForm />
      </ViewFrame>
    </React.Fragment>
  );
}