import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/Login', () => ({
  Login: () => <div>Login page</div>,
}));

jest.mock('./pages/AdminPanel', () => ({
  AdminPanel: () => <div>Admin panel</div>,
}));

beforeEach(() => {
  localStorage.clear();
});

test('shows the login page when there is no saved access token', () => {
  render(<App />);
  expect(screen.getByText('Login page')).toBeInTheDocument();
});

test('restores the admin session from a saved access token after refresh', () => {
  localStorage.setItem('access_token', 'saved-token');

  render(<App />);

  expect(screen.getByText('Admin panel')).toBeInTheDocument();
});
