const EmployeeModel = require('./../Models/Employee') 
const Util = require('./Util')

class EmployeeUtil extends Util {
    checkAlias(username){
        return EmployeeModel.findOne({username : username}).then(result => {
            if(result){
                return false
            }
            else{
                return true
            }
        })
    }
}
module.exports = new EmployeeUtil()