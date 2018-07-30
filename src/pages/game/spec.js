import React from 'react';
import ReactDOM from 'react-dom';
import GamePage from './GamePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
