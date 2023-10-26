const router = require('express').Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.get('/', reviewController.getAllUsers);

router.post(
  '/',
  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;