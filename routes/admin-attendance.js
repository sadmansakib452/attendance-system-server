const adminAttendance = require('../controller/adminAttendance')

const router = require('express').Router()

router.get('/enable',adminAttendance.getEnable)
router.get('/disable',adminAttendance.getDisable)
router.get('/status',adminAttendance.getStatus)

module.exports = router