import "@testing-library/jest-dom";

const mockScoopData = [
  { name: "Chocolate", imagePath: "/images/chocolate.png" },
  { name: "Vanilla",   imagePath: "/images/vanilla.png"   },
];

const mockToppingData = [
  { name: "Cherries",  imagePath: "/images/cherries.png" },
  { name: "M&Ms",      imagePath: "/images/mms.png"      },
  { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
];

// A tiny helper to delay in tests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Stub fetch globally in tests, with a small delay on the POST
globalThis.fetch = async (url, options) => {
  // GET scoops: resolve immediately
  if (url.endsWith("/scoops")) {
    return {
      ok: true,
      json: async () => mockScoopData,
    };
  }

  // GET toppings: resolve immediately
  if (url.endsWith("/toppings")) {
    return {
      ok: true,
      json: async () => mockToppingData,
    };
  }

  // POST order: delay so Loading appears
  if (url.endsWith("/order") && options?.method === "POST") {
    // simulate network lag
    await delay(50);
    return {
      ok: true,
      json: async () => ({ orderNumber: 777777 }),
    };
  }

  throw new Error(`Unhandled fetch to ${url}`);
};
