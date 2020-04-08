import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import ReplyForm from './ReplyForm';


export default (props) => {
  return (
    <React.Fragment>
      <ViewFrame title='Reply'>
        <Redirector />
        <ReplyForm postid={ props.match.params.postid } />
      </ViewFrame>
    </React.Fragment>
  );
}