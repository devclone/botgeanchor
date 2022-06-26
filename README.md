# ge-bot
A tool for [ge](https://www.galacticescape.io/)

## Setup
1. Install nodejs latest version download
[here](https://nodejs.org/en/download/current/)

2. Clone this repo and install requirements
```js
git clone https://github.com/thiencntt/botgeanchor.git
cd botgeanchor
npm install
```

3. Config your farmersworld account
- copy accounts.json.example file
```js
cp accounts.json.example accounts.json
```
- edit accounts.json file
```json
[
    {
        "wallet": "your wax wallet",
        "privateKey": "active key"
    }
]
```
#### Note:
- It doesn't work with accounts that managed by [WAX Cloud Wallet](https://wallet.wax.io/). So, You should be use [anchor wallet](https://greymass.com/anchor/) to create your account.
## Run
- run command then open http://localhost:3000 and enjoy it
```js
npm run work
```
