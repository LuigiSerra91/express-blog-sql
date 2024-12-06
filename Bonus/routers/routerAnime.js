const express = require('express')
const router = express.Router()
const animeController = require('../controllers/controllerAnime.js')


router.get('/', animeController.index)
router.get('/:id', animeController.show)
router.post('/', animeController.store)
router.put('/:id', animeController.update)
router.delete('/:id', animeController.destroy)

module.exports = router