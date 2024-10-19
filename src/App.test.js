import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
