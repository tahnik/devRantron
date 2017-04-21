import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeToast } from '../../../actions/toast';

class SmallToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
    setTimeout(() => {
      this.setState({ opacity: 0 });
      setTimeout(() => {
        this.props.removeToast(this.props.toast.id);
      }, 500);
    }, this.props.toast.timeout);
  }
  render() {
    return (
      <div className="small_toast" style={{ opacity: this.state.opacity }} >
        { this.props.toast.text }
      </div>
    );
  }
}

SmallToast.propTypes = {
  removeToast: React.PropTypes.func.isRequired,
  toast: React.PropTypes.object.isRequired,
};


export default connect(null, { removeToast })(SmallToast);
