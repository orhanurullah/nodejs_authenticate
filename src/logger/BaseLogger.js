const winston = require('winston');

const BaseLogger = (level, service) => {
    return winston.createLogger({
        level:`${level}`,
        format:winston.format.json(),
        defaultMeta:{service:`${service}-service`},
        transports:[
            new winston.transports.File({
                filename:`src/logs/${service}/error.log`,
                level:'error'
            }),
            new winston.transports.File({
                filename: `src/logs/${service}/info.log`,
                level: 'info'
            }),
            new winston.transports.File({
                filename: `src/logs/${service}/combined.log`,
            })
        ]
    })
}
module.exports = BaseLogger;