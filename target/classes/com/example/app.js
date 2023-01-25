const sql = require('mssql/msnodesqlv8');

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
    sql.connect(config,function(err){
        if(err){
            console.log(err);
        }
        var user = 7;
        var pass = 786;
    
        var request = new sql.Request();
        var question = `Select id, password from tbltollfree where id = ${username} AND password = ${password}`;
        request.query(question, function(err, recordSet){
            if(err){
                console.log(err)
            }else{
                if(recordSet > 0){
                console.log("The user exists.")
                return true;
                }
                return false;
            }
        });
    });
}

module.exports = { validateUser };
