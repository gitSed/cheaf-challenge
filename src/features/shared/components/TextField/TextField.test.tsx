import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { z } from "zod";

import { DummyForm } from "@/features/tests/components";

import TextField from "./TextField.component";

describe("TextField", () => {
  const initialValues = {
    name: "",
  };
  const validationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
  });

  it("renders correctly", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField name="name" label="Name" />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });
  });

  it("renders correctly with error", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField name="name" label="Name" />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    const input = screen.getByLabelText("Name");

    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });

    await act(async () => {
      expect(
        screen.getByText("Name must be at least 3 characters long")
      ).toBeInTheDocument();
    });
  });

  it("renders correctly with helper text", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField name="name" label="Name" helperText="Helper text" />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    await act(async () => {
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });
  });

  it("renders correctly with hidden label", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField name="name" label="Name" hiddenLabel />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    await act(async () => {
      expect(screen.getByText("Name")).not.toBeVisible();
    });
  });

  it("renders correctly with right element", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField
          name="name"
          label="Name"
          rightElement={<div>Right element</div>}
        />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    await act(async () => {
      expect(screen.getByText("Right element")).toBeInTheDocument();
    });
  });

  it("renders correctly with disabled state", async () => {
    render(
      <DummyForm
        onSubmit={jest.fn}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextField name="name" label="Name" isDisabled />
      </DummyForm>
    );

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    await act(async () => {
      expect(screen.getByLabelText("Name")).toBeDisabled();
    });
  });
});
