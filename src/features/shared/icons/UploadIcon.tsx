import { createIcon } from "@chakra-ui/react";

import { addKeys } from "../utils/icons.utils";

/* eslint-disable react/jsx-key */
const UploadIcon = createIcon({
  displayName: "UploadIcon",
  viewBox: "0 0 20 20",
  defaultProps: {
    w: "20px",
    h: "20px",
    fill: "currentColor",

    xmlns: "http://www.w3.org/2000/svg",
  },
  path: addKeys([
    <path d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />,
    <path d="M15 7l-5-6-5 6h4v8h2V7h4z" />,
  ]),
});

export default UploadIcon;
