module.exports = {
	root: true,

	env: {
		'jest/globals': true,
	},

	extends: [
		// recommended on frontend project
		'plugin:prettier/recommended',
		'prettier',
		'prettier/react',
		'plugin:react-hooks/recommended',
	],

	plugins: ['react', 'prettier', 'react-hooks', 'jest', 'flowtype'],

	settings: {
		react: {
			version: 'detect',
		},
	},

	rules: {
		'prettier/prettier': 'error',
		'import/no-namespace': 'error',
		'react/jsx-filename-extension': 'off',
		'react/jsx-no-bind': ['error', {ignoreDOMComponents: true}],
		'jsx-quotes': ['error', 'prefer-double'],
		'space-before-function-paren': [
			'error',
			{anonymous: 'never', named: 'never', asyncArrow: 'always'},
		],
		'generator-star-spacing': ['error', {before: false, after: true}],
	},
}
