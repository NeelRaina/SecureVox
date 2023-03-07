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

async function validateUser(username, password){
    console.log("Validating User...");
    var results;
    try{
    var connection = await sql.connect(config)
    console.log("Conncted");
    results = await sql.query(`Select id, password from tbltollfree where id = ${username} AND password = ${password}`);
    connection.close();

    } catch (err){
        console.log(err);
    }
    return results;
        
    }
    


function test(){
    console.log("Test")
    return "1"
} 

module.exports = { validateUser ,test};
