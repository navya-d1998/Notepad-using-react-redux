import App from '../src/components/pages/Login';
import Renderer from 'react-test-renderer';
import React from 'react';
test('renders learn react link', () => {

const component = Renderer.create(

<App />
);

let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
  
});
