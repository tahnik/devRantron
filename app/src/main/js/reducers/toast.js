import { ADD_TOAST, REMOVE_TOAST } from '../consts/toast';

const DEFAULT_STATE = [];


/* eslint-disable */
/*
 * Feel free to change this with something much simpler.
 * I need to get this done - TM
 */
function generateUUID() { // Public Domain/MIT
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
/* eslint-enable */

function removeToast(toasts, id) {
  const arrayLength = toasts.length;
  let removedToasts = toasts.slice();
  for (let i = 0; i < arrayLength; i++) {
    if (toasts[i].id === id) {
      removedToasts.splice(i, 1);
    }
  }
  return removedToasts;
}

export default function toast(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_TOAST:
      action.toast.id = generateUUID(); // eslint-disable-line
      return [...state, action.toast];
    case REMOVE_TOAST:
      return removeToast(state, action.id);
    default:
      return state;
  }
}
