import { createIcon } from "@chakra-ui/react";

import { addKeys } from "../utils/icons.utils";

/* eslint-disable react/jsx-key */
const SearchIcon = createIcon({
  displayName: "SearchIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    w: "24px",
    h: "24px",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  },
  path: addKeys([
    <g clipPath="url(#clip0_313_49435)">
      <path
        d="M23.5728 18.9264L17.9352 13.7424C18.5856 12.4608 18.9576 11.0136 18.9576 9.4776C18.9576 4.2432 14.7144 0 9.48 0C4.2432 0 0 4.2432 0 9.4776C0 14.7144 4.2432 18.9576 9.48 18.9576C11.0136 18.9576 12.4584 18.5856 13.74 17.9376L18.9216 23.5776C19.428 24.1248 20.2704 24.1416 20.7984 23.616L23.6136 20.8008C24.1392 20.2728 24.1224 19.4304 23.5728 18.9264ZM9.48 15.2616C6.2856 15.2616 3.6984 12.672 3.6984 9.4776C3.6984 6.2856 6.2856 3.696 9.48 3.696C12.672 3.696 15.2616 6.2856 15.2616 9.4776C15.2616 12.672 12.672 15.2616 9.48 15.2616Z"
        fill="#25282B"
      />
    </g>,
    <defs>
      <clipPath id="clip0_313_49435">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>,
  ]),
});

export default SearchIcon;
