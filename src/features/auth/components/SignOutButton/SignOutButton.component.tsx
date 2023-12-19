import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";

import { useFirebase } from "@/features/shared/hooks";
import { ExitIcon } from "@/features/shared/icons";

function SignOutButton() {
  const router = useRouter();
  const { signOut, authStatus } = useFirebase();

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/auth?register=false");
    }
  }, [authStatus]);

  return (
    <Flex
      position="absolute"
      alignItems="center"
      flexDir="column"
      zIndex={2}
      top="1.375rem"
      right="1.375rem"
    >
      <IconButton
        isRound
        aria-label="Sign out"
        icon={<Icon as={ExitIcon} boxSize={4} />}
        onClick={signOut}
      />
      <Text fontWeight="500">Log out</Text>
    </Flex>
  );
}

export default SignOutButton;
