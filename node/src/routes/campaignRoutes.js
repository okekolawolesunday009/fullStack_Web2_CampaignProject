const express = require('express')
const router = express.Router()
const { getAll, getById, addCampaign} = require('../controllers/campaign/campaignController')
const authMiddleware = require('../middlewares/authMiddleware')
const { updateCampaign } = require('../controllers/campaign/updateCampaign')
const { deleteCampaign } = require('../controllers/campaign/deleteCampaign')


router.get('/', getAll )
router.get('/:id', getById)
// router.post('/:id/product', logout)


router.post('/new', authMiddleware, addCampaign)
router.put('/update/:id', authMiddleware, updateCampaign)
router.delete('/:id', authMiddleware, deleteCampaign)

// router.post('/:id', )


module.exports = router