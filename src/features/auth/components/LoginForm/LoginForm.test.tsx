import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { ProvidersContainer } from "@/features/tests/containers";

import LoginForm from "./LoginForm.component";

describe("LoginForm", () => {
  it("renders correctly", async () => {
    render(
      <ProvidersContainer>
        <LoginForm
          initialValues={{
            email: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={jest.fn()}
        />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });

  it('should render "Login" button disabled', async () => {
    render(
      <ProvidersContainer>
        <LoginForm
          initialValues={{
            email: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={jest.fn()}
        />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeDisabled();
    });
  });

  it("should call onSubmit", async () => {
    const onSubmit = jest.fn();

    render(
      <ProvidersContainer>
        <LoginForm
          initialValues={{
            email: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={onSubmit}
        />
      </ProvidersContainer>
    );

    const emailField = await screen.findByLabelText("Email");
    const passwordField = await screen.findByLabelText("Password");

    await act(async () => {
      fireEvent.change(emailField, { target: { value: "email@test.com" } });
      fireEvent.change(passwordField, { target: { value: "@aA12345" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    screen.getByText("Login").click();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should not call onSubmit", async () => {
    const onSubmit = jest.fn();

    render(
      <ProvidersContainer>
        <LoginForm
          initialValues={{
            email: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={onSubmit}
        />
      </ProvidersContainer>
    );

    const emailField = await screen.findByLabelText("Email");
    const passwordField = await screen.findByLabelText("Password");

    await act(async () => {
      fireEvent.change(emailField, { target: { value: "email@test.com" } });
      fireEvent.change(passwordField, { target: { value: "12345" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    screen.getByText("Login").click();

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
