import { GalleryRepository } from "../domain/repositories";
import { GalleryImage, MetadataRequest } from "../domain/entities";

interface ImageApiResponse {
  id: string;
  link: string;
  height: number;
  width: number;
}

interface ItemApiResponse {
  title: string;
  images: Array<ImageApiResponse>;
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

      console.log({ response });

      return response.data.items.map((item) => ({
        id: item.images[0].id,
        link: item.images[0].link,
        height: item.images[0].height,
        width: item.images[0].width,
        title: item.title,
      }));
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
