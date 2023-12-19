import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { ProvidersContainer } from "@/features/tests/containers";

import Alert from "./Alert.component";

describe("Alert", () => {
  const message = "This is a message";

  it("renders correctly", async () => {
    render(<Alert message={message} status="info" duration={4000} />);

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it("renders correctly with custom onDismiss", async () => {
    const onDismiss = jest.fn();

    render(
      <ProvidersContainer>
        <Alert
          message={message}
          status="info"
          duration={2000}
          onDismiss={onDismiss}
        />
      </ProvidersContainer>
    );

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalled();
      },
      { timeout: 2500 }
    );
  });
});
