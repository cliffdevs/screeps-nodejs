# Screeps AI NodeJS

This is an AI for Screeps built in NodeJS. This circumvents some of the limitations imposed by the Screeps engine, such as a flat file hierarchy and the inability to write tests, by using Gulp to package local code into flattened output.

## Setup

### Credentials

Credentials are loaded from `credentials.js`:

```javascript
module.exports = {
  email: process.env.SCREEPS_EMAIL,
  token: process.env.SCREEPS_TOKEN,
  branch: "default",
  ptr: false

  // private server only options below
  // host: 'someprivateserver.com',
  // port: 9000,
  // secure: false
  // password: process.env.SCREEPS_PASSWORD,
};
```

As you can see emails, passwords, and access tokens are read from environment variables. It's better not to provide these details in the credentials file, since they are secrets, and committing them to Screeps or Github could be bad. Export these attributes as environment variables in your shell, ex: `.bashrc`, `.bash_profile`, `.zshrc`, etc. If on Windows (and not in Linux Subsystem for Windows), search environment variables in the start menu and set it up in your own way.

### Tools

Install NodeJS v10. I prefer to use Node Version Manager to acquire this. Then install Gulp.

## Build

`yarn install`

## Test

`yarn test`

## Deploy

`gulp`
