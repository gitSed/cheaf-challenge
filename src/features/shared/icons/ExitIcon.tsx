import { createIcon } from "@chakra-ui/react";

import { addKeys } from "../utils/icons.utils";

/* eslint-disable react/jsx-key */
const ExitIcon = createIcon({
  displayName: "ExitIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    w: "24px",
    h: "24px",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  },
  path: addKeys([
    <path
      d="M21.66 12.4176C21.8856 12.1872 21.8856 11.8104 21.66 11.58L14.8008 4.5192C14.5752 4.2888 14.2128 4.2888 13.9872 4.5192L12.624 5.9256C12.3984 6.156 12.3984 6.5328 12.624 6.7632L15.8712 10.104H7.13035C6.81355 10.104 6.55435 10.368 6.55435 10.6968V13.0632C6.55435 13.392 6.81355 13.656 7.13035 13.656H16.1088L12.624 17.2392C12.3984 17.4696 12.3984 17.8464 12.624 18.0768L13.9872 19.4808C14.2128 19.7112 14.5752 19.7112 14.8008 19.4808L21.66 12.4176ZM10.032 4.416H5.07595V19.5864H10.032V22.5H3.61915C2.81275 22.5 2.16235 21.8496 2.16235 21.0408V2.9592C2.16235 2.1528 2.81275 1.5 3.61915 1.5H10.032V4.416Z"
      fill="#25282B"
    />,
  ]),
});

export default ExitIcon;
