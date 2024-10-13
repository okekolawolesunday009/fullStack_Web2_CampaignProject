const express = require('express')
const router = express.Router()
const { getAll, getById, addCampaign,getUserCampaignsByUserId} = require('../controllers/campaign/campaignController')
const authMiddleware = require('../middlewares/authMiddleware')
const { updateCampaign } = require('../controllers/campaign/updateCampaign')
const { deleteCampaign } = require('../controllers/campaign/deleteCampaign')

const multer = require('multer')
const { fileUpload } = require('../controllers/imageUpload/fileController'); // Assuming the above code is in 'fileUploadController.js'
const photoMiddleware = multer({ dest: 'uploads/' });

router.get('/', getAll )
router.get('/:id', getById)
router.get('/user/:id', getUserCampaignsByUserId)

// router.post('/:id/product', logout)


router.post('/new', authMiddleware, photoMiddleware.single('photo'), fileUpload, addCampaign);
// router.post('/new', authMiddleware, addCampaign);
router.put('/update/:id', authMiddleware, photoMiddleware.single('photo'), fileUpload, updateCampaign)
// router.put('/update/:id', authMiddleware, updateCampaign)
router.delete('/:id', authMiddleware, deleteCampaign)

// router.post('/:id', )


module.exports = router