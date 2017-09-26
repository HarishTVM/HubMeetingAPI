#!/usr/bin/env node
"strict mode";
"esversion:6";

var env = "Development";

module.exports.envType = env;

module.exports.database = {
	url: 'mysql://root:Pass1234@localhost/sample',
	options: {
		define: {
			freezeTableName: true
		},
		pool: {
			max: 30,
			min: 0,
			idle: 10000
		  },
	}
};

module.exports.app = {
	name: 'API',
	version: '1.0.0',
	enableSSL: false,
	port: 9000,
	appStage: true, // true for development and false for live
	httpsCert: {
		cert: './certificates/certificate.pem',
		key: './certificates/privatekey.pem',
	}
};

module.exports.errorLog = {
	filePath: "./Errorlog/log.txt",
};