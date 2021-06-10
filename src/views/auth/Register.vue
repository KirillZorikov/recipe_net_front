<template>
  <div class="wrapper mb-5">
    <h1 class="fw-bold mt-5 mb-5 ms-3">Регистрация</h1>

    <div v-if="showMessage" class="row mt-1 mb-1 d-flex justify-content-center w-100">
      <div class="alert alert-danger d-flex align-items-center" style="width: fit-content;" role="alert">
          <span class="mt-1">
            <span v-if="message.recaptcha">{{ message.recaptcha.join() }}</span>
            <span v-if="message.password">{{ message.password.join() }}</span>
            <template v-else>
              <span class="d-block">Введены невалидные данные.</span>
              <span class="d-block">Попробуйте ещё раз.</span>
            </template>
          </span>
        <button type="button" class="ml-1 p-0 ms-2 btn bg-transparent shadow-none h-100 d-flex align-items-start"
                @click="deleteMessage"
                data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="fs-3" style="margin-top: -10px">&times;</span>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form" @submit.prevent="handleRegister">
        <div class="mb-3 row">
          <label for="inputName" class="col-4 col-form-label p-0 fs-5">Имя</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.first_name"
                type="text"
                class="form-control rounded-0 rounded-end"
                id="inputName"
                :class="{'is-invalid': message.name}">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputUsername" class="col-4 col-form-label p-0 fs-5">Имя пользователя</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.username"
                type="text"
                class="form-control rounded-0 rounded-end"
                id="inputUsername"
                required
                :class="{'is-invalid': message.username}">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputEmail" class="col-4 col-form-label p-0 fs-5">Email</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-envelope fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.email"
                type="email"
                class="form-control rounded-0 rounded-end"
                id="inputEmail"
                required
                :class="{'is-invalid': message.email}">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-4 col-form-label p-0 fs-5">Пароль</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-lock fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="user.password"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword"
                required
                :class="{'is-invalid': message.password}">
          </div>
        </div>
        <div class="mb-4 row">
          <label for="inputPassword2" class="col-4 col-form-label p-0 fs-5">Повторите пароль</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-lock fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="password2"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword2"
                required
                :class="{'is-invalid': message.password}">
          </div>
        </div>

        <div class="mb-3 row">
          <div class="form-group g-recaptcha input-group ps-0"
               data-sitekey="6LdB0Q0aAAAAADNyqvkOzqNuhJnHglBjzY-LVzqn"></div>
        </div>

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
      password2: '',
      showMessage: false
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
        this.showMessage = true;
        return
      }
      if (this.user.password.length < 5) {
        this.message = {'password': ['Минимальная длина пароля - 5 символов!']}
        this.showMessage = true;
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
                  this.$router.push({name: 'Login'});
                }
            )
          },
          error => {
            this.loading = false;
            if (error.response.status === 400) {
              this.showMessage = true;
              this.message = error.response.data
            }
          }
      );
    },
    deleteMessage() {
      this.showMessage = false;
      this.message = '';
    }
  }
}
</script>

<style scoped>

</style>