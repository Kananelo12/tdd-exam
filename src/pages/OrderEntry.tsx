import { useEffect, useState } from 'react';
import scoopsJson from '../data/scoops.json';
import toppingsJson from '../data/toppings.json';
import type { ScoopData, ToppingData, OrderEntryProps } from '../types';

export default function OrderEntry({
  order,
  setOrder,
  nextPhase
}: OrderEntryProps) {
  const [scoopsData, setScoopsData] = useState<ScoopData[]>([]);
  const [toppingsData, setToppingsData] = useState<ToppingData[]>([]);

  useEffect(() => {
    setScoopsData(scoopsJson as ScoopData[]);
    setToppingsData(toppingsJson as ToppingData[]);
  }, []);

  const handleScoopChange = (name: string, value: string) => {
    const count = parseInt(value) || 0;
    setOrder(prev => ({
      ...prev,
      scoops: { ...prev.scoops, [name]: count },
    }));
  };

  const handleToppingChange = (name: string, checked: boolean) => {
    setOrder(prev => ({
      ...prev,
      toppings: { ...prev.toppings, [name]: checked },
    }));
  };

  return (
    <div>
      <h2>Design Your Sundae!</h2>
      {scoopsData.map(item => (
        <div key={item.name}>
          <label htmlFor={item.name}>{item.name}</label>
          <input
            id={item.name}
            role="spinbutton"
            type="number"
            value={order.scoops[item.name] ?? ''}
            onChange={e => handleScoopChange(item.name, e.target.value)}
          />
        </div>
      ))}

      {toppingsData.map(item => (
        <div key={item.name}>
          <label htmlFor={item.name}>
            <input
              id={item.name}
              role="checkbox"
              type="checkbox"
              checked={order.toppings[item.name] ?? false}
              onChange={e => handleToppingChange(item.name, e.target.checked)}
            />
            {item.name}
          </label>
        </div>
      ))}

      <button onClick={nextPhase}>Order Sundae</button>
    </div>
  );
}
