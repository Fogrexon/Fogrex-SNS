import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import ReplyForm from './ReplyForm';


export default (props) => {
  props.auth();
  return (
    <React.Fragment>
      <ViewFrame title='Reply'>
        <Redirector />
        <ReplyForm postid={ props.match.params.postid } />
      </ViewFrame>
    </React.Fragment>
  );
}