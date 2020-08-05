function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

function isNoCluster() {
  return process.env.NO_CLUSTER === 'true'
}

function startHTTPServer(app, ipAddress, port) {
  const http = require('http'),
    httpServer = http.createServer(app);

  return httpServer.listen(port, ipAddress, function () {
    console.log('\033[1m' + 'HTTP server is running at ' + ipAddress + ':' + port + '\033[m');
  });
}

function runApp() {
  const app = require('./app'),
    ipAddress = '0.0.0.0',
    port = Number(process.env.PORT || 5000);

  startHTTPServer(app, ipAddress, port);
}

if (isDevelopment() || isNoCluster()) {
  console.log(`Environment: ${process.env.NODE_ENV} Cluster: ${!Boolean(process.env.NODE_ENV)}`)
  runApp();
} else {
  const cluster = require('cluster'),
    nCpu = require('os').cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < nCpu; i++) {
      cluster.fork(); //starting new for every CPU
    }

    cluster.on('listening', function (worker) {
      console.log(new Date() + ' Worker ' + worker.process.pid + ' listening');
    });

    cluster.on('exit', function (diedWorker) {
      console.log(new Date() + ' Worker ' + diedWorker.process.pid + ' just crashed');
      cluster.fork(); //starting a new worker.
    });
  } else {
    //inside a forked process
    runApp();
  }
}
