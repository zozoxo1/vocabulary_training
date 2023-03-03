const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	pluginOptions: {
		cordovaPath: 'src-cordova',
	},
	publicPath: process.env.PUBLIC_URL || '/',
	transpileDependencies: ['vuetify'],
})
