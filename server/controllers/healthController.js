/**
 * @desc    API Health Check
 * @route   GET /api/health
 * @access  Public
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Calmify API is running peacefully',
  });
};
