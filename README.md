## Description
This is a nestjs project with a simple implementation of grpc

## Running the project
> npm run build

> npm run start

## Testing using grpcc
- install command line client for testing grpc apis
```
npm install -g grpcc
```
- connect to grpcc using the service's .proto file, which describes the RPC service, and the address (host:port) of the service
```
grpcc -i --proto ./proto/check-divisibility.proto --address localhost:5000
```
- sample tests:

```
client.checkDivisibility({ "type": "decimal", "number":"12", "divisor": 3}, printReply) // true

client.checkDivisibility({ "type": "binary", "number":"101", "divisor": 2}, printReply) // false
```