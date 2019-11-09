const Amqp = require('@common/broker/common.broker.js')

class RabbitMQService extends Amqp {
    constructor() {
        super();
        this.pubSubMessageServer.bind(this);
        this.pubSubMessageClient.bind(this);
    }

    async pubSubMessageServer(queueName, data) {
        await this.createConnection();
        await this.createChannelRPCServer(queueName);
        const channel = this.channel;

        return new Promise((resolve, reject) => {
            return this.channel.consume(queueName, function reply(msg) {
                const r = 'Response ' + msg.content.toString();

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(r.toString()), {
                        correlationId: msg.properties.correlationId
                    });

                channel.ack(msg);
                console.log(r);

                resolve();
            });
        });
    }

    async pubSubMessageClient(queueName, data, correlationId) {
        await this.createConnection();
        await this.createChannelRPCClient(queueName);

        const con = this.connection;
        const channel = this.channel;

        return new Promise((resolve, reject) => {
            // const res = this.channel.consume(queueName, function(msg) {
            //     if (msg.properties.correlationId == correlationId) {
            //         console.log(' [.] Got %s', msg.content.toString());
            //         setTimeout(function() {
            //             con.close();
            //             process.exit(0)
            //         }, 10000);
            //     }
            // }, {
            //     noAck: true
            // });

            channel.sendToQueue(queueName,
                Buffer.from(data.toString()), {
                    correlationId: correlationId,
                    replyTo: queueName
                });

            resolve();
        });
    }
}

// const publishToChannel = async({ routingKey, exchangeName, data }) => {

//     await amqp.rabbitmq;
// }

module.exports = RabbitMQService;