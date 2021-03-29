import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form } from "../Form";

describe("SurveyForm", () => {
  it("renders", () => {
    render(<Form onSubmit={() => {}} isSubmitDisabled={false} />);
  });

  it("handles submitting successfully", async () => {
    const successfulSubmit = jest.fn(
      () =>
        new Promise((res, rej) => {
          setTimeout(() => {
            res(null);
          }, 10);
        })
    );
    render(<Form onSubmit={successfulSubmit} isSubmitDisabled={false} />);
    const submitBtn = screen.getByTestId("submitBtn");

    // before submit
    let initialStateBtn = screen.getByText("Submit");
    expect(initialStateBtn).toBeDefined();
    expect(submitBtn).not.toBeDisabled();

    // submit
    userEvent.click(submitBtn);
    // while submitting
    expect(screen.getByText("Submitting...")).toBeDefined();
    expect(submitBtn).toBeDisabled();

    // wait for submit to resolve
    // after submit
    expect(await screen.findByText("Submitted Successfully")).toBeDefined();
    expect(submitBtn).toBeDisabled();

    expect(successfulSubmit).toHaveBeenCalledTimes(1);
  });

  it("handles submitting unsuccessfully", async () => {
    const failedSubmit = jest.fn(
      () =>
        new Promise((res, rej) => {
          setTimeout(() => {
            rej();
          }, 10);
        })
    );
    render(<Form onSubmit={failedSubmit} isSubmitDisabled={false} />);
    const submitBtn = screen.getByTestId("submitBtn");

    // before submit
    let initialStateBtn = screen.getByText("Submit");
    expect(initialStateBtn).toBeDefined();
    expect(submitBtn).not.toBeDisabled();

    // submit
    userEvent.click(submitBtn);
    // while submitting
    expect(screen.getByText("Submitting...")).toBeDefined();
    expect(submitBtn).toBeDisabled();

    // wait for submit to reject
    // after submit
    expect(await screen.findByText("Submit Failed")).toBeDefined();
    expect(submitBtn).not.toBeDisabled();

    expect(failedSubmit).toHaveBeenCalledTimes(1);
  });
});
