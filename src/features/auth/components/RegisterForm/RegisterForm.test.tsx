import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { ProvidersContainer } from "@/features/tests/containers";

import RegisterForm from "./RegisterForm.component";

describe("RegisterForm", () => {
  it("renders correctly", async () => {
    render(
      <ProvidersContainer>
        <RegisterForm
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={jest.fn()}
        />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  it('should render "Sign Up" button disabled', async () => {
    render(
      <ProvidersContainer>
        <RegisterForm
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={jest.fn()}
        />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeDisabled();
    });
  });

  it("should call onSubmit", async () => {
    const onSubmit = jest.fn();

    render(
      <ProvidersContainer>
        <RegisterForm
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={onSubmit}
        />
      </ProvidersContainer>
    );

    const nameField = await screen.findByLabelText("Name");
    const emailField = await screen.findByLabelText("Email");
    const passwordField = await screen.findByLabelText("Password");

    await act(async () => {
      fireEvent.change(nameField, { target: { value: "John Doe" } });
      fireEvent.change(emailField, { target: { value: "email@test.com" } });
      fireEvent.change(passwordField, { target: { value: "@aA12345" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    screen.getByText("Sign Up").click();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should not call onSubmit", async () => {
    const onSubmit = jest.fn();

    render(
      <ProvidersContainer>
        <RegisterForm
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={onSubmit}
        />
      </ProvidersContainer>
    );

    const nameField = await screen.findByLabelText("Name");
    const emailField = await screen.findByLabelText("Email");
    const passwordField = await screen.findByLabelText("Password");

    await act(async () => {
      fireEvent.change(nameField, { target: { value: "John Doe" } });
      fireEvent.change(emailField, { target: { value: "email@test.com" } });
      fireEvent.change(passwordField, { target: { value: "12345" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    screen.getByText("Sign Up").click();

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
