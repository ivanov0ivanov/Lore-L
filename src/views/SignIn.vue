<template>
<div class="container">
	<div :class="'layout-' + layout">
		<!-- <language-selector/>
		не видно из-за привязки стилей селектора к домашней-->
		<logo/>
		<div class="wrapper">
			<div class="wrapper-signup">
				<h2 class="title">
					{{ `${isSignup ?
						$t('signin.registration'):
						$t('signin.enter')
					}`
					}}
				</h2>
				<form @submit.prevent="submit">
					<!--
					<zn-input
						icon="класс иконки которую использовать"
						:label="getLocaleString(ключ в файле локализации, строка по умолчанию)"
						v-model="привязка значения к библиотеке валидации"
						name="название поля для формы"
						:validation="передача данных о валидации компоненту ввода"
						:errors="[
							массив строк ошибок или false-ов если все в порядке
						]"
					/>
					-->
					<zn-input
						icon="icon-user"
						:label="$t('signin.username')"
						v-model="$v.username.$model"
						name="username"
						:validation="$v.username"
						:errors="[
							required($v.username),
							minLength($v.username, 2)
						]"
					/>
					<zn-input
						icon="icon-password"
						:label="$t('signin.password')"
						v-model.lazy="$v.password.$model"
						type="password"
						name="password"
						:validation="$v.password"
						:errors="[
							required($v.password),
							passwordChars($v.password),
							minLength($v.password, 6),
						]"
					/>
					<zn-input
						v-if="isSignup"
						icon="icon-password"
						:label="$t('signin.passwordRepeat')"
						v-model="$v.passwordRepeat.$model"
						type="password"
						name="passwordRepeat"
						:validation="$v.passwordRepeat"
						:errors="[
							required($v.passwordRepeat),
							minLength($v.passwordRepeat, 6),
							passwordChars($v.passwordRepeat),
							sameAs($v.passwordRepeat),
						]"
					/>
					<div class="field-group">
						<zn-input
							icon="icon-captcha"
							:label="$t('signin.captcha')"
							v-model="$v.captcha.$model"
							name="captcha"
							:validation="$v.captcha"
							:errors="[
								required($v.captcha)
							]"
						>
						</zn-input>
						<div class="captcha">
							<img
								:src="captchaImage"
								alt="c4ptch4" />
						</div>
					</div>
					<!-- серверное сообщение о ошибке -->
					<div
						class="error-message"
						v-if="authenticationState.state"
					>
						<span>{{authenticationState.message}}</span>
						<router-link
							v-if="authenticationState.state === 'EXISTS'"
							to="/login">
							{{$t('signin.userExists')}}
						</router-link>
					</div>
					<button
					class="submit" type="submit"
					:disabled="$v.$invalid">
						{{ `${isSignup ?
								$t('signin.signupConfirm'):
								$t('signin.signinConfirm')
							}`
						}}
					</button>
				</form>
				<!-- ссылки на соц авторизацию -->
				<div class="oauth">
					<h5>
						{{ `${isSignup ?
								$t('signin.socialSignUp'):
								$t('signin.socialSignIn')
							}`
						}}
					</h5>
					<div class="flex oauth__icons">
						<a
							v-for="{name, to, icon} in providers"
							:key="name"
							:href="to"
						>
							<img
								class="oauth__icon"
								:src="icon" :alt="name"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<!-- <style src="../assets/css/register-login.css" scoped></style> -->
<style lang="stylus">
// стилус можно скомпилировать и вынести в отдельный CSS файл
// что и сделано с register-login.css, который является общим стилем для Register.vue и Login.vue

// defined in ZInput.vue too
// переменные
color-invalid = rgba(255, 30, 30, 0.6)

color-layout-1-button = #36d6c9
color-layout-2-button = #d354e7


.layout-1
	.wrapper-signup
	.wrapper-signin
		.submit
			background: color-layout-1-button;
			&[disabled]
				background: lighten(desaturate(@background, 50%), 50%)
		.field-group .captcha img
			background: #f3f7f8;

.layout-2
	.wrapper-signup
	.wrapper-signin
		.submit
			background: color-layout-2-button;
			&[disabled]
				background: lighten(desaturate(@background, 50%), 50%)
		.field-group .captcha img
			background: #f8f3f7;


.wrapper
	padding-bottom: 40px;

.wrapper-signup
.wrapper-signin
	margin: 0 auto;
	margin: auto 20px;
	padding: 40px;
	padding-bottom: 10px;
	border-radius: 18px;
	font-size: 28px;
	box-shadow: 7px 7px 25px rgba(0,0,0,.18);
	background-color: #fff;
	font-family  Roboto,sans-serif
	.title
		font bolder 1.85em
		color: rgb(56, 58, 67);
		text-align: center;
	.field-group
		display: flex;
		flex-wrap wrap
		.field
			flex: 3 1;
		.captcha
			margin-top: 1.4em;
			display: block;
			padding: 0 10px;
			flex: 1 1;
			img
				display: block;
				object-fit: contain;
				height: 100%;
				max-width: 100%;
				border-radius: 9px;
	.error-message
		font-size: 0.6em;
		text-align: center;
		display: block;
		margin-top: 30px;
		color: color-invalid;
	.submit
		background: none;
		display: block;
		text-align: center;
		font-family: "Roboto";
		font-size: 28px;
		line-height: 80px;
		margin-top: 40px;
		padding: 0 1em;
		width: 100%;
		color white
		border: none;
		border-radius: 40px;
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
		text-transform: uppercase;
	.oauth
		margin-top: 40px;
		text-align: center;
		h5
			font-weight: normal;
			font-size: 1em;
			color rgb(81, 86, 91)
		.oauth__icons
			display: flex;
			justify-content: center;
			.oauth__icon
				display: block;
				height: 92px;
				width: @height; // @stylus, использует значение обозначенного выше (включая иерархию стилуса) свойства
				margin: 30px;
				border-radius: 50%;

</style>

<script>
import { mapGetters, mapActions } from 'vuex'

import ZInput from '../components/ZInput'
import validations from '../mixins/validation'


export default {
	mixins: [validations()],
	data() {
		return {
			// префикс всех ключей локализации
			// по факту проще использовать полные ключи
			//old release
			// domain: 'signin',

			// флаг с какой кнопки пришел пользователь
			// query ?register=true показывает форму регистрации
			isSignup: Boolean(this.$route.query.register),
			usernameExists: false,

			// данные формы
			username: '',
			password: '',
			passwordRepeat: '',
			captcha: '',

			// oauth providers array
			// `to` указывает ссылку от корня сайта к url которую обрабатывает наш сервер
			// наш сервер отправляет пользователя на oauth авторизацию,
			// откуда сервер провайдера возвращает пользователя на наш сервер, на сконфигурированный на нашем сервере адрес
			// если авторизация прошла успешно, наш сервер отправляет пользователя на указанную нами страницу
			providers: [{
				name: 'GitHub',
				to: '/oauth/github',
				// можно поменять на `/img/oauth-${this.layout}/github.png`
				// чтобы брать разные картинки для разных шаблонов из папок oauth-1,2..
				icon: '/img/oauth/github.png'
			}, {
				name: 'Google',
				to: '/oauth/google',
				icon: '/img/oauth/google.png'
			}]
		}
	},
	watch: {
		username (newValue) {
			// проверка имени пользователя на наличие в базе
			// стоит debounce-нуть чтобы не слать пока пользователь еще пишет имя
			this.testingUsername = true
			window.axios.get('/user?test=' + newValue)
				.then(resp => {
					if (resp.data.exists) {
						this.isSignup = false
						return this.usernameExists = true
					}
					this.usernameExists = false
					this.isSignup = true
				})
				.finally(() => this.testingUsername = false)
		}
	},
	computed: {
		// ..личные геттеры компонента
		captchaImage() {
			return '/getCaptcha?' + this.captchaQuery
		},
		// привязка геттеров vuex
		...mapGetters([
			'getLocaleString',
			'captchaQuery',
			'layout',
			'authenticationState'
		])
	},
	components: {
		// компонент-обертка инпута
		'zn-input': ZInput
	},
	methods: {
		// действия vuex
		...mapActions(['signup', 'signin']),
		// отправка формы
		submit() {
			this.$v.$touch() // проверить все поля
			// если есть некоректные, отменить отправку
			if (this.$v.$invalid)
				return
			const {
				username,
				password,
				passwordRepeat,
				captcha
			} = this
			// отправляем данные в действие vuex
			const action = this.isSignup ? 'signup' : 'signin'
			// this['signup'] к примеру -> this.signup
			this[action]({
				username,
				password,
				passwordRepeat,
				captcha
			})
				.then(() => {
					// если все прошло успешно, переходим на страницу X
					this.$router.push('/user')
				})
				// пропускаем ошибки авторизации в компоненте
				.catch(() => (null))
		},
	}
}
</script>
