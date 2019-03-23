const apiURL = 'http://localhost:2021/';
const fetch = require ('isomorphic-fetch');
require('es6-promise').polyfill();

async function getBLE() {
    try {
        let response = await fetch(apiURL + 'ble',{
            method: 'GET'
        });
        
        let responseJson = await response.json();
        console.log(responseJson);        
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}
module.exports.getBLE = getBLE;