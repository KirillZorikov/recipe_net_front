<template>
  <div class="wrapper mb-5">
    <h1 class="fw-bold mt-5 mb-5 ms-3">Вход</h1>

    <div v-if="showMessage" class="row mt-1 mb-1 d-flex justify-content-center w-100">
      <div class="alert alert-danger d-flex align-items-center" style="width: fit-content;" role="alert">
          <span class="mt-1">
            <span class="d-block">Введены невалидные данные.</span>
            <span class="d-block">Попробуйте ещё раз.</span>
          </span>
        <button type="button" class="ml-1 p-0 ms-2 btn bg-transparent shadow-none h-100 d-flex align-items-start"
                @click="deleteMessage"
                data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="fs-3" style="margin-top: -10px">&times;</span>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form needs-validation" @submit.prevent="handleLogin">

        <div class="mb-3 row">
          <label for="inputUsername" class="col-5 col-form-label p-0 fs-5">Имя пользователя/ Email</label>
          <div class="col-7 ps-3 pe-0 d-flex flex-row">
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
                :class="{'is-invalid': showMessage}"
            >
          </div>
        </div>

        <div class="mb-3 row">
          <label for="inputPassword" class="col-5 col-form-label p-0 fs-5">Пароль</label>
          <div class="col-7 ps-3 pe-0 d-flex flex-row">
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
                :class="{'is-invalid': showMessage}"
            >
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4 align-items-end">
          <div class="w-25"></div>
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Войти</span>
          </button>
          <router-link :to="{name: 'ResetPassword'}" class="w-25 ps-2">Забыли пароль?</router-link>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: "Login",
  title: 'Вход',
  data() {
    return {
      user: new User(),
      loading: false,
      showMessage: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.loading = true;
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push({name: 'Home'});
            },
            error => {
              this.loading = false;
              if (error.response.status === 400) {
                this.showMessage = true;
              }
            }
        );
      }
    },
    deleteMessage() {
      this.showMessage = false;
    }
  }
}
</script>

<style scoped>

</style>