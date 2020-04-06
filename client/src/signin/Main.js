import React from 'react';
import {Header, Contents} from '../components/ViewComponents';
import SignInForm from './Form';


export default (props) => {
  return (
    <React.Fragment>
      <Header title='SignIn'/>
      <Contents>
        <SignInForm />
      </Contents>
    </React.Fragment>
  );
}