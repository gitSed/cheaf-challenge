import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { ProvidersContainer } from "@/features/tests/containers";

import AuthSocialButtons from "./AuthSocialButtons.component";

describe("AuthSocialButtons", () => {
  it("renders correctly", async () => {
    render(
      <ProvidersContainer>
        <AuthSocialButtons />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("facebook")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("google")).toBeInTheDocument();
    });
  });

  it("should call onGoogleClick", async () => {
    const onGoogleClick = jest.fn();

    render(
      <ProvidersContainer>
        <AuthSocialButtons onGoogleClick={onGoogleClick} />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("google")).toBeInTheDocument();
    });

    screen.getByLabelText("google").click();

    await waitFor(() => {
      expect(onGoogleClick).toHaveBeenCalled();
    });
  });

  it("should call onFacebookClick", async () => {
    const onFacebookClick = jest.fn();

    render(
      <ProvidersContainer>
        <AuthSocialButtons onFacebookClick={onFacebookClick} />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("facebook")).toBeInTheDocument();
    });

    screen.getByLabelText("facebook").click();

    await waitFor(() => {
      expect(onFacebookClick).toHaveBeenCalled();
    });
  });
});
