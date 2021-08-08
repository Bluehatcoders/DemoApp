const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World! Aapka bot start hai sir ji')
  })


const PORT = process.env.PORT ||5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));

const TOKEN = process.env.TELEGRAM_TOKEN || '1927170716:AAFTMpcZYb49HPGBkuFF3nZwu9Qr5m5W_r4'
const TelegramBot = require('node-telegram-bot-api')
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT ||5000;
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://messengerbirdlivechat.herokuapp.com:443'
const bot = new TelegramBot(TOKEN, {polling: true})


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`)


// Just to ping!
bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, 'I am alive on Heroku!')
});
