
# Zoom Chatbot Tutorial Series (Node.js + Express)

Welcome to the **Zoom Chatbot Tutorial Series**, a hands-on guide to building your own Zoom Team Chatbot using **Node.js** and **Express**.  

This series will teach you how to create, configure, and extend a chatbot that interacts with Zoom Team Chat — from sending messages and handling events to building interactive cards and threaded replies.

---

##  What You’ll Build

By the end of this series, you’ll have a working chatbot that can:

- Post and reply to messages within Zoom Team Chat
- Handle events from users and channels
- Respond to slash commands
- Send interactive messages, markdown, and emojis
- Search messages using the Zoom Team Chat API
- Integrate with external APIs or databases

---

##  Prerequisites

Before starting, make sure you have:

1. A [Zoom Developer Account](https://developers.zoom.us)
2. A **General OAuth App** created in the [Zoom App Marketplace](https://marketplace.zoom.us/)
3. Node.js (v18+ recommended)
4. [ngrok](https://ngrok.com) (or another tunneling service)
5. Your Zoom Chatbot credentials:

   * **Client ID**
   * **Client Secret**
   * **Bot JID**
   * **Verification Token**

---

##  Getting Started

1. **Clone this repo**

   ```bash
   git clone https://github.com/zoom/chatbot-nodejs-quickstart.git
   cd zoomworkplace-chatbot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```bash
   ZOOM_CLIENT_ID=your_client_id
   ZOOM_CLIENT_SECRET=your_client_secret
   ZOOM_BOT_JID=your_bot_jid
   ZOOM_VERIFICATION_TOKEN=your_verification_token
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   FRONTEND_ORIGIN=http://localhost:3000
   ACCOUNT_ID=your_zoom_account_id_here
   ```
> :warning: **Do not store credentials in plain text on production environments**
> 
4. **Start the local server**

   ```bash
   npm start
   ```

5. **Expose your server using ngrok**

   ```bash
   ngrok http 4000
   ```

   Copy the ngrok HTTPS URL and set it as your **Chatbot Endpoint URL** in the Zoom App Marketplace.

---

##  Tutorial Series

| Episode | Title                                | Description                                                                             |
| ------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| 1       | **Setup & Send Messages**            | Set up a basic Express server, connect it to Zoom, and send your first message.         |
| 2       | **Handle Events**                    | Use webhook events to respond dynamically to chat messages.                             |
| 3       | **Slash Commands**                   | Implement custom slash commands to trigger bot actions.                                 |
| 4       | **Markdown & Emojis**                | Format messages beautifully using markdown and emojis.                                  |
| 5       | **Reactions & Interactive Messages** | Capture and respond to reactions and interactive message components.                    |
| 6       | **Threaded Replies**                 | Learn how to reply to specific messages within a thread using the `reply_to` parameter. |
| 7       | **App Shortcut and Team Chat App Modal**               | Enable App shortcut and create Team Chat App Modal.                               |
| 8       | **Search Messages via API**          | Retrieve and filter Zoom Team Chat messages using the API.                                           |
| 9       | **Build a Zoom Workplace App**       | Integrate your chatbot into a Zoom Workplace App for seamless collaboration.            |
---
### Keeping secrets secret

This application makes use of your Zoom App Client ID and Client Secret as well as a custom secret for signing session
cookies. During development, the application will read from the .env file. ;

In order to align with security best practices, this application does not read from the .env file in production mode.

This means you'll want to set environment variables on the hosting platform that you'
re using instead of within the .env file. This might include using a secret manager or a CI/CD pipeline.

> :warning: **Never commit your .env file to version control:** The file likely contains Zoom App Credentials and Session Secrets

---

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

### Documentation
Make sure to review [our documentation](https://marketplace.zoom.us/docs/zoom-apps/introduction/) as a reference when building your Zoom Apps.