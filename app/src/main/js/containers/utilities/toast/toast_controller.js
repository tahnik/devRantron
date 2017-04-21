import React, { Component } from 'react';
import { connect } from 'react-redux';
import SmallToast from './small_toast';

class Toast extends Component {
  render() {
    return (
      <div className="toast_container" >
        {
          this.props.toasts.map(toast => (
            <SmallToast toast={toast} key={toast.id} />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toasts: state.toast,
  };
}

Toast.propTypes = {
  toasts: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps, null)(Toast);
