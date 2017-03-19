import * as actions from '../../main/js/actions/list_actions'

describe('selectItem', () => {
		it('should pass the list item as an item to reducers', () => {
			const listItem = {
					name: 'Actions',
					description: 'Description for actions'
			};
			const expectedAction = {
					type: actions.ITEM_CLICKED,
					payload: listItem
			}
			expect(actions.selectItem(listItem)).toEqual(expectedAction)
		})
})


describe('getListItem', () => {
		it('should pass the id to the reducers to get an item', () => {
			const id = 'Action';
			const expectedAction = {
					type: actions.ITEM_VIEW,
					payload: id
			}
			expect(actions.getListItem(id)).toEqual(expectedAction)
		})
})