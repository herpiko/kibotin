import React from 'react';
import { render } from '@testing-library/react';
import {Kibotin} from './Kibotin';

test('renders learn react link', () => {
  const { getByText } = render(<Kibotin />);
  const linkElement = getByText(/Kibotin/i);
  expect(linkElement).toBeInTheDocument();
});
