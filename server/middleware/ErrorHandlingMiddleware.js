import ApiError from '../error/ApiError.js';

export default (err, req, res) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, alreadyExists: err.alreadyExists });
  }
  return res.status(500).json({ message: 'Unexpected error!' });
};
