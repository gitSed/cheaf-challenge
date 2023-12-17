import { Flex, Icon, IconButton } from "@chakra-ui/react";

import { FacebookIcon, GoogleIcon } from "@/features/shared/icons";

import { AuthSocialButtonsProps } from "./AuthSocialButtons.types";

function AuthSocialButtons(props: AuthSocialButtonsProps) {
  const { onGoogleClick, onFacebookClick } = props;

  return (
    <Flex gap="0.5rem">
      <IconButton
        isRound
        aria-label="facebook"
        icon={<Icon as={FacebookIcon} boxSize={9} />}
        onClick={onFacebookClick}
      />
      <IconButton
        isRound
        aria-label="google"
        icon={<Icon as={GoogleIcon} boxSize={9} />}
        onClick={onGoogleClick}
      />
    </Flex>
  );
}

export default AuthSocialButtons;
