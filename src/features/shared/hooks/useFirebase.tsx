import { useContext } from "react";

import { FirebaseContext } from "../providers";

function useFirebase() {
  return useContext(FirebaseContext);
}

export default useFirebase;
