import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import MyInfo from './MyInfo';


export default (props) => {
  props.auth();
  return (
    <React.Fragment>
      <ViewFrame title='Me'>
        <Redirector />
        <MyInfo />
      </ViewFrame>
    </React.Fragment>
  );
}