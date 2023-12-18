import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Icon, IconButton } from "@chakra-ui/react";

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
    <Box zIndex={2} position="absolute" top="1rem" right="1rem">
      <IconButton
        isRound
        aria-label="Sign out"
        icon={<Icon as={ExitIcon} boxSize={6} />}
        onClick={signOut}
      />
    </Box>
  );
}

export default SignOutButton;
