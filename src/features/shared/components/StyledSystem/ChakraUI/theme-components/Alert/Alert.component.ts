const Alert = {
  baseStyle: {
    container: {
      borderRadius: "0",
      border: "0",
    },
  },
  variants: {
    error: (): Record<string, unknown> => ({
      container: {
        bg: "red.100",
      },
      icon: {
        color: "red.700",
      },
      title: {
        color: "black",
      },
      description: {
        color: "black",
      },
    }),
    info: (): Record<string, unknown> => ({
      container: {
        bg: "blue.100",
        borderColor: "blue.300",
      },
      icon: {
        color: "blue.300",
      },
      description: {
        color: "green.900",
      },
    }),
  },
};

export default Alert;
