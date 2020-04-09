import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import DetailViewer from './DetailViewer';


export default (props) => {
  props.auth();
  return (
    <React.Fragment>
      <ViewFrame title='Detail'>
        <Redirector />
        <DetailViewer postid={ props.match.params.postid } />
      </ViewFrame>
    </React.Fragment>
  );
}