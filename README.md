## Description
```
This is a nestjs project with a simple implementation of grpc
```

## Running the project
```
npm run build
npm run start
```

## Testing using grpcc
```
npm install -g grpcc
grpcc -i --proto ./proto/check-divisibility.proto --address localhost:5000
client.checkDivisibility({ "type": "decimal", "number":"12", "divisor": 3}, printReply)
```