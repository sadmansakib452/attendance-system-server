const router = require('express').Router()
const userController = require('../controller/users')
/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by","name"]
 * @method GET
 * @visibility Private
 * 
 */

/**
 * Get user by id or email
 */

router.get('/:userId',userController.getUserById)
/**
 * Update user by id or
 * @method PATCH
 */

router.patch('/:userId',userController.patchUserById)

router.put('/:userId',userController.putUserById)

/**
 * Delete user by id
 * @method DELETE
 */

router.delete('/:userId',userController.deleteUserById)

router.get('/', userController.getUsers)
router.post('/',userController.postUser)

module.exports = router