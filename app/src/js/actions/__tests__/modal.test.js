import { openModal, closeModal } from '../modal';
import { MODAL } from '../../consts/types';
import createMockStore from './utils/create-mock-store' ;

describe('[Action] modal', () => {
  describe('openModal', () => {
    it('should dispatch the proper action', () => {
      const mockStore = createMockStore();
      const store = mockStore({});

      const expected = {
        type: MODAL.OPEN,
        item: {
          type: 'rant',
          id: 1,
          data: {
            test: 'test',
          },
        },
      };

      store.dispatch(openModal('rant', 1, { test: 'test' }));
      expect(store.getActions()).toEqual([expected]);
    });
  });
  describe('closeModal', () => {
    it('should dispatch the proper action', () => {
      const mockStore = createMockStore();
      const store = mockStore({});

      const expected = {
        type: MODAL.CLOSE,
        item: null,
      };

      store.dispatch(closeModal());
      expect(store.getActions()).toEqual([expected]);
    });
  });
});
