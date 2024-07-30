//Class d'upload d'image
import AxiosService from "./database";

export default class UploadPictureService extends AxiosService {
  constructor() {
    super("upload");
  }

  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}
