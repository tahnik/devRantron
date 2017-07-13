import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';

class PostRant extends Component {
  constructor() {
    super();
    this.state = {
      rant_content: '',
      tags: '',
      posting: false,
      limitCrossed: false,
    };
  }
  onPost() {
    const { auth } = this.props;
    this.setState({ posting: true });
    rantscript
    .postRant(this.state.rant_content, this.state.tags, auth.user.authToken)
    .then((res) => {
      if (!res.success) {
        this.setState({ limitCrossed: true });
      }
      this.setState({ posting: false, rant_content: '', tags: '' });
    })
    .catch(() => {
      this.setState({ posting: false });
    });
  }
  render() {
    return (
      <div
        className="modal"
      >
        <div className="post_rant_container">
          <div className="post_rant">
            <textarea
              onChange={e => this.setState({ rant_content: e.target.value })}
              value={this.state.rant_content}
              className="rant_content"
            />
            <textarea
              onChange={e => this.setState({ tags: e.target.value })}
              value={this.state.tags}
              placeholder="Tags"
              className="tags"
            />
            <div className="post">
              <button
                onClick={() => this.onPost()}
                disabled={this.state.posting}
              >Post Rant</button>
            </div>
            { this.state.limitCrossed ? <p>Right now you can only add 1 rant every 2 hours
               (every 1 hour for devRant++ members) because we want
                to make sure everyones content gets good exposure! Please contact
                 info@devrant.io if you have any questions :)</p> : null}
          </div>
        </div>
      </div>
    );
  }
}


PostRant.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PostRant;
