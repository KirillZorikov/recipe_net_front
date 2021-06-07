<template>
  <div class="wrapper">
    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form" @submit.prevent="handleRegister">
        <div class="mb-3 row">
          <label for="inputName" class="col-sm-2 col-form-label">Имя</label>
          <div class="col-sm-9 ms-3">
            <input
                v-model="user.first_name"
                type="text"
                class="form-control"
                id="inputName">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputUsername" class="col-sm-2 col-form-label">Имя пользователя</label>
          <div class="col-sm-9 ms-3">
            <input
                v-model="user.username"
                type="text"
                class="form-control"
                id="inputUsername"
            >
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-9 ms-3">
            <input
                v-model="user.email"
                type="email"
                class="form-control"
                id="inputEmail"
            >
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
          <div class="col-sm-9 ms-3">
            <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="inputPassword"
            >
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword2" class="col-sm-2 col-form-label">Повторите пароль</label>
          <div class="col-sm-9 ms-3">
            <input
                v-model="password2"
                type="password"
                class="form-control"
                id="inputPassword2"
            >
          </div>
        </div>

        <div v-if="message.recaptcha" class="alert alert-danger mb-2 w-100"
             role="alert">
          {{ message['recaptcha'].join() }}
        </div>
        <div class="form-group g-recaptcha input-group"
             data-sitekey="6LdB0Q0aAAAAADNyqvkOzqNuhJnHglBjzY-LVzqn"></div>
        <div class="d-flex justify-content-center mt-4">
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Зарегистрироваться</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "Register",
  title: 'Регистрация',
  data() {
    return {
      user: new User(),
      loading: false,
      message: '',
      password2: ''
    };
  },
  mounted() {
    new Promise((resolve, reject) => {
      const $script = document.createElement('script')
      $script.src = 'https://www.google.com/recaptcha/api.js'
      resolve(document.head.appendChild($script));
      setTimeout(() => reject(new Error("Google reCaptcha не инициализирована")), 3000);
    });
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleRegister(submitEvent) {
      let recaptcha = submitEvent.target.elements['g-recaptcha-response'].value
      if (!recaptcha) {
        this.message = {'recaptcha': ['Введите капчу!']}
        return
      }
      this.user.recaptcha_key = recaptcha
      this.user.password2 = this.password2
      this.loading = true;
      this.$store.dispatch('auth/register', this.user).then(
          () => {
            this.$store.dispatch('auth/login', this.user).then(
                () => {
                  this.$router.push({name: 'Home', params: {message: 'Вы успешно зарегистрировались!'}});
                },
                () => {
                  this.$router.push('/login');
                }
            )
          },
          error => {
            this.loading = false;
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );
    }
  }
}
</script>

<style scoped>

</style>