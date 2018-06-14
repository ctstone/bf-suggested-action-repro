import { BotFrameworkAdapter, MessageFactory } from 'botbuilder';
import * as express from 'express';
import { config } from 'dotenv';

config({ path: `${__dirname}/../.env`})

// Create adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const port = process.env.port || process.env.PORT || 3978;

// Create server
const app = express()
  .post('/api/messages', (req, res) => adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === 'message') {
      const msg = MessageFactory.suggestedActions(['red', 'green', 'blue'], 'Choose a color');
      await context.sendActivity(msg);
    } else {
      await context.sendActivity(`[${context.activity.type} event detected]`);
    }
  }))
  .listen(port, () => {
    console.log(`Listening on ${port}`);
  });
