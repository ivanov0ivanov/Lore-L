<template>
	<div class="fieldset">
		<div :class="{
			fieldset__field: true,
			focused: focused || inputValue.length > 0
		}">
			<i :class="['icon', icon]"></i>
			<label v-if="label" :for="name">{{ label }}</label>
			<input
				:id="name"
				:name="name"
				:type="type"
				v-model.trim="inputValue"
				@focus="focused = true"
				@blur="focused = false"
			>
		</div>
		<div class="fieldset__error" v-if="validation.$dirty && validation.$invalid">
			{{_errors[0]}}
		</div>
	</div>
</template>

<style lang="stylus" scoped>
color-layout-1-inactive = #dbe1e3
color-layout-1-icon = rgb(189, 203, 211)
color-layout-1-text = rgb(81, 86, 91)

color-layout-2-inactive = #cec5c8
color-layout-2-icon = #c7c0c7
color-layout-2-text = #594e56

color-invalid = rgba(255, 30, 30, 0.6)

.fieldset
	.fieldset__error
		font-size: 0.7em;
		color color-invalid
		margin-top: 4px;
		padding-left: 0.55em;
	.fieldset__field
		position: relative;
		font-size: 24px;
		margin-top: 10px;
		label
		input
		.icon
			transition 200ms all ease-in-out
		label
		.icon
			position: absolute;
			left: 0.55em;
			font-size: 1.3em;
			text-transform: uppercase;
		.icon
			bottom: 0.7em;
			opacity: 1
		label
		input
			font-family: Roboto, Verdana, sans-serif;
			font-weight 100;
			font-size: 1em;
		input
			background: none;
			outline: none;
			box-shadow inset 0 2px 5px -1px rgba(0, 0, 0, 0.1)
			border-radius: 9px;
			width: 100%;
			box-sizing border-box
			margin-top: 1.2em;
			padding: 24px;
			padding-left: 3em;
			border: 2px solid
		label
			position: absolute;
			display: block;
			width: 100%;
			box-sizing: border-box;
			top: 2.2em;
			padding-left: 2.3em;
			cursor: text
			transition: 200ms all ease-in-out, 170ms top ease-in-out
		&.focused
			.icon
				opacity: 0;
			input
				padding-left: 24px;
			label
				top: 0;
				padding-left: 0;
				transition: 200ms all ease-in-out, 170ms padding ease-in-out
				font-size: 0.8em;

.layout-1 .fieldset
	.fieldset__field
		input
			color color-layout-1-text
			border-color: color-layout-1-inactive;
		label
		.icon
			color: color-layout-1-icon
		&.focused label
			color: color-layout-1-inactive;

.layout-2
	.fieldset__field
		input
			color color-layout-2-text
			border-color: color-layout-2-inactive;
		label
		.icon
			color: color-layout-2-icon
		&.focused label
			color: color-layout-2-inactive;
</style>

<script>
export default {
	data () {
		return {
			'inputValue': this.value,
			focused: false
		}
	},
	props: {
		'type': { type: String, default: 'text' },
		'label': { type: String, default: '' },
		'value': { type: String, default: '' },
		'name': { type: String, default: 'input[]' },
		'icon': { type: String, default: 'icon-floppy' },
		'validation': {
			type: Object, default: () => ({ $dirty: false, $invalid: null })
		},
		'errors': { type: Array, default: () => [] },
	},
	watch: {
		inputValue (val) {
			this.$emit('input', val)
		}
	},
	computed: {
		_errors () {
			return this.errors.filter(a => a)
		}
	}
}
</script>
