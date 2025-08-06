import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  // Render app
  render(<App />);

  // Add ice cream scoops and toppings
  const strawberryInput = await screen.findByRole("spinbutton", {
    name: /strawberry/i,
  });
  await user.clear(strawberryInput);
  await user.type(strawberryInput, "1");

  const mintInput = await screen.findByRole("spinbutton", { name: /mint/i });
  await user.clear(mintInput);
  await user.type(mintInput, "2");

  const sprinklesCheckbox = await screen.findByRole("checkbox", {
    name: /sprinkles/i,
  });
  await user.click(sprinklesCheckbox);

  // Find and click order button
  await user.click(screen.getByRole("button", { name: /order sundae/i }));

  // Check summary information based on order
  expect(
    screen.getByRole("heading", { name: /order summary/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Scoops: R6.00" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Toppings: R1.50" })
  ).toBeInTheDocument();
  expect(screen.getByText("1 Strawberry")).toBeInTheDocument();
  expect(screen.getByText("2 Mint")).toBeInTheDocument();
  expect(screen.getByText("Sprinkles")).toBeInTheDocument();

  // Accept terms and conditions and click button to confirm order
  await user.click(
    screen.getByRole("checkbox", { name: /terms and conditions/i })
  );

  // Confirm order number on confirmation page
  await user.click(screen.getByRole("button", { name: /confirm order/i }));
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  const thankYou = await screen.findByRole("heading", { name: /thank you/i });

  expect(thankYou).toBeInTheDocument();
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  expect(await screen.findByText(/order number:/i)).toBeInTheDocument();

  // Click new order button on confirmation page
  await user.click(screen.getByRole("button", { name: /new order/i }));

  // Check that scoops and toppings subtotal have been reset
  expect(
    await screen.findByRole("spinbutton", { name: "Strawberry" })
  ).toHaveValue(null);
  expect(screen.getByRole("spinbutton", { name: "Mint" })).toHaveValue(null);
});
