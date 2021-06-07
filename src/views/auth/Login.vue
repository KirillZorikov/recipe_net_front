<template>
  <div class="wrapper">
    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form" @submit.prevent="handleLogin">
        <div class="mb-3 row">
          <label for="inputUsername" class="col-sm-3 col-form-label">Имя пользователя / Email</label>
          <div class="col-sm-9 ps-3">
            <input
                required
                v-model="user.username"
                type="text"
                class="form-control"
                name="username"
                id="inputUsername"
            >
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Пароль</label>
          <div class="col-sm-9 ps-3">
            <input
                required
                v-model="user.password"
                type="password"
                class="form-control"
                name="password"
                id="inputPassword"
            >
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Войти</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: "Login",
  data() {
    return {
      user: new User(),
      loading: false,
      message: ''
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
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    }
  }
}
</script>

<style scoped>

</style>