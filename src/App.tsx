import React, { useState } from 'react';
import OrderEntry from './pages/OrderEntry';
import OrderSummary from './pages/OrderSummary';
import OrderConfirmation from './pages/OrderConfirmation';
import type { Order } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'entry'|'summary'|'confirmation'>('entry');
  const [order, setOrder] = useState<Order>({ scoops: {}, toppings: {} });

  const resetOrder = () => {
    setOrder({ scoops: {}, toppings: {} });
    setPhase('entry');
  };

  return (
    <div>
      {phase === 'entry' && (
        <OrderEntry
          order={order}
          setOrder={setOrder}
          nextPhase={() => setPhase('summary')}
        />
      )}
      {phase === 'summary' && (
        <OrderSummary
          order={order}
          prevPhase={() => setPhase('entry')}
          nextPhase={() => setPhase('confirmation')}
        />
      )}
      {phase === 'confirmation' && (
        <OrderConfirmation resetOrder={resetOrder} />
      )}
    </div>
  );
};

export default App;
