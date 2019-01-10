const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')
const cors = require('cors');
const user = require('./routes/user');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
   
    const app = express();
    app.use(logger('dev'));
    app.use(bodyParser.json());

    // cors
    app.use(cors());

    // routes
    app.get('/', function (req, res) {
        res.send('running...');
    });
    app.use('/user', user);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    // error handler
    app.use(function (error, req, res, next) {
        res.status(error.status || 500);
        res.json(error);
    });

    app.listen(3000, function () {
        console.log('running at 3000...');
    });

  console.log(`Worker ${process.pid} started`);
}
