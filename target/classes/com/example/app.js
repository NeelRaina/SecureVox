const sql = require('mssql/msnodesqlv8');

var config = {
    database: 'Admintollfree',
    server: 'HP-KITCHEN\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
};

sql.connect(config,function(err){
    if(err){
        console.log(err);
    }

    var request = new sql.Request();
    request.query('Select * from tblaccounts', function(err, recordSet){
        if(err){
            console.log(err)
        }else{
            console.log(recordSet)
        }
    });
});