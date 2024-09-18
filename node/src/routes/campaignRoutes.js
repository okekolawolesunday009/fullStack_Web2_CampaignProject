const express = require('express')
const router = express.Router()
const { getAll, getById, addCampaign} = require('../controllers/campaignController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getAll )
router.get('/:id', getById)
// router.post('/:id/product', logout)


router.post('/new', authMiddleware, addCampaign)
// router.post('/:id', )


module.exports = router