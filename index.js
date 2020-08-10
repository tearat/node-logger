const express = require('express')
const colors = require('colors')

const app = express()
app.use(express.json())

app.post('/', (request, response) => {
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;

    const { from = "default", type, message } = request.body
    const newDatetime = new Date();

    const year     = newDatetime.getFullYear();
    const month    = newDatetime.getMonth() + 1;
    const day      = newDatetime.getDate();
    const hours    = newDatetime.getHours();
    const minutes  = ("0" + newDatetime.getMinutes()).substr(-2)
    const seconds  = ("0" + newDatetime.getSeconds()).substr(-2)
    const datetime = `(${from}) (${method}) ${day}.${month}.${year} ${hours}:${minutes}:${seconds}`

    if( type == "success" ) {
        console.log(`${datetime}:  ${message}`.green);
    } else if( type == "error" ) {
        console.log(`${datetime}:  ${message}`.red);
    } else {
        console.log(`${datetime}:  ${message}`);
    }
    response.end()
})

app.listen(8008);
console.log('Logger running at http://localhost:8008');
