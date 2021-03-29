import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SurveyForm } from "../SurveyForm";

describe("SurveyForm", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders", () => {
    render(<SurveyForm />);
  });

  it("contains, updates, submits all field values", async () => {
    render(<SurveyForm />);
    // in a real form I'd spy on redux action, window.fetch, axios, GQL mutation, etc
    const consoleLogSpy = jest.spyOn(console, "log");

    userEvent.type(screen.getByTestId("name"), "abc");
    userEvent.type(screen.getByTestId("password"), "def");
    userEvent.type(screen.getByTestId("confirmPassword"), "def");
    userEvent.type(screen.getByTestId("birthday"), "1984-08-08");
    userEvent.selectOptions(
      screen.getByTestId("timezone"),
      screen.getByText("America/New_York")
    );
    userEvent.click(screen.getByText("front end"));
    userEvent.click(screen.getByText("pineapple"));
    userEvent.click(screen.getByText("anchovy"));

    userEvent.click(screen.getByText("Submit"));
    jest.runAllTimers();

    await screen.findByText("Submitted Successfully");

    expect(consoleLogSpy).toHaveBeenCalledWith({
      name: "abc",
      password: "def",
      birthday: "1984-08-08",
      preferences: {
        techPref: "front end",
        pizzaToppings: ["pineapple", "anchovy"],
        timezone: "America/New_York",
      },
    });
  });

  it("handles name validation", () => {
    render(<SurveyForm />);
    const submitBtn = screen.getByTestId("submitBtn");
    userEvent.type(screen.getByTestId("password"), "def");
    userEvent.type(screen.getByTestId("confirmPassword"), "def");

    // disabled if no name
    expect(submitBtn).toBeDisabled();

    // enabled once name is entered
    userEvent.type(screen.getByTestId("name"), "abc");
    expect(submitBtn).not.toBeDisabled();
  });

  it("handles password validation", () => {
    render(<SurveyForm />);
    const submitBtn = screen.getByTestId("submitBtn");
    userEvent.type(screen.getByTestId("name"), "abc");

    // disabled when no password
    expect(submitBtn).toBeDisabled();

    // disabled when password, but password does not match confirmPassword
    userEvent.type(screen.getByTestId("password"), "def");
    expect(submitBtn).toBeDisabled();

    // enabled when password and password matches confirmPassword
    userEvent.type(screen.getByTestId("confirmPassword"), "def");
    expect(submitBtn).not.toBeDisabled();
  });
});
