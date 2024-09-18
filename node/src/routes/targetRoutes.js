const express = require('express')
const router = express.Router()
const { updateTargetStatus} = require('../controllers/targetController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/:id', authMiddleware,  updateTargetStatus)
// router.post('/:id/product', logout)


// router.post('/:id', )


module.exports = router