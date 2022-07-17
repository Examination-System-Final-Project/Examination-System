const groupRouter = require('express').Router()
const groupController = require('../controllers/group-controller')

groupRouter.post('/createGroup', groupController.createGroup)
groupRouter.post('/editGroup', groupController.editGroup)
groupRouter.get('/assignExamToGroup', groupController.assignExamToGroup)
groupRouter.get('/assignExamineeToGroup', groupController.assignExamineeToGroup)
groupRouter.get('/listGroups', groupController.listGroups)
groupRouter.get('/listExamineesInGroup', groupController.listExamineesInGroup)
groupRouter.get('/listExamineesInOrganization', groupController.listExamineesInOrganization)
groupRouter.delete('/deleteGroup', groupController.deleteGroup)
groupRouter.delete('/removeExamFromGroup', groupController.removeExamFromGroup)
groupRouter.delete('/removeExamineeFromGroup', groupController.removeExamineeFromGroup)
// groupRouter.delete('/unassignExamToGroup', groupController.unassignExamToGroup)

module.exports = groupRouter