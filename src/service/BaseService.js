let Modal = null;

class BaseService{
    constructor(modal){
        Modal = modal;
    }
    getOne(where){
        return Modal?.findOne(where);
    }
    list(where){
        return Modal?.find(where || {});
    }
    insert(data){
        return new Modal(data).save();
    }
    update(id, data){
        return Modal.findByIdAndUpdate(id, data, {new: true});
    }
    delete(id){
        return Modal.findByIdAndDelete(id);
    }
}

module.exports = BaseService;