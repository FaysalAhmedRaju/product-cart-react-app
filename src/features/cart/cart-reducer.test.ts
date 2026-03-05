import { reducer } from "./cart-reducer";

test("adds item to cart", () => {
  const product = {
    id: 1,
    title: "Test",
    price: 10,
  };

  const state = reducer([], {
    type: "ADD",
    payload: product,
  });

  expect(state.length).toBe(1);
});