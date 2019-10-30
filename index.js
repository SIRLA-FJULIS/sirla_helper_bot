const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
// Read the signing secret from the environment variables
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const slackEvents = createEventAdapter(slackSigningSecret);
const web = new WebClient(token);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

let words = ['喵喵喵喵喵喵喵貓喵喵喵喵喵喵', '櫻櫻沒袋子，沒事叫我講幹話做啥', '你有聽過無限貓咪理論嗎，貓咪有一天也能打出曠世巨作', '幹話。', '喵喵累了，喵喵不講幹話', '喵', '喵喵喵', '喵喵~喵喵喵~~咪邀~~~'];

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  if (event.text.includes("喵喵講話")){
    (async () => {
      const result = await web.chat.postMessage({
        text: '話。',
        channel: event.channel,
      });
    })();
  } else if (event.text.includes("喵喵講幹話")){
    (async () => {
      let response = words[Math.floor(Math.random() * words.length)];
      const result = await web.chat.postMessage({
        text: response,
        channel: event.channel,
      });
    })();
  } else if (event.text.includes("喵喵誰最帥")){
    web.users.list().then( (value) => {
      let user_name = value.members.find(item => item.id === event.user).profile.display_name;
      (async () => {
        const result = await web.chat.postMessage({
          text: `喵~${user_name}最帥了`,
          channel: event.channel,
        });
      })();
    });
  } else if (event.text.includes("喵喵誰最美")){
    web.users.list().then( (value) => {
      let user_name = value.members.find(item => item.id === event.user).profile.display_name;
      (async () => {
        const result = await web.chat.postMessage({
          text: `喵~${user_name}最美了`,
          channel: event.channel,
        });
      })();
    });
  } else if (event.text.includes("喵喵誰最狂")) {
    (async () => {
      const result = await web.chat.postMessage({
        text: `喵~統神最狂沒有之一`,
        channel: event.channel
      });
    })();
  }
});

slackEvents.on('error', (error) => {
  console.log(error.name); // TypeError
});

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port);

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
})();