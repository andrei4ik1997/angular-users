module.exports = {
	extends: ['stylelint-config-sass-guidelines'],
	plugins: ['stylelint-scss', 'stylelint-order'],
	rules: {
		'order/order': [
			'dollar-variables',
			'at-rules',
			'less-mixins',
			'at-variables',
			'custom-properties',
			'declarations',
			'rules',
		],
		'order/properties-order': null,
		'max-nesting-depth': 15,
		'selector-max-compound-selectors': 15,
		'selector-class-pattern': null,
		'property-no-vendor-prefix': null,
		'value-no-vendor-prefix': null,
		'scss/at-rule-no-unknown': null,
		'scss/at-mixin-pattern': null,
		'scss/at-extend-no-missing-placeholder': null,
		'scss/selector-no-redundant-nesting-selector': null,
		'scss/dollar-variable-pattern': null,
		'declaration-property-value-disallowed-list': null,
		'order/properties-alphabetical-order': true,
		'block-no-empty': null,
		'selector-no-qualifying-type': [
			true,
			{
				ignore: ['class', 'attribute'],
			},
		],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['ng-deep'],
			},
		],
		'color-named': 'always-where-possible',
		'length-zero-no-unit': [
			true,
			{
				ignore: ['custom-properties'],
			},
		],
		'selector-max-id': 3,
	},
};
