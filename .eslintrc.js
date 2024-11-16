// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */

// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */

module.exports = {
	root: true,
	plugins: ['@stylistic/migrate', '@stylistic/ts', '@stylistic/js'],
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: '**/tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@angular-eslint/recommended',
				'plugin:@angular-eslint/template/process-inline-templates',
				'plugin:deprecation/recommended',
				'plugin:typescript-sort-keys/recommended',
				'prettier',
			],
			rules: {
				'deprecation/deprecation': 'warn',
				'@stylistic/js/comma-dangle': [
					'error',
					{
						arrays: 'only-multiline',
						objects: 'only-multiline',
						imports: 'only-multiline',
						exports: 'only-multiline',
						functions: 'never',
					},
				],
				'@stylistic/js/max-len': [
					'error',
					{
						ignorePattern: '^import [^,]+ from |^export | implements |\\}\\s+from',
						code: 150,
					},
				],
				'no-case-declarations': 'off',
				'no-prototype-builtins': 'off',
				'@stylistic/js/no-mixed-spaces-and-tabs': 'off',
				'arrow-body-style': ['error', 'as-needed'],
				'no-console': [
					'error',
					{
						allow: ['warn', 'error'],
					},
				],
				'@angular-eslint/prefer-standalone-component': ['error'],
				'@angular-eslint/component-selector': 'off',
				'@angular-eslint/directive-class-suffix': 'off',
				'@angular-eslint/component-class-suffix': 'off',
				'@angular-eslint/contextual-lifecycle': ['error'],
				'@angular-eslint/sort-lifecycle-methods': ['error'],
				'@angular-eslint/no-empty-lifecycle-method': ['error'],
				'@angular-eslint/no-conflicting-lifecycle': ['error'],
				'@angular-eslint/prefer-output-readonly': ['error'],
				'@angular-eslint/use-lifecycle-interface': ['error'],
				'@angular-eslint/use-pipe-transform-interface': ['error'],
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/restrict-plus-operands': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/unbound-method': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',
				'@typescript-eslint/no-namespace': 'off',
				'@stylistic/ts/indent': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-inferrable-types': 'error',
				'@typescript-eslint/prefer-readonly': 'error',
				'@stylistic/ts/member-delimiter-style': ['error'],
				'@typescript-eslint/array-type': [
					'error',
					{
						default: 'array',
					},
				],
				'@typescript-eslint/explicit-member-accessibility': [
					'error',
					{
						accessibility: 'explicit',
						overrides: {
							accessors: 'explicit',
							constructors: 'off',
							methods: 'explicit',
							properties: 'explicit',
							parameterProperties: 'explicit',
						},
						ignoredMethodNames: [
							'ngOnChanges',
							'ngOnInit',
							'ngDoCheck',
							'ngAfterContentInit',
							'ngAfterContentChecked',
							'ngAfterViewInit',
							'ngAfterViewChecked',
							'ngOnDestroy',
						],
					},
				],
				'@typescript-eslint/consistent-type-assertions': [
					'error',
					{
						assertionStyle: 'as',
						objectLiteralTypeAssertions: 'allow-as-parameter',
					},
				],
				'@typescript-eslint/dot-notation': 'error',
				'@typescript-eslint/member-ordering': [
					'error',
					{
						default: [
							'signature',
							'static-field',
							'abstract-method',
							'static-method',
							'decorated-field',
							'decorated-method',
							'field',
							'constructor',
							'instance-method',
							'method',
						],
					},
				],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'objectLiteralProperty',
						format: ['UPPER_CASE', 'camelCase'],
					},
					{
						selector: 'classProperty',
						format: ['camelCase'],
					},
					{
						selector: 'classProperty',
						modifiers: ['static'],
						format: ['UPPER_CASE'],
					},
					{
						selector: 'classProperty',
						modifiers: ['readonly'],
						format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
					},
					{
						selector: 'classProperty',
						modifiers: ['readonly'],
						format: ['UPPER_CASE', 'PascalCase'],
					},
					{
						selector: 'variable',
						format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
					},
					{
						selector: ['enum', 'interface', 'class', 'enumMember', 'typeAlias'],
						format: ['PascalCase'],
					},
					{
						selector: ['enumMember'],
						format: ['camelCase'],
					},
				],
				'@typescript-eslint/no-non-null-assertion': 'error',
				'@typescript-eslint/no-parameter-properties': 'off',
				'@typescript-eslint/no-shadow': 'error',
				'@typescript-eslint/no-use-before-define': 'error',
				'@typescript-eslint/no-floating-promises': 'warn',
				'@typescript-eslint/prefer-function-type': 'error',
				'@typescript-eslint/explicit-module-boundary-types': 'warn',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@stylistic/ts/quotes': [
					'error',
					'single',
					{
						avoidEscape: true,
					},
				],
				'@stylistic/ts/semi': ['error', 'always'],
				'@typescript-eslint/triple-slash-reference': [
					'error',
					{
						path: 'always',
						types: 'prefer-import',
						lib: 'always',
					},
				],
				prettier: [
					'off',
					{
						endOfLine: 'auto',
					},
				],
				'prettier/prettier': [
					'off',
					{
						endOfLine: 'auto',
					},
				],
				'require-jsdoc': 'off',
			},
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'@angular-eslint/template/prefer-self-closing-tags': ['error'],
				'@angular-eslint/template/prefer-control-flow': ['error'],
			},
		},
		{
			files: ['*.html'],
			excludedFiles: ['*inline-template-*.component.html'],
			extends: ['plugin:prettier/recommended'],
			rules: {
				'prettier/prettier': [
					'error',
					{
						parser: 'angular',
					},
				],
			},
		},
		{
			// https://github.com/cartant/eslint-plugin-rxjs
			files: ['*.ts'],
			plugins: ['rxjs'],
			extends: [],
			// "extends": ["plugin:rxjs/recommended"]
			rules: {
				'rxjs/no-async-subscribe': 'error',
				'rxjs/no-create': 'error',
				'rxjs/no-ignored-notifier': 'error',
				'rxjs/no-ignored-replay-buffer': 'error',
				'rxjs/no-ignored-observable': 'warn',
				'rxjs/no-implicit-any-catch': 'off',
				'rxjs/no-index': 'error',
				'rxjs/no-ignored-takewhile-value': 'off',
				'rxjs/no-nested-subscribe': 'off',
				'rxjs/no-redundant-notify': 'error',
				'rxjs/no-sharereplay': 'error',
				'rxjs/no-subject-unsubscribe': 'error',
				'rxjs/no-unbound-methods': 'warn',
				'rxjs/no-unsafe-subject-next': 'warn',
				'rxjs/no-unsafe-takeuntil': [
					'warn',
					{
						alias: ['untilDestroyed'],
						allow: ['repeat'],
					},
				],
				'rxjs/suffix-subjects': [
					'warn',
					{
						parameters: true,
						properties: true,
						suffix: '$',
						types: {
							'^EventEmitter$': false,
						},
						variables: true,
					},
				],
				'rxjs/throw-error': 'error',
			},
		},
		{
			files: '*.json',
			parser: 'jsonc-eslint-parser',
		},
	],
};
