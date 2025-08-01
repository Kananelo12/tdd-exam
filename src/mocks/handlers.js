// import { http, httpResponse, delay } from "msw";

// export const handlers = [
//   // get all scoops
//   http.get("https://localhost:3030/scoops", () => {
//     return httpResponse.json([
//       { name: "Chocolate", imagePath: "/images/chocolate.png" },
//       { name: "Vanilla", imagePath: "/images/vanilla.png" },
//     ]);
//   }),

//   // get all toppings
//   http.get("https://localhost:3030/toppings", () => {
//     return httpResponse.json([
//       { name: "Cherries", imagePath: "/images/cherries.png" },
//       { name: "M&Ms", imagePath: "/images/mms.png" },
//       { name: "Hot Fudge", imagePath: "images/hot-fudge.png" },
//     ]);
//   }),

//   // POST order confirmation
//   http.post("https://localhost:3030/order", (req) => {
//     // return a random order number
//     const random = Math.floor(100000 + Math.random() * 900000);
//     return httpResponse.json({ orderNumber: random }, { status: 201 });
//   }),
// ];
