# Covid19 Travel Requirements 💉

Covid19 Travel Requirements is a small Minimum Viable Product (MVP) where users can send an SMS to a phone number with country code and they will receive a summary of restrictions plus a link with further instructions.

## Requirements

For development, you will only need Node.js installed on your environment.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

    node > 12.0
    npm >= 1.00

### Node.js

[Node.js](http://nodejs.org/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. It now includes [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

We recommend installing NVM instead of Node.js as it allows to have different Node.js versions in your environment.

#### NVM installation

[NVM](https://github.com/nvm-sh/nvm) allows you to quickly install and use different versions of node via the command line.

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

### Ngrok

Ngrok is a cross-platform application that exposes local server ports to the Internet. Their website claims, “[so you can] spend more time programming—one command for an instant, secure URL to your localhost server through any NAT or firewall.”.

There are multiple ways of [downloading](https://ngrok.com/download) Ngrok on your laptop.

## Installation

1. Clone this repo: `$ git clone git@github.com:kcubero27/covid19-travel-requirements.git`
2. Access inside the project: `$ cd covid19-travel-requirements`
3. Select the right Node.js version: use NVM `$ nvm use` or check the version specified package.json under engines
4. Install project dependencies: `$ npm install`

### Configure app

Copy `.env.dist` to `.env` then edit it with your account values.

#### Amadeus account

Create a new account in [Amadeus](https://developers.amadeus.com/). Once created, go to https://developers.amadeus.com/my-apps and create a new app. Later on, you'll be able to see the API Key and API Secret.

#### Twilio account

Create a new account in [Twilio](https://www.twilio.com/). Once it's been created, you'll be able to see the Account SID and Auth Token in your [dashboard](https://www.twilio.com/console).

In order to make the app work, we need a phone number. For that, go to [Develop > Phone numbers > Manage > Active numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/active?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%3Fx-target-region%3Dus1), press on Buy a number, and fill in the form. After the submission of the form, press on the new phone created and fill in the section Messaging > A MESSAGE COMES IN and paste your ngrok http URL such as `http://dfb0-31-214-184-130.ngrok.io/sms` HTTP POST.

## Development

Navigate to the project folder and run the following command in the terminal:

    $ npm run start

This will open a new tab in your browser on `http://localhost:1337`.

In order to expose our app to the internet, we need to use ngrok:

    $ ngrok http 1337

This will provide you two different URLs where your app is accessible from the outside. The http URL will be the one you will paste in Twilio webhook.

## Logic

Users will send an SMS to the Twilio Phone Number such as `+1 833 471 1481` passing through a [Country ISO 3166-1 Code](https://datahub.io/core/country-list). This message will be forwarded to the specified Webhook, in this case, our application. In our application we will execute a request to Amadeus API using that country code in order to get all the restrictions for that country. Once we have a response, we will use the Twilio SDK in order to send a message from our Twilio Phone Number to the user that wrote the message.

## APIs

### Twilio SMS

[Twilio SMS](https://www.twilio.com/docs/usage/webhooks/sms-webhooks)

### Amadeus travel restrictions

[Amadeus SDK](https://developers.amadeus.com/blog/get-started-amadeus-node-sdk)
[Covid19 and Travel Safety API](https://developers.amadeus.com/self-service/category/covid-19-and-travel-safety/api-doc/travel-restrictions)

## Learnings

1. Twilio SMS API has a limit of characters (1.600) which seems small comparing to the amount of information that needs to be sent.
2. It is very easy to use Twilio as all the doc is updated and with examples.
3. There are currently no Spanish phones. However, there is a process where in 4-6 weeks they can provide you one. In my opinion, the experience is worse than using a phone in the US as you may have it in less than a minute.

## Improvements

- Transform the user input country name into a country code.
- Improve the message sent to users so that there is more information. For example, we could create a website with all the info and just send that email to users.
- Amadeus API is only in English which makes this app only usable for english speakers.
