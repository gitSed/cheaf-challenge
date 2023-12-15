"use client";

import {
  FormErrorMessage,
  ListIcon,
  ListItem,
  Text,
  List,
} from "@chakra-ui/react";

import { CloseIcon } from "@/features/shared/icons";

import { FieldErrorMessageProps } from "./FieldErrorMessage.types";

function FieldErrorMessage(props: FieldErrorMessageProps): JSX.Element {
  const { error } = props;

  const formatError = (input: string): { title: string; errors: string[] } => {
    const pattern = /(.+?) \{\{ \[(.*?)\] \}\}/;

    const match = input.match(pattern);

    if (match) {
      const title = match[1].trim();
      const errorsString = match[2].replace(/“|”/g, "");
      const errors = errorsString.split(", ").map((error) => error.trim());
      return { title, errors };
    } else {
      return { title: input.trim(), errors: [] };
    }
  };

  const { title, errors } = formatError(error);

  const renderTitle = (): JSX.Element => {
    return <Text textStyle="small1">{title}</Text>;
  };

  const renderErrors = (): JSX.Element => {
    return (
      <List mt={3}>
        {errors.map((error, index) => (
          <ListItem key={index}>
            <ListIcon as={CloseIcon} />
            <Text textStyle="small2" display="inline">
              {error}
            </Text>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <FormErrorMessage role="alert" flexDir="column" alignItems="flex-start">
      {renderTitle()}
      {errors.length > 0 && renderErrors()}
    </FormErrorMessage>
  );
}

export default FieldErrorMessage;
