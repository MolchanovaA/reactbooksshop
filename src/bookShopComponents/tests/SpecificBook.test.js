import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import SpecificBook from "../pages/specificBook/SpecificBook";

describe("<Book />", () => {
  it(" WORKS should render input in BookPage", async () => {
    const bookPage = render(
      <MemoryRouter>
        <SpecificBook />
      </MemoryRouter>
    );
    const input = bookPage.getByTestId("inputTest");
    expect(input).toBeInTheDocument();
  });
  it(" WORKS check change input", async () => {
    const bookPage = render(
      <MemoryRouter>
        <SpecificBook />
      </MemoryRouter>
    );
    const input = bookPage.getByTestId("inputTest");
    const priceElement = bookPage.getByTestId("priceTest");
    const oldPrice = priceElement.innerHTML;
    const counter = 11;
    fireEvent.change(input, { target: { value: counter } });
    const newValue = oldPrice * counter + "";
    expect(priceElement.innerHTML).toBe(newValue);
  });

  it("work check change buttonDown", async () => {
    const bookPage = render(
      <MemoryRouter>
        <SpecificBook />
      </MemoryRouter>
    );
    const down = bookPage.getByTestId("DownButtonTest");
    const input = bookPage.getByTestId("inputTest");
    input.value = 2;
    fireEvent.click(down);
    expect(input.value).toBe("1");
  });
  it("check change buttonUp", async () => {
    const bookPage = render(
      <MemoryRouter>
        <SpecificBook />
      </MemoryRouter>
    );
    const up = bookPage.getByTestId("UpButtonTest");
    const input = bookPage.getByTestId("inputTest");
    fireEvent.click(up);
    expect(input.value).toBe("2");
  });
});
