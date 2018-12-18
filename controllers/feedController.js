

const Account = require('../models/accountModel');
const Response = require('../utilites/response');

module.exports = {
    getFeed:async (req,res)=>{
        const user = req.user;
        const feed = [];
        await asyncForEach(user.following,async (element)=>{
            followedUser = await Account.findById(element);
            feed.push(...followedUser.posts);
        });

        feed.sort(function(a, b){
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            // Compare the 2 dates
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        });
    
        console.log(feed);
        Response.responseModel(res,200,'ok','all feed retrieved',feed);  
    }
}





async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}