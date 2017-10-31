import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import Routes from './Routes';
import Navbar from './Navbar';

describe('<Routes />', () => {
    const testState = {
        user: {
            id: 1
        },
        products: []
    }
    const store = createMockStore(testState)
  it('renders one <Navbar /> component', () => {
    const wrapper = shallow(<Routes />, {
        context: {
            store: store
        }
    });
    expect(wrapper.dive().find(Navbar)).to.have.length(1);
  });
});