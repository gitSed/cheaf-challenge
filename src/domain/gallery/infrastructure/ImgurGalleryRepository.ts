import { GalleryRepository } from "../domain/repositories";
import { GalleryImage, MetadataRequest } from "../domain/entities";

interface ImageApiResponse {
  id: string;
  link: string;
  gifv?: string;
  type: string;
  height: number;
  width: number;
}

interface ItemApiResponse {
  title: string;
  images?: Array<ImageApiResponse>;
  id: string;
  link: string;
  gifv?: string;
  type: string;
  height: number;
  width: number;
}

interface ApiResponse {
  data: {
    items: Array<ItemApiResponse>;
  };
}

class ImgurGalleryRepository implements GalleryRepository {
  constructor(
    private readonly apiUrl: string,
    private readonly clientId: string
  ) {}

  async getByTag(request: MetadataRequest): Promise<Array<GalleryImage>> {
    try {
      const response: ApiResponse = await fetch(this.formatImgurURL(request), {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${this.clientId}`,
        },
      }).then((resp) => resp.json());

      const getLink = (image: ImageApiResponse): string => {
        if (image.type === "video/mp4") {
          return image.gifv ? image.gifv : image.link;
        }

        return image.link;
      };

      return response.data.items.map((item) => {
        if (!!item?.images === false) {
          return {
            id: item.id,
            link: item.link,
            title: item.title,
            type: item.type,
            height: item.height,
            width: item.width,
          };
        }

        return {
          id: item.images[0].id,
          link: getLink(item.images[0]),
          title: item.title,
          type: item.images[0].type,
          height: item.images[0].height,
          width: item.images[0].width,
        };
      });
    } catch (err) {
      console.error(err);
      throw new Error("Error searching images");
    }
  }

  private formatImgurURL(request: MetadataRequest): string {
    const { tagName, page } = request;

    return `${this.apiUrl}/${tagName}/top/month/${page}`;
  }
}

export default ImgurGalleryRepository;
