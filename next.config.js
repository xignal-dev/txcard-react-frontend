const withFonts = require('next-fonts');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')(["react-icons"]);

const nextConfig = {
	workboxOpts: {
		swDest: 'static/service-worker.js',
    // devIndicators: {
    //   autoPrerender: false,
    // },
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'networkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}
		]
	},
	experimental: {
		modern: true
	}
};

module.exports = withFonts(withOffline(nextConfig));
