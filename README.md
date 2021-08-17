# kafka-sender

Kafka Sender

Project made to receive HTTP Requests and send kafka message, usefull to test kafka integrations on postman

## Instructions for running the project

To run the project in development mode, you only need to execute the following command:

```
yarn
yarn start:dev
```

## Instructions for using the project
After running the project, you must send an post request to /sender with:
```json
{
    "topic": "string",
    "value": [object]
}
```
As the following example with curl:
```
curl --location --request POST 'localhost:5000/sender' \
--header 'Content-Type: application/json' \
--data-raw '{
    "topic": "test",
    "value": {
        "something": "test"
    }
}'
```