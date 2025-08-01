import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

test('Order phases for happy path', async () => {
  const user = userEvent.setup();
  render(<App />);

  // — Entry Phase —
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  await user.click(cherriesCheckbox);

  await user.click(screen.getByRole('button', { name: /order sundae/i }));

  // — Summary Phase —
  expect(screen.getByRole('heading', { name: /order summary/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Scoops: $6.00' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Toppings: $1.50' })).toBeInTheDocument();
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }));
  await user.click(screen.getByRole('button', { name: /confirm order/i }));

  // — Confirmation Phase —
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  const thankYou = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYou).toBeInTheDocument();
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  expect(await screen.findByText(/order number:/i)).toBeInTheDocument();

  // — New Order —
  await user.click(screen.getByRole('button', { name: /new order/i }));
  // Back at entry: totals reset
  expect(await screen.findByRole('spinbutton', { name: 'Vanilla' })).toHaveValue(null);
  expect(screen.getByRole('spinbutton', { name: 'Chocolate' })).toHaveValue(null);
});
