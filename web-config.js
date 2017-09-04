#!/usr/bin/env node
"strict mode";
"esversion:6";

var path = require('path');
var env = "Development";

module.exports.envType = env;

module.exports.database = {
	url: 'mongodb://192.168.0.3:27017/routejoot-dev',
	options: {
		db: { native_parser: true, safe: true },
		server: {
			poolSize: 30,
			reconnectTries: 100,
			connectTimeoutMS: 30000,
			socketOptions: {
				keepAlive: 120,
				reconnectInterval: 1000,
			}
		},
		user: 'rjreadwriter',
		pass: 'rjrw22102015'
	}
};

module.exports.randomNumber = {
	length: 6,
	containers: '7028361495'
};

module.exports.OTP = {
	length: 8,
	containers: 'D01U2JKQZMNO56RST789LAB4CFGE3HIPVWXY'
};

module.exports.sendInBlue = {
	apiKey: 'jGsI4LqayOAE1xkZ',
	timeOut: 5000,
	mail: {
		welcome_mail_id: 5,
		forgot_password_mail_id: 4,
		share_ride_id: 6,
		error_mail: 7
	}
};

module.exports.feedbackMail = {
	serviceProvider: "Gmail",
	sender: "Routejoot Enquiry",
	connectionString: "smtps://no-reply@routejoot.com:Noreplay@routejoot@smtp.gmail.com",
	files: {
		info: './html-containers/mail-content.html',
	},
	to: "contact@routejoot.com",
	subject: "Enquiry"
};

module.exports.errorMail = {
	serviceProvider: "Gmail",
	sender: "RoutejootFeedBack",
	connectionString: "smtps://no-reply@routejoot.com:Noreplay@routejoot@smtp.gmail.com",
	files: {
		info: './html-containers/error-content.html',
	},
	to: "naveen.k@inflexiontech.com, anbu@inflexiontech.com, vijay@inflexiontech.com",
	subject: "Error In Routejoot " + env + " Environment"
};

module.exports.thumbnail = {
	width: 250,
	height: 250
};

module.exports.rabbitMQ = {
	notificationConnectionURL: 'amqp://routejoot-staging:01Explore@192.168.0.54:5672/',
	routeSnapperConnectionURL: 'amqp://routejoot-staging:01Explore@192.168.0.54:5672/',
	notificationQueue: 'routejootNotificationQueue',
	snapperQueue: 'routejootRouteSnapperQueue',
	notificationRoutingKey: 'routejoot_notification',
	snapperRoutingKey: 'routejoot_route_snapper',
	exchange: 'RoutejootExchange',
	messageType: 'fanout',
	separator: '~'
};

module.exports.app = {
	name: 'API',
	version: '1.0.0',
	enableSSL: false,
	port: 8080,
	appStage: true, // true for development and false for live
	httpsCert: {
		cert: './certificates/certificate.pem',
		key: './certificates/privatekey.pem',
	},
	GoogleGeoCodeUrl: '/maps/api/geocode/json?latlng=',
	GCMmapKey: '&key=AIzaSyCl8W_aMm9T7maOUL7VnRatEQ4V9HWhMKU',  // staging/QA/development
	//GCMmapKey:'&key=AIzaSyDsNxZrB7EqnrwkwrDU7ops3imzCuDS4i4', // Live
	GcmOptions: {
		host: 'maps.googleapis.com', path: ''
	}
};

module.exports.gcmApi = {
	GCMPlaces: {
		url: '/maps/api/place/nearbysearch/json?',
		location: 'location=',
		radius: '&radius=',
		type: '&type='
	},
	GCMDirections: {
		url: '/maps/api/directions/json'
	},
	GCMPlacesAutocomplete: {
		url: '/maps/api/place/autocomplete/json'
	},
	GCMKey: '&key=AIzaSyCl8W_aMm9T7maOUL7VnRatEQ4V9HWhMKU', // staging/QA/development
	//GCMKey:'&key=AIzaSyDsNxZrB7EqnrwkwrDU7ops3imzCuDS4i4', // Live
	GCMOptions: {
		host: 'maps.googleapis.com', path: ''
	}
};

module.exports.redirectLocation = {
	ERROR: 'http://192.168.0.82:3000/error.html',
	RESET_PASSWORD: 'http://192.168.0.82:3000/app/views/reset-password.html?userId=',
	TRACK_Ride_URL: 'http%3A%2F%2F192.168.0.82%3A3000%2Fapp%2F%23%2FwatchRide%3Fride_id%3D' //%3A --> :, %3F --> ?, %2F --> /, %23 --> #, %3D --> =, %21 --> !
};

module.exports.errorLog = {
	filePath: "./Errorlog/log.txt",
};

module.exports.registration_type = {
	ROUTEJOOT: 1,
	SSO: 2
};

module.exports.dummyImage = {
	width: 250,
	height: 250,
	imgFormat: "png"
};

module.exports.aws = {
	s3: {
		params: { Bucket: 'testing.assets.routejoot' }
	},
	ride_settings: {
		root_path: "user_assets/{0}/rides/{1}", // {0} UserId, {1} RideId
		image_path: "/images/",
		thumbnail_path: "/thumbnail/",
		video_path: "/video/"
	}
};

module.exports.SMSmessages = {
	activation_code_message: "Your Routejoot verification Code is {0}. #RouteJoot",
	group_invite_message: "{0} has started using RouteJoot app and added you in his riding club {1}. Explore RouteJoot app Today http://onelink.to/54uaaw. #RouteJoot",
	group_re_invite_message: "{0} has started using RouteJoot app and added you in his riding club {1}. Explore RouteJoot app Today http://onelink.to/54uaaw. #RouteJoot",
	share_ride_message: "{0} is on ride. Follow this rider using this link {1}. #RouteJoot",
	end_ride_message: "{0} has ended the ride. To view the ride click here {1}. #RouteJoot"
};

module.exports.Bitly = {
	url: "https://api-ssl.bitly.com/v3/shorten?",
	access_token: "d4fdcc7be0fea3cdebbd68ae5c8c485a96fdfb42"
};

module.exports.twoFactor = {
	apiKey: 'e1567280-1a97-11e7-9462-00163ef91450',
	sender_id: 'RTJOOT',
	is_enabled: false,
	urls: {
		otp_sms_url: '/API/V1/{key}/SMS/{number}/{code}/{template}',
		tran_sms_url: '/API/V1/{key}/ADDON_SERVICES/SEND/TSMS'
	},
	templates: {
		otp_template: 'OTPSmsTemplate',
		group_invite_template: 'GrpInvite',
		shareride_template: 'ShareRide',
		endride_template: 'EndRide'
	}
};