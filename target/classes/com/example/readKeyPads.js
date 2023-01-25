const sql = require('mssql/msnodesqlv8');

var config = {
    database: 'Admintollfree',
    server: 'HP-KITCHEN\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
};

function readKeypad(username, password){
    sql.connect(config,function(err){
        if(err){
            console.log(err);
        }
        
        var request = new sql.Request();
        var question = `select Keyin, Activity from tbltollfree as t, tblKeypad as k where t.id = ${username} AND t.password = ${password} AND k.Keypadname = t.keypad`;
        request.query(question, function(err, recordSet){
            if(err){
                console.log(err)
            }else{
                console.log(recordSet)
            }
        });

    });
 
}