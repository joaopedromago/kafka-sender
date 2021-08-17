# kafka-sender

Kafka Sender

Project made to receive HTTP Requests and send kafka message, usefull to test kafka integrations on postman

## Instructions for running the project

To run the project in development mode, you only need to execute the following command:

```
yarn start:dev
```

To run the project in production mode using PM2, you only need to execute the following command:

```
yarn start:prod
```

The following commands should be used to **stop** and **restart** the project execution in production mode:

```
yarn stop:prod
yarn restart:prod
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