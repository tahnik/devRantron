import React from 'react';
import { connect } from 'react-redux';
import SmallToast from './small_toast';

function Toast(props) {
  return (
    <div className="toast_container" >
      {
        props.toasts.map(toast => (
          <SmallToast toast={toast} key={toast.id} />
        ))
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toasts: state.toast,
  };
}

Toast.propTypes = {
  toasts: React.PropTypes.array.isRequired,
};


export default connect(mapStateToProps, null)(Toast);
