# Customer Support Chatroom

## About
This is a customer support chatroom designed with the purpose of serving people when they find difficulty in connecting to the nearby stores. This chatroom service can be used by both client and user to easily communicate with each other and get the issues resolved or get the work done more efficiently. Apart from chat if the client wishes to get an update on Call or SMS he can subscribe for the features using this chatroom actions.

### How it works

This application uses Node.js and  Express.js for server side and React.js for client side execution.


![Image mage 5](https://github.com/Jasmin2895/twilio-support-chat/blob/master/public/Screenshot%202020-05-01%20at%209.05.34%20AM.png)


## Features
- Node.js web server using [Express.js](https://npm.im/express)
- User interface using ReactJs and Semantic-UI
- User interface schdeule calls.
- User interface schdeule message updates
- Linting and formatting using [ESLint](https://npm.im/eslint) and [Prettier](https://npm.im/prettier)
- Interactive configuration of environment variables upon running `npm run setup` using [`configure-env`](https://npm.im/configure-env)
- Project specific environment variables using `.env` files and [`dotenv-safe`](https://npm.im/dotenv-safe) by comparing `.env.example` and `.env`.

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

There are twilio config values required to run the application.

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier .                                                         |
| Auth&nbsp;Token   | Used to authenticate ).                                                         |
| Phone&nbsp;number | A Twilio phone number |
| Twiml&nbsp;id | A Twiml application id |
| Chat&nbsp;Service&nbsp;id | A Chat application id |

### Local development

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/Jasmin2895/twilio-support-chat.git
cd twilio-support-chat
```

2. Install dependencies

```bash
npm install
```
3. Set your environment variables. Replace the ids in the `.env` file with values ontained from twilio account.

```bash
cp .example.env .env
```
4. Run the server side and client side respectively. 

```bash
node serve.js
```

```bash
npm start
```
This project uses `proxy` so the server side will running on port `3002` and client side on port `3000`.

5. This project uses **mongodb** so set up mongodb locally and in the file `db.js` replace username and password with your username and password.

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)


