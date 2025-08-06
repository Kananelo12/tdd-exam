export interface ScoopData {
    name: string;
    imagePath: string;
}

export interface ToppingData {
    name: string;
    imagePath: string;
}

export interface Order {
    scoops: Record<string, number>;
    toppings: Record<string, boolean>;
}

export interface OrderEntryProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  nextPhase: () => void;
}

export interface OrderSummaryProps {
  order: Order;
  prevPhase: () => void;
  nextPhase: () => void;
}

export interface OrderConfirmationProps {
  resetOrder: () => void;
}