require('dotenv').config();

const app = require('./app');
require('./database');

async function main(){
    await app.listen(3001);
    console.log('Server on port 3001');
}

main();