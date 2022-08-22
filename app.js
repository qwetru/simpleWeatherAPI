const express = require('express')
const { get } = require('http')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res){
    const city = req.body.city

    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=<api-key>&units=metric`, function(response){
        
    response.on('data', function(data){
        const wheatherData = JSON.parse(data)
        const temp = wheatherData.main.temp
        const description = wheatherData.weather[0].description
        const icon = wheatherData.weather[0].icon
        res.write(`<h1>It feels like ${description} in ${city}</h1>`)
        res.write(`<h2>The temperature in ${city} is ${temp}</h2>`)
        res.send()
    })
    })
})

app.listen(3000, function(){
    console.log('Running app on port 3000...')
})