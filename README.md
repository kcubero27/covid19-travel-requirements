# Covid19 Travel Requirements 💉

Covid19 Travel Requirements is a small Minimum Viable Product (MVP) where users can send an SMS to a phone number with [country code](https://datahub.io/core/country-list)(ISO 3166-1) and they will receive a summary of restrictions plus a link with further instructions.

## Requirements

For development, you will only need Node.js installed on your environement.
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

## Installation

1. Clone this repo: `$ git clone git@github.com:kcubero27/covid19-travel-requirements.git`
2. Access inside the project: `$ cd covid19-travel-requirements`
3. Select the right Node.js version: use NVM `$ nvm use` or check the version specified package.json under engines
4. Install project dependencies: `$ npm install`

### Configure app

Copy `.env.dist` to `.env` then edit it with your account values.

## Development

Navigate to the project folder and run the following command in the terminal:

    $ npm run start

This will open a new tab in your browser on `http://localhost:1337`.

## Logic

## APIs

### Twilio SMS

[Twilio SMS](https://www.twilio.com/docs/usage/webhooks/sms-webhooks)

### Amadeus travel restrictions

[Amadeus SDK](https://developers.amadeus.com/blog/get-started-amadeus-node-sdk)
[Covid19 and Travel Safety API](https://developers.amadeus.com/self-service/category/covid-19-and-travel-safety/api-doc/travel-restrictions)

## Learnings

1. Twilio SMS API has a limit of characters (1.600) which seems small comparing to the ammount of information that needs to be sent.
2. It is very easy to use Twilio as all the doc is updated and with examples.

## Improvements

- Improve README.md with the steps in order to get the Account SSID and the token from Amadeus API
- Improve logic section with a flow
