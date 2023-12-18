import { useRef } from "react";
import { Box } from "@chakra-ui/react";

import { GalleryVideoProps } from "./GalleryVideo.types";

function GalleryVideo(props: GalleryVideoProps) {
  const { link, title, onClick } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  const getPosterUrl = () => {
    if (link.includes(".gifv")) {
      return link.replace(".gifv", ".jpeg");
    }
    return;
  };

  const getSourceUrl = () => {
    if (link.includes(".gifv")) {
      return link.replace(".gifv", ".mp4");
    }
    return link;
  };

  return (
    <Box
      borderRadius="0.5rem"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
    >
      <video
        loop
        muted
        ref={videoRef}
        title={title || "gallery video"}
        poster={getPosterUrl()}
        onMouseEnter={() => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        }}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }}
      >
        <source src={getSourceUrl()} type="video/mp4" />
      </video>
    </Box>
  );
}

export default GalleryVideo;
