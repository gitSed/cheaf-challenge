import { useRef } from "react";
import { Box } from "@chakra-ui/react";

import { useVisible } from "@/features/shared/hooks";

import { GalleryVideoProps } from "./GalleryVideo.types";

function GalleryVideo(props: GalleryVideoProps) {
  const { link, title, onClick } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { isVisible, ref } = useVisible<HTMLDivElement>();

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
      ref={ref}
    >
      {isVisible && (
        <video
          loop
          muted
          playsInline
          preload="none"
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
      )}
    </Box>
  );
}

export default GalleryVideo;
