import React from 'react';

import {Header, Contents} from '../components/ViewComponents';
import SignUpForm from './Form';

export default (props) => {
  return (
    <React.Fragment>
      <Header title='SignUp'/>
      <Contents>
        <SignUpForm />
      </Contents>
    </React.Fragment>
  );
}