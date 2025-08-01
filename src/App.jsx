import React, { useState } from "react";
import OrderEntry from "./pages/OrderEntry";
import OrderSummary from "./pages/OrderSummary";
import OrderConfirmation from "./pages/OrderConfirmation";

const App = () => {
  const [phase, setPhase] = useState("entry");
  const [order, setOrder] = useState({ scoops: {}, toppings: {} });

  const resetOrder = () => {
    setOrder({ scoops: {}, toppings: {} });
    setPhase("entry");
  };

  return (
    <div>
      {phase === "entry" && (
        <OrderEntry
          order={order}
          setOrder={setOrder}
          nextPhase={() => setPhase("summary")}
        />
      )}
      {phase === "summary" && (
        <OrderSummary
          order={order}
          nextPhase={() => setPhase("confirmation")}
          prevPhase={() => setPhase("entry")}
        />
      )}
      {phase === "confirmation" && (
        <OrderConfirmation resetOrder={resetOrder} />
      )}
    </div>
  );
};

export default App;
