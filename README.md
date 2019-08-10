# AjoCard Software Engineer - Ogunola, Taiwo
AjoCard Software Engineer Case Study

## API usage
cd into the ajoCard folder, then run the following commands

```javascript


npm install
nodemon server.js
```
You gonna need POSTMAN client, please download postman or any other HTTP client for testing web services.

## API endpoint usage
# http://localhost:4000/blockchain   -- HTTP method: GET
```javascript


No parameter need
```

## API endpoint usage
# http://localhost:4000/transaction   -- HTTP method: POST
```javascript


You embbed the following parameters inside the body of the POST request in JSON format
{
	"amount": 4555,
	"sender": "ANY senderID: it's assume the the USER is logged in", --> This could be any strings of characters
	"recipient": "ANY recieverID" --> This could be any strings of characters
}
You will be given a token
```

## API endpoint usage
# http://localhost:4000/confirm-trans   -- HTTP method: POST
```javascript


You embbed the following parameters inside the body of the POST request in JSON format
{
	"token": "Slot in your token"
}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
