import asyncHandler from '../middleware/asyncHandler.js';

export const register = asyncHandler(async (req, res, next) => {
  res.send('register route');
});
