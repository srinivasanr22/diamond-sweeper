import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders React App', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/The goal of this exercise is to build a Diamond Sweeper game...!/i);
  expect(linkElement).toBeInTheDocument();
});
