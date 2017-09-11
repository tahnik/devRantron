import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SmallToast from '../../../components/utilities/toast/small';


const Toast = ({ toast }) => (
  <div>
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      { toast.isVisible ? <SmallToast toastText={toast.text} /> : null}
    </CSSTransitionGroup>
  </div>
);

const mapStateToProps = state => ({
  toast: state.toast,
});

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Toast);
