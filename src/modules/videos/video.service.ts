import Video from "./video.model";

class VideoService {
  async create(data: any) {
    return Video.create(data);
  }

  async findAll() {
    return Video.findAll();
  }

  async findOne(id: number) {
    return Video.findByPk(id);
  }

  async update(id: number, data: any) {
    return Video.update(data, { where: { id } });
  }
  async delete(id: number) {
    return Video.destroy({ where: { id } });
  }
}

export const videoService = new VideoService();
