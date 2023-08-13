const express = require('express');

const {
    auth
} = require('../middleware/auth');
const { superAdmin } = require('../middleware/superAdmin');

const ChangeActivation = require('../controller/Admin/User/ChangeActivation');
const AllActiveUsers = require('../controller/Admin/User/AllActiveUsers');
const WithoutActivationUsers = require('../controller/Admin/User/WithoutActivationUsers');
const DeleteUser = require('../controller/Admin/User/DeleteUser');

const AllUsers = require('../controller/Admin/User/AllUsers');
const MakeSubscribe = require('../controller/Admin/User/MakeSubscribe');
const RemoveSubscribe = require('../controller/Admin/User/RemoveSubscribe');

const router = express.Router();
router.use(auth);
router.use(superAdmin);

router.post('/users/change-activation/:id',  ChangeActivation);
router.get('/users', AllUsers);
router.get('/users/active-users', AllActiveUsers);
router.get('/users/without-active-users',  WithoutActivationUsers);
router.delete('/users/:id',  DeleteUser);

router.get('/subscribe/:id', MakeSubscribe);
router.get('/subscribe/remove/:id', RemoveSubscribe);

module.exports = router;