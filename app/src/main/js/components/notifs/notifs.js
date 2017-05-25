import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import { STATE } from '../../consts/types';
import Notification from './notif_bubble';

class Notifs extends Component {
  constructor() {
    super();
    this.state = {
      notifTimestamp: 1,
    };
  }
  componentDidMount() {
    /*
     * In our container, which connected this component to redux,
     * we asked for auth state and said that we will dispatch notifs actions.
     * That's why we can access them as props in here.
     */
    const { auth, fetchNotifs } = this.props;

    // Check if there's any authenticated user before doing anything
    if (auth.user) {
      /* We dispatch an action immedietly saying that notifs is loading
       * This may not be used now, might come handy in future
       */
      fetchNotifs(null, STATE.LOADING);


      rantscript
      .notifications(auth.user.authToken, this.state.notifTimestamp)
      .then((res) => {
        /*
         * We have got a successful response, let's dispatch to let
         * redux store know about it
         */
        fetchNotifs(res, STATE.SUCCESS);

        // We update our components state
        this.setState({ notifTimestamp: res.check_time });
      })
      .catch(() => {
        // Just in case it fails, we dispatch a failure
        fetchNotifs(null, STATE.FAILED);
      });
    }
  }
  render() {
    const { notifs } = this.props;

    /* Wondering why there is notifs.notifs?
     * If you look at the default state, it looks like this:
     * const NOTIFS = { state: STATE.INITIAL, notifs: {} }
     * so in redux store, it's stored like this:
     * { ...other states, notifs: { state: STATE.INITIAL, notifs: {} } }
     * So in our container, when we ask redux for notifs, it actually gives
     * use this:
     * notifs: { state: STATE.INITIAL, notifs: {} }
     *
     * Also, we check if notif actually exists by checking notifs.notifs.data
     * otherwise we don't show any numbers yet
     */
    const data = notifs.notifs.data;
    console.log(data)
    return (
      <div className="notifs_container" >
        <button><i className="ion-ios-bell" /></button>
        { /* data ? data.num_unread : null */ }
        <div className="notif_bubbles">
          {
            data ? data.items.map((notif, index) =>
              (<Notification
                notif={notif}
                index={index}
                key={`${notif.rant_id}_${notif.uid}_${notif.type}_${Math.random()}`}
                user={data.username_map[notif.uid]}
              />),
            ) : null
          }
        </div>
      </div>
    );
  }
}

Notifs.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchNotifs: PropTypes.func.isRequired,
  notifs: PropTypes.object.isRequired,
};

export default Notifs;
