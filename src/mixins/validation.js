import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

const passwordCharsValidator = password => {
	let match = password.match(/\w+/)
	if (match && match[0] === password)
		return true
	return false
};

export const availableValidations = {
	username: {
		required,
		minLength: minLength(2)
	},
	password: {
		required,
		minLength: minLength(6),
		passwordCharsValidator
	},
	passwordRepeat: {
		required,
		minLength: minLength(6),
		passwordCharsValidator,
		sameAs: sameAs('password')
	},
	captcha: {
		required,
	},
}

export default () => ({
	mixins: [validationMixin],
	validations() {
		const {
			username, password, passwordRepeat, captcha
		} = availableValidations
		let validations = {
			username, password, captcha
		}
		if (this.isSignup)
			validations.passwordRepeat = passwordRepeat
		return validations
	},
	methods: {
		minLength (field, count) {
			return !field.minLength &&
				this.getLocaleString('validation.minLength' + count, `Минимум ${count} символов`)
			},
		required (field) {
			return !field.required &&
				this.getLocaleString('validation.required', `Это обязательное поле`)
		},
		sameAs (field) {
			return !field.sameAs &&
				this.getLocaleString('validation.passwordRepeat', `Пароли не совпадают`)
		},
		passwordChars (field) {
			return !field.passwordCharsValidator &&
				this.getLocaleString('validation.passwordChars', `Пароль должен содержать только латинские буквы и цифры`)
		},
		exists(is) {
			return !is && this.getLocaleString('validation.userExists', `Такой пользователь не найден. Зарегистрируйтесь`)
		}
	}
})
