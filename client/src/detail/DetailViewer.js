import React from 'react';
import axios from 'axios';
import Post from '../timeline/Post';

import Authentication from '../components/Authentication';

export default class DetailViewer extends React.Component {

  static contextType = Authentication;

  constructor(props)
  {
    super(props);
    this.prevContext = this.context;
    this.state = {
      post: null,
    };
  }
  componentDidUpdate() {
    if(this.prevContext !== this.context) {
      this.tick();
      this.prevContext = this.context;
    }
  }

  tick() {
    if(!this.context) return;
    axios
      .get(`/api/post/${this.props.postid}`)
      .then((res) => {
        if(res.status !== 200) return;
        this.setState({
          post: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  render(){
    if(!this.state.post) {
      return (
        <React.Fragment>
          {'Loading...'}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {!!this.state.post.reply ? <Post key='replypost' post={this.state.post.reply} me={this.context.username} disableActions /> : null}
        <Post key='mainpost' post={this.state.post} me={this.context.username} />
        { 
          this.state.post.replied.map(post => {
            return (
              <React.Fragment key={post.id} >
                <Post post={post} me={this.context.username} isReply />
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}
