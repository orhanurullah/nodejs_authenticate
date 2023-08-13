const BaseService = require('./BaseService');
const Modal = require('../model/User');

class UserService extends BaseService {
    constructor(){
        super(Modal)
    }
    //extend getOne, list, insert, update, delete

}

module.exports = UserService;