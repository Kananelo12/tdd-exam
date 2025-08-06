import { useEffect, useState } from 'react';
import type { OrderConfirmationProps } from '../types';

export default function OrderConfirmation({
  resetOrder
}: OrderConfirmationProps) {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:3030/order", {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setOrderNumber(data.orderNumber);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <div>
      <h1>Thank You</h1>
      <p>Order Number: {orderNumber}</p>
      <button onClick={resetOrder}>New Order</button>
    </div>
  );
}
