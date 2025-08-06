import "@testing-library/jest-dom";

// mock data for scoops and toppings
const mockScoopData = [
  { name: "Strawberry", imagePath: "/images/strawberry.png" },
  { name: "Mint", imagePath: "/images/mint.png" },
];

const mockToppingsData = [
  { name: "Sprinkles", imagePath: "/images/sprinkles.png" },
  { name: "Gummy Gears", imagePath: "/images/gummy-bears.png" },
  { name: "Caramel", imagePath: "/images/caramel.png" },
];

// A tiny helper to delay in tests
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stub fetch globally in tests, with a small delay on the POST
globalThis.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const url = input.toString();

  // Get scoops and resolve immmediately
  if (url.endsWith("/scoops")) {
    return new Response(JSON.stringify(mockScoopData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Get toppings and resolve immmediately
  if (url.endsWith("/toppings")) {
    return new Response(JSON.stringify(mockToppingsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // POST order: delay so Loading appears
  if (url.endsWith("/order") && init?.method === "POST") {
    // simulate network lag
    await delay(50);

    return new Response(JSON.stringify({ orderNumber: 777777 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  throw new Error(`Unhandled fetch to ${url}`);
};
