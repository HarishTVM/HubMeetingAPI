#!/bin/env node
"esversion:6";
"strict mode";

const config = require('./web-config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const cluster = require('cluster');

if (cluster.isMaster){
  // Count the machine's CPUs
  const CPUcount = require('os').cpus().length;     
  for(var i=0; i<CPUcount; i++)  // Create a worker for each CPU
        cluster.fork();  
}
else{		
    // Server Creation
    const server = restify.createServer({
        name: config.app.name,
        version: config.app.version,
    });

    // Middleware
    server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
    server.use(restifyPlugins.acceptParser(server.acceptable));
    server.use(restifyPlugins.queryParser({ mapParams: true }));
    server.use(restifyPlugins.fullResponse());

    // Server Starts to Listen
    server.listen(config.app.port, () => {
        // establish connection to mongodb
        // mongoose.Promise = global.Promise;
        // mongoose.connect(config.db.uri, { useMongoClient: true });

        // const db = mongoose.connection;

        // db.on('error', (err) => {
        //     console.error(err);
        //     process.exit(1);
        // });

        // db.once('open', () => {
            require('./api-route')(server);
            console.log(`Server is listening on port ${config.app.port}`);

            // Universal Handler
            server.on('InternalServer', function(req, res, err, callback) {
                console.log("inside Internal server error");
                // TODO Error logs and send mail
            });

            server.on('restifyError', function(req, res, err, callback) {
                console.log("inside Restify server error");
                // TODO Error logs and send mail
            });
        //});
    });

}

//Listen for dying workers
cluster.on('exit', function (worker) {
    if(config.app.appStage){		
        console.warn("Worker with ID "+worker.id+" died :(");
        console.warn("\n:::::::::::: Server Restarting ::::::::::::\n");
    }
    // Replace the dead worker, 
    cluster.fork();
});