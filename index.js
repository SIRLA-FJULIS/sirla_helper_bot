const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'SIRLA幫手喵'
});

// Start Handler
bot.on('start', () => {
    bot.postMessageToChannel('chatroom', '喵喵喵~ 我是SIRLA好幫喵，上線喵喵喵');
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text, data.channel);
});

// Response to message
function handleMessage(message, channel_id) {
    if (message.includes('喵喵講話')) {
        bot.getChannels().then( (value) => {
            let channel_name = value.channels.find(items => items.id === channel_id).name;
            bot.postMessageToChannel(channel_name, '話。');
        });
    }
}