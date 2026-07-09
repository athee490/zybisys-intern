import { render, screen } from '@testing-library/react';
import App from './App';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';

afterEach(() => {
  localStorage.clear();
});

test('renders the login screen', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('shows the logged in user details in the profile', () => {
  localStorage.setItem('user', JSON.stringify({ name: 'Alice', email: 'alice@example.com' }));

  render(
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );

  expect(screen.getByText(/name/i)).toHaveTextContent('Name : Alice');
  expect(screen.getByText(/email/i)).toHaveTextContent('Email : alice@example.com');
});
