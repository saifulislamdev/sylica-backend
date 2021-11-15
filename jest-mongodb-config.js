export default {
	mongodbMemoryServerOptions: {
		binary: {
			version: '4.1.4',
			skipMD5: true,
		},
		autoStart: false,
		instance: {
			dbName: 'jest',
		},
	},
};
