require('dotenv').config();
const amqp = require('@common/broker/common.broker.js')

const listenForResults = async() => {
        await amqp.rabbitmq.channel.prefetch(1);
        // start consuming messages
        await consume();
    }
    // consume messages from RabbitMQ
const consume = async() => {
    return new Promise((resolve, reject) => {
        amqp.rabbitmq.consume(process.env.RABBITMQ_USER_QUEUE, reply = async(msg) => {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
            let requestId = data.requestId;
            let processingResults = data.processingResults;
            console.log('Received a result message, requestId:', requestId, 'processingResults:', processingResults);

            // acknowledge message as received
            await amqp.rabbitmq.channel.ack(msg);
        });

        // handle connection closed
        amqp.rabbitmq.connection.on('close', (err) => {
            return reject(err);
        });

        // handle errors
        amqp.rabbitmq.connection.on('error', (err) => {
            return reject(err);
        });
    });
}