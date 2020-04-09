import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import MyInfo from './MyInfo';


export default (props) => {
  return (
    <React.Fragment>
      <ViewFrame title='Me'>
        <Redirector />
        <MyInfo />
      </ViewFrame>
    </React.Fragment>
  );
}