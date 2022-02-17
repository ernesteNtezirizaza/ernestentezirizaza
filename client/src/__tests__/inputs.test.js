import { render, screen } from "@testing-library/react";
import Balance from "../views/Balance";
import Buy from "../views/Buy";

const buyElectricityPage = () => {
  const utils = render(<Buy />);
  const meterInput = utils.getByPlaceholderText("Meter number");
  const amountInput = utils.getByPlaceholderText(/Amount/i);
  return {
    meterInput,
    amountInput,
    ...utils,
  };
};

const checkBalancePage = () => {
  const utils = render(<Balance />);
  const meterInput = utils.getByPlaceholderText("Meter number");
  const amountInput = utils.getByPlaceholderText(/Amount/i);
  return {
    meterInput,
    amountInput,
    ...utils,
  };
};

it("should show an error below amount input", () => {
  const { meterInput } = buyElectricityPage();
  fireEvent.change(input, { target: { value: "234" } });
  expect(
    screen.getByText("Amount must be a multiple of 100 and less than 182,500")
  ).toBeInTheDocument();
});

it("should show an error below meter number input", () => {
  const { meterInput } = buyElectricityPage();
  fireEvent.change(input, { target: { value: "123" } });
  expect(
    screen.getByText("Invalid meter, only 6 digits accepted")
  ).toBeInTheDocument();
});

it("It should show an error below meter number input", () => {
  const { meterInput } = checkBalancePage();
  fireEvent.change(input, { target: { value: "123" } });
  expect(screen.getByText("Your meter is invalid")).toBeInTheDocument();
});
