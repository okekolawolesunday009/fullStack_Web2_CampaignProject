const express = require('express')
const router = express.Router()
const { updateTargetStatus, getTargetById} = require('../controllers/targetController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/:id', authMiddleware,  updateTargetStatus)
router.get('/:id', getTargetById)


// router.post('/:id', )


module.exports = router