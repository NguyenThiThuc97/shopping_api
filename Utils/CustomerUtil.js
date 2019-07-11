const Customer = require('./../Models/Customer') 
const Util = require('./Util')

class CustomerUtil extends Util {
    checkAlias(username){
        return Customer.findOne({username : username}).then(result => {
            if(result){
                return false
            }
            else{
                return true
            }
        })
    }
}
module.exports = new CustomerUtil()