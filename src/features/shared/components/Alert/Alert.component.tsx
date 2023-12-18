"use client";
import {
  useTimeout,
  useToken,
  Alert as ChakraAlert,
  Flex,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

import { CloseCircleIcon } from "../../icons";
import { AlertProps } from "./Alert.types";
import styles from "./Alert.module.scss";

const toastDuration = 4000;
const emptyFn = () => null;

function Alert(props: AlertProps) {
  const { message, status, duration = toastDuration, onDismiss } = props;

  useTimeout(onDismiss || emptyFn, duration);

  const [
    warningBg,
    warningStroke,
    successBg,
    successStroke,
    informativeBg,
    informativeStroke,
  ] = useToken("colors", [
    "orange.100",
    "orange.900",
    "green.100",
    "green.800",
    "blue.100",
    "blue.500",
  ]);

  const getColorScheme = () => {
    switch (status) {
      case "warning":
        return warningBg;
      case "success":
        return successBg;
      default:
        return informativeBg;
    }
  };

  const getAnimationColor = () => {
    switch (status) {
      case "warning":
        return warningStroke;
      case "success":
        return successStroke;
      default:
        return informativeStroke;
    }
  };

  const colorSchema = getColorScheme();
  const animationColor = getAnimationColor();

  return (
    <ChakraAlert
      status={status}
      variant="subtle"
      background={colorSchema}
      w={{ base: "100vw", md: "auto" }}
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <AlertDescription textColor={animationColor}>
          {message}
        </AlertDescription>
        <Button
          position="relative"
          boxSize="26px"
          bg="transparent"
          p={0}
          onClick={onDismiss}
          _hover={{ background: "none" }}
        >
          <CloseCircleIcon color={animationColor} />
          <svg className={styles.CircleWrapper}>
            <circle
              className={styles.Circle}
              r="11"
              cx="50%"
              cy="50%"
              stroke={animationColor}
              style={{
                animationDuration: `${duration / 1000}s`,
              }}
            />
          </svg>
        </Button>
      </Flex>
    </ChakraAlert>
  );
}

export default Alert;
