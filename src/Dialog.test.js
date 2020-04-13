
import React from 'react';
import Dialog from './Dialog';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'


test('renders one and only 1 dialog role ', () => {
  render(<Dialog handleSubmit={() => null} handleClose={() => null} open={true} submitResult={{
    registered: false,
    errMessage: ""
  }}/>);
  const dialogContainer = screen.queryAllByRole("dialog");
  expect(dialogContainer.length).toBe(1);
});
