import defaultStates from '../../consts/default_states';
import { NOTIFS } from '../../consts/types';
import reduce from '../notifs';

const defaultState = defaultStates.notifs;

describe('[Reducer] notifs', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle FETCH', () => {
    const action = {
      type: NOTIFS.FETCH,
      notifs: [
        {
          created_time: 1,
          type: 'content_vote',
          read: 0,
          rant_id: 1,
          uid: 1,
        },
      ],
    };

    const newState = reduce(defaultState, action);
    const expected = [
      {
        created_time: 1,
        type: 'content_vote',
        read: 0,
        rant_id: 1,
        uid: 1,
      },
    ];

    expect(newState).toEqual(expected);
  });
  it('should handle CLEARALL', () => {
    const action = {
      type: NOTIFS.CLEARALL,
    };

    const newState = reduce(defaultState, action);
    const expected = {
      num_unread: 0,
    };

    expect(newState).toEqual(expected);
  });
});
