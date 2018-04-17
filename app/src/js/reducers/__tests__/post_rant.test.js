import defaultStates from '../../consts/default_states';
import { POST_RANT } from '../../consts/types';
import reduce from '../post_rant';

const defaultState = defaultStates.postRant;

describe('[Reducer] post_rants', () => {
  it('should return the default state', () => {
    const newState = reduce(defaultState, {});
    expect(newState).toEqual(defaultState);
  });
  it('should handle ADD_DRAFT', () => {

  });
  it('should handle REMOVE_DRAFT', () => {
    const drafts = [
      { name: '1' },
      { name: '2' },
    ];
    const state = { drafts };

    const action = {
      type: POST_RANT.REMOVE_DRAFT,
      name: '2',
    };

    const newState = reduce(state, action);
    const expected = {
      drafts: [{ name: '1' }],
    };

    expect(newState).toEqual(expected);
  });
  it('should handle AUTOSAVE.SAVE', () => {
    const action = {
      type: POST_RANT.AUTOSAVE.SAVE,
      rant: {
        content: 'content',
        tags: 'tag',
      },
    };

    const newState = reduce(defaultState, action);
    const expected = {
      autoSave: { content: 'content', tags: 'tag' },
      drafts: [],
    }

    expect(newState).toEqual(expected);
  });
  it('should handle AUTOSAVE.CLEAR', () => {
    const state = {
      autoSave: { content: 'content', tags: 'tag' },
      drafts: [],
    };
    const action = {
      type: POST_RANT.AUTOSAVE.CLEAR,
    };

    const newState = reduce(state, action);
    const expected = {
      autoSave: '',
      drafts: [],
    };

    expect(newState).toEqual(expected);
  });
});
