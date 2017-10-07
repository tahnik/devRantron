import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import SmartArea from '../utilities/smart_area';
import RantType from './rant_type';
import Loading from '../utilities/loading';
import { ITEM } from '../../consts/types';
import Popup from '../utilities/popup';

class PostRant extends Component {
  constructor() {
    super();
    this.state = {
      rant_content: '',
      tags: '',
      limitCrossed: null,
      disabled: false,
      popup: {
        visible: false,
        className: '',
        pos: 'Ok',
        body: '',
      },
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
        const rant = res.rant;
        this.setState({
          rant_content: rant.text,
          tags: rant.tags.join(),
        });
      });
  }

  editRant(text) {
    const { auth, item } = this.props;
    rantscript
      .editRant(text, this.state.tags, item.id, auth.user.authToken)
      .then((res) => {
        if (!res.success) {
          this.setState({ popup:
            { ...this.state.popup, body: res.error, visible: true, className: '' },
          });
          return;
        }
        this.setState({
          posting: false,
          rant_content: '',
          tags: '',
          limitCrossed: null,
        });
        this.props.open(ITEM.RANT.NAME, item.id);
      })
      .catch(() => {
        this.setState({ posting: false });
      });
  }

  onPost(text, image) {
    const { auth, item } = this.props;
    if (item.id !== 0) {
      this.editRant(text);
      return;
    }
    rantscript
      .postRant(text, this.state.tags, 1, auth.user.authToken, image)
      .then((res) => {
        if (!res.success) {
          this.setState({ popup:
            { ...this.state.popup, body: res.error, visible: true, className: '' },
          });
          return;
        }
        this.setState({
          posting: false,
          rant_content: '',
          tags: '',
          limitCrossed: null,
          disabled: true,
        });
        this.props.open(ITEM.RANT.NAME, res.rant_id);
      })
      .catch(() => {
        this.setState({ posting: false });
      });
  }

  render() {
    const { auth, item } = this.props;
    const { popup } = this.state;
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
          <Popup
            {...popup}
            onPos={() => {
              this.setState({ popup: { ...this.state.popup, className: 'closeAnim' } });
              setTimeout(() => {
                this.setState({ popup: { ...this.state.popup, visible: false } });
              }, 300);
            }}
          />
          <div className="post_rant">
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
          </div>
          <div className="utils" >
            <RantType
              onSelect={type => console.log(type)}
            />
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
