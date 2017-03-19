import React from 'react'
import {shallow} from 'enzyme'
import Header from '../../main/js/components/header'

function setup() {
		const enzymeWrapper = shallow(<Header />)

		return enzymeWrapper;
}

describe('components', () => {
		describe('Header', () => {
				it('should render self and subcomponents', () => {
					const enzymeWrapper = setup();

					expect(enzymeWrapper.find('h1').text()).toBe('React Redux Router');

				})
		})
})