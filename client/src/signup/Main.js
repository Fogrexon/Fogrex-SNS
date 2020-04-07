import React from 'react';
import { ViewFrame } from '../components/ViewComponents';
import SignUpForm from './Form';

export default (props) => {
  return (
    <React.Fragment>
      <ViewFrame title='SignUp'>
        <SignUpForm />
      </ViewFrame>
    </React.Fragment>
  );
}