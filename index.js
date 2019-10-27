const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'SIRLA幫手喵'
});

// Start Handler
bot.on('start', () => {
    bot.postMessageToUser('samabc75', '喵喵喵~ 我是SIRLA好幫喵，上線喵喵喵，會叫的喵是好喵');
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data);
});

// Response to message
let words = ['喵喵喵喵喵喵喵貓喵喵喵喵喵喵', '櫻櫻沒袋子，沒事叫我講幹話做啥', '你有聽過無限貓咪理論嗎，貓咪有一天也能打出曠世巨作', '幹話。', '喵喵累了，喵喵不講幹話', '喵', '喵喵喵', '喵喵~喵喵喵~~咪邀~~~'];

function handleMessage(data) {
    if (data.text.includes('喵喵講話')) {
        bot.getChannels().then( (value) => {
            let channel_name = value.channels.find(items => items.id === data.channel).name;
            bot.postMessageToChannel(channel_name, '話。');
        });
    } else if (data.text.includes('喵喵講幹話')) {
        bot.getChannels().then( (value) => {
            let channel_name = value.channels.find(items => items.id === data.channel).name;
            let response = words[Math.floor(Math.random() * words.length)];
            bot.postMessageToChannel(channel_name, response);
        });
    } else if (data.text.includes('喵喵誰最帥')) {
        bot.getChannels().then( (value) => {
            let channel_name = value.channels.find(items => items.id === data.channel).name;
            bot.getUserById(data.user).then( value => {
                bot.postMessageToChannel(channel_name, `喵~ ${value.profile.display_name}最帥了!`);
            });
        });
    } else if (data.text.includes('喵喵誰最美')) {
        bot.getChannels().then( (value) => {
            let channel_name = value.channels.find(items => items.id === data.channel).name;
            bot.getUserById(data.user).then( value => {
                bot.postMessageToChannel(channel_name, `喵~ ${value.profile.display_name}最美了!`);
            });
        });
    }
}