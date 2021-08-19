import ApiError from '../error/ApiError.js';

class PatientController {
  async create(req, res, next) {}

  async delete(req, res) {}

  async edit(req, res) {}

  async getAll(req, res) {}

  async getOne(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('Нет id'));
    }
    res.json(id);
  }
}

export default new PatientController();
