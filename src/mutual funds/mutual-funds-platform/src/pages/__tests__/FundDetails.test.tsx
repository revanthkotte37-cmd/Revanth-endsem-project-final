import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FundDetails from '../FundDetails';

describe('FundDetails', () => {
  test('renders header and Invest button', () => {
    render(
      <BrowserRouter>
        <FundDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/Large Cap Growth Fund/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Invest/i })).toBeInTheDocument();
  });
});
