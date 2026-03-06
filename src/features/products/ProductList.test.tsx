import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as productApi from "../../api/products";
import { Header } from "../../components/layout/Header";
import { CartProvider } from "../../context/CartContext";
import { ProductList } from "./ProductList";

jest.mock("../../api/products");

const mockedApi = jest.mocked(productApi);

describe("ProductList add to cart flow", () => {
  test("adds an item to cart and updates header badge", async () => {
    localStorage.clear();
    jest.clearAllMocks();

    mockedApi.getProducts.mockResolvedValue([
      {
        id: 1,
        title: "Mock Laptop",
        price: 1200,
        description: "Testing product",
        category: "electronics",
        image: "https://example.com/laptop.png",
      },
    ]);
    mockedApi.getCategories.mockResolvedValue(["electronics"]);

    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
          <ProductList />
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Mock Laptop")).toBeTruthy();
    });

    fireEvent.click(
      screen.getByRole("button", { name: /add mock laptop to cart/i })
    );

    expect(screen.getByLabelText("Cart has 1 items")).toBeTruthy();
  });
});
