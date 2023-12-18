import { createIcon } from "@chakra-ui/react";

import { addKeys } from "../utils/icons.utils";

/* eslint-disable react/jsx-key */
const CloseCircleIcon = createIcon({
  displayName: "CloseCircleIcon",
  viewBox: "0 0 18 18",
  defaultProps: {
    w: "18px",
    h: "18px",
    fill: "none",
  },
  path: addKeys([
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L7.93934 9L5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L9 10.0607L11.4697 12.5303C11.7626 12.8232 12.2374 12.8232 12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697L10.0607 9L12.5303 6.53033C12.8232 6.23744 12.8232 5.76256 12.5303 5.46967C12.2374 5.17678 11.7626 5.17678 11.4697 5.46967L9 7.93934L6.53033 5.46967Z"
      fill="currentColor"
    />,
  ]),
});

export default CloseCircleIcon;
