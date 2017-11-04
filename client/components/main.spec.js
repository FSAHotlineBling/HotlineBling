import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import Routes from '../routes';
import Main from './main';
import AllUsers from './AllUsers'

describe('<Routes />', () => {
    const testState = {
        user: {
            id: 1
        },
        products: []
    }
    const store = createMockStore(testState)
  it('renders one <nav /> component', () => {
    const wrapper = shallow(<Routes />, {
        context: {
            store: store
        }
    });
    expect(wrapper.dive().find(Main)).to.have.length(1);
  });

  it('renders one <login /> component', () => {
    const wrapper = shallow(<Routes />, {
        context: {
            store: store
        }
    });
    expect(wrapper.dive().find(Main)).to.have.length(1);
  });
});
