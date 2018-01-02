import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotifBubbles from './notif_bubbles';
import { getNotifText } from '../../consts/utils';

const { ipcRenderer } = require('electron');

class Notifs extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }
  componentDidMount() {
    /*
     * In our container, which connected this component to redux,
     * we asked for auth state and said that we will dispatch notifs actions.
     * That's why we can access them as props in here.
     */
    const { fetchNotifs } = this.props;

    fetchNotifs();

    setInterval(() => {
      fetchNotifs();
    }, 10000);

    ipcRenderer.on('open_notif', () => { this.setState({ active: true }); });
  }
  componentDidUpdate(prevProps) {
    const prevNotifs = prevProps.notifs;
    if (
      !prevNotifs ||
      !this.props.notifs ||
      !this.props.auth.user
    ) {
      return;
    }
    const currentNotifs = this.props.notifs;
    const prevUnread = prevNotifs.num_unread;
    const currentUnread = currentNotifs.num_unread;
    const notifs = this.props.notifs;
    if (prevUnread < currentUnread) {
      const notif = notifs.items[0];
      const osNotif = {
        body: getNotifText(
          notif.type,
          notifs.username_map[notif.uid].name,
        ),
        id: notif.rant_id,
        content: notif,
      };
      this.props.openNotif(osNotif);
    }
  }
  toggleNotif(e) {
    if (e.target.className === 'notif_bubble_container') {
      this.setState({ active: !this.state.active });
    }
  }
  render() {
    const {
      notifs, auth, open, clearNotifs, theme,
    } = this.props;

    /* Wondering why there is notifs.notifs?
     * If you look at the default state, it looks like this:
     * const NOTIFS = { state: STATE.INITIAL, notifs: {} }
     * so in redux store, it's stored like this:
     * { ...other states, notifs: { state: STATE.INITIAL, notifs: {} } }
     * So in our container, when we ask redux for notifs, it actually gives
     * use this:
     * notifs: { state: STATE.INITIAL, notifs: {} }

     * Also, we check if notif actually exists by checking notifs.notifs.data
     * otherwise we don't show any numbers yet
     */
    if (!notifs || !auth.user) {
      return <div />;
    }
    return (
      <div
        className={`notifs_container ${this.state.active ? 'active' : ''}`}
        onClick={e => this.toggleNotif(e)}
      >
        <button
          className="notifs_ball"
          style={{ backgroundColor: theme.plus_notif ? theme.plus_notif.backgroundColor : '#D55161' }}
          onClick={() => { this.setState({ active: !this.state.active }); }}
        >
          <i className="ion-ios-bell" />
          <span
            className={`num_unread ${notifs.num_unread > 0 ? 'unread' : ''}`}
          >
            { notifs ? notifs.num_unread : '' }
          </span>
        </button>
        <div className={`notif_bubbles ${this.state.active ? 'active' : 'inactive'}`}>
          <button
            className="notifs_clear"
            onClick={() => { clearNotifs(); }}
          >Clear All
          </button>
          <NotifBubbles data={notifs} open={open} />
        </div>
        <div className={`notifs_bubbles_container ${this.state.active ? 'active' : ''}`} />
      </div>
    );
  }
}

Notifs.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fetchNotifs: PropTypes.func.isRequired,
  notifs: PropTypes.object,
  openNotif: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  clearNotifs: PropTypes.func.isRequired,
};

export default Notifs;
