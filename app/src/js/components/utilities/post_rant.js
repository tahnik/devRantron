import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import SmartArea from '../utilities/smart_area';
import RantType from './rant_type';
import Loading from '../utilities/loading';
import { ITEM } from '../../consts/types';

class PostRant extends Component {
  constructor() {
    super();
    this.state = {
      rant_content: '',
      tags: '',
      limitCrossed: null,
      disabled: false,
    };
  }

  componentDidMount() {
    const { auth, item } = this.props;
    if (item.id === 0) {
      return;
    }
    const authToken = auth.user.authToken;
    rantscript.rant(item.id, authToken)
      .then((res) => {
        console.log(res);
        const rant = res.rant;
        console.log(rant.tags.join());
        this.setState({
          rant_content: rant.text,
          tags: rant.tags.join(),
        });
      });
  }

  editRant(text, image) {
    const { auth, item } = this.props;
    rantscript
      .postRant(text, this.state.tags, auth.user.authToken, image)
      .then((res) => {
        if (!res.success) {
          this.setState({ limitCrossed: res.error });
          return;
        }
        this.setState({
          posting: false,
          rant_content: '',
          tags: '',
          limitCrossed: null,
        });
        this.props.open(ITEM.RANT.NAME, res.rant_id);
      })
      .catch(() => {
        this.setState({ posting: false });
      });
  }

  onPost(text, image) {
    const { auth, item } = this.props;
    this.setState({ disabled: true });
    if (item.id === 0) {
      this.editRant(text, image);
      return;
    }
    rantscript
      .postRant(text, this.state.tags, auth.user.authToken, image)
      .then((res) => {
        if (!res.success) {
          this.setState({ limitCrossed: res.error });
          return;
        }
        this.setState({
          posting: false,
          rant_content: '',
          tags: '',
          limitCrossed: null,
        });
        this.props.open(ITEM.RANT.NAME, res.rant_id);
      })
      .catch(() => {
        this.setState({ posting: false });
      });
  }

  render() {
    const { auth, item } = this.props;
    if (item.id !== 0 && this.state.rant_content === '') {
      return (
        <div className="modal" >
          <Loading />
        </div>
      );
    }
    return (
      <div
        className="modal"
      >
        <div className="post_rant_container">
          <div className="post_rant">
            {/* @tahnik needs to hook dis up */}
            <RantType
              onSelect={type => console.log(type)}
            />
            <SmartArea
              onPost={(text, image) => this.onPost(text, image)}
              value={this.state.rant_content}
              onChange={text => this.setState({ rant_content: text })}
              disabled={this.state.disabled || auth.user === null}
              placeholder="The rant starts here..."
              tags={this.state.tags}
              maxChar={5000}
              editing={item.id !== 0}
              onTagsChange={tags => this.setState({ tags })}
            />
            <p>{this.state.limitCrossed || ''}</p>
          </div>
        </div>
      </div>
    );
  }
}


PostRant.propTypes = {
  auth: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

export default PostRant;
