import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailTaskComponent from "../components/EmailTaskComponent";

describe("EmailTaskComponent", () => {
  test("render email task component and handle input change", () => {
    const task = { task_id: 1 };
    const taskInputs = {
      1: {
        recipient: "test@gmail.com",
        subject: "Test Subject",
        body: "Test Body",
      },
    };
    const handleInputChange = jest.fn();

    const { getByPlaceholderText, getByLabelText } = render(
      <EmailTaskComponent
        task={task}
        onInputChange={handleInputChange}
        taskInputs={taskInputs}
      />
    );

    const recipientInput = getByPlaceholderText(/Enter email recipient/i);
    expect(recipientInput).toBeInTheDocument();
    expect(recipientInput.value).toBe("test@gmail.com");

    fireEvent.change(recipientInput, {
      target: { value: "testtwo@gmail.com" },
    });
    expect(handleInputChange).toHaveBeenCalledWith(
      1,
      "recipient",
      "testtwo@gmail.com"
    );

    const subjectInput = getByLabelText(/Subject/i);
    expect(subjectInput).toBeInTheDocument();
    expect(subjectInput.value).toBe("Test Subject");

    fireEvent.change(subjectInput, { target: { value: "New Subject" } });
    expect(handleInputChange).toHaveBeenCalledWith(1, "subject", "New Subject");

    const bodyInput = getByLabelText(/Body/i);
    expect(bodyInput).toBeInTheDocument();
    expect(bodyInput.value).toBe("Test Body");

    fireEvent.change(bodyInput, { target: { value: "New Body" } });
    expect(handleInputChange).toHaveBeenCalledWith(1, "body", "New Body");
  });
});
