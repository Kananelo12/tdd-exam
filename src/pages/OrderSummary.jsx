import React, { useState } from 'react';

export default function OrderSummary({ order, prevPhase, nextPhase }) {
  const [agreed, setAgreed] = useState(false);
  // $2 per scoop, $1.50 per topping
  const scoopsTotal   = Object.values(order.scoops).reduce((sum, qty) => sum + qty * 2, 0);
  const toppingsTotal = Object.values(order.toppings).filter(v => v).length * 1.5;

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: ${scoopsTotal.toFixed(2)}</h2>
      <h2>Toppings: ${toppingsTotal.toFixed(2)}</h2>
      <ul>
        {Object.entries(order.scoops).map(([name, qty]) => qty > 0 && <li key={name}>{qty} {name}</li>)}
        {Object.entries(order.toppings).map(([name, checked]) => checked && <li key={name}>{name}</li>)}
      </ul>

      <label htmlFor="tc">
        <input
          id="tc"
          type="checkbox"
          role="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
        />
        I agree to Terms and Conditions
      </label>

      <div>
        <button onClick={prevPhase}>Back</button>
        <button onClick={nextPhase} disabled={!agreed}>Confirm Order</button>
      </div>
    </div>
  );
}
