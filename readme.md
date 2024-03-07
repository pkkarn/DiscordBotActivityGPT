# How to install

- npm install
- add config.json file with following data:

```
{ 
    "clientId": "xxx", 
    "guildId": "xxxx", 
    "token": "bot token" 
}
```

- and .env file with following data:

```
MONGO_CONNECTION=mogno_uri
MONGO_PASSWORD=mongo_pasword
OPENAI_KEY=sk-openai_key
```

- authenticate bot with server
- run node register.js
- run node index.js
