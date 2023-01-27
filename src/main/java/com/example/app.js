const sql = require('mssql/msnodesqlv8');
const { UserBindingContext } = require('twilio/lib/rest/chat/v2/service/user/userBinding');

var config = {
    database: 'Admintollfree',
    server: 'HP-KITCHEN\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
};

/*
sql.connect(config,function(err){
    if(err){
        console.log(err);
    }
    var user = 7;
    var pass = 786;

    var request = new sql.Request();
    var question = `Select id, password from tbltollfree where id = ${user} AND password = ${password}`;
    request.query(question, function(err, recordSet){
        if(err){
            console.log(err)
        }else{
            console.log(recordSet)
        }
    });
});
*/
function validateUser(username, password){
    console.log("Validating User...");
    sql.connect(config,function(err){
        if(err){
            console.log(err);
        }
        var user = 7;
        var pass = 786;
        console.log("Connecting to user...");
        var request = new sql.Request();
        var question = `Select id, password from tbltollfree where id = ${username} AND password = ${password}`;
        request.query(question, function(err, recordSet){
            if(err){
                console.log(err)
            }else{
                console.log(recordSet);
                if(recordSet.recordset.length > 0){
                    console.log("The user exists.")
                    return recordSet;
                    
                }else{
                    console.log("Invalid User.")
                
                }
                
            }
        });
    });
}

module.exports = { validateUser };
