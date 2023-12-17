import { Flex, Icon, IconButton } from "@chakra-ui/react";

import { FacebookIcon, GoogleIcon } from "@/features/shared/icons";

function AuthSocialButtons() {
  return (
    <Flex gap="0.5rem">
      <IconButton
        isRound
        aria-label="facebook"
        icon={<Icon as={FacebookIcon} boxSize={9} />}
      />
      <IconButton
        isRound
        aria-label="google"
        icon={<Icon as={GoogleIcon} boxSize={9} />}
      />
    </Flex>
  );
}

export default AuthSocialButtons;
