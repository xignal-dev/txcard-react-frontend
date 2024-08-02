const presets = [
	['next/babel', {
		'preset-env': {
			targets: {
				esmodules: true
			},
			corejs: 3,
			useBuiltIns: 'usage'
		}
	}]
];

const plugins = [
	['babel-plugin-styled-components', 
    {
      ssr: true,
      pure: true
    }
  ],
  [
    "@babel/plugin-proposal-class-properties",
    { "loose": true },
  ],
  [
    "@babel/plugin-proposal-decorators",
    { "legacy": true },
    // { "version": "legacy" }
  ],
];

module.exports = {presets, plugins};
