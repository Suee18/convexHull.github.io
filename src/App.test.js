import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-chartjs-2', () => {
  const ReactModule = require('react');
  return {
    Scatter: ReactModule.forwardRef(function MockScatter(_, ref) {
      return ReactModule.createElement('div', { ref, 'data-testid': 'scatter-chart' });
    })
  };
});

test('renders the educational landing page and visualizer', () => {
  render(<App />);

  expect(screen.getByText(/find the shape/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /build your own convex hull/i })).toBeInTheDocument();
  expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
});
