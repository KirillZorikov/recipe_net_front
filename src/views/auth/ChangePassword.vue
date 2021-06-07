<template>
  <div class="wrapper">
    <div class="d-flex justify-content-center align-items-center form-wrapper">
      <form class="form" @submit.prevent="handleChangePassword">
        <div class="mb-3 row">
          <label for="inputOldPassword" class="col-sm-3 col-form-label">Старый пароль</label>
          <div class="col-sm-9 ps-3">
            <input
                required
                v-model="oldPassword"
                type="password"
                class="form-control"
                name="oldPassword"
                id="inputOldPassword"
            >
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-3 col-form-label">Новый пароль</label>
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
        <div class="mb-3 row">
          <label for="inputPassword2" class="col-sm-3 col-form-label">Новый пароль ещё раз</label>
          <div class="col-sm-9 ps-3">
            <input
                required
                v-model="password2"
                type="password"
                class="form-control"
                name="password2"
                id="inputPassword2"
            >
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Сменить пароль</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "ChangePassword",
  data() {
    return {
      user: new User(),
      loading: false,
      oldPassword: '',
      password2: '',
      message: ''
    };
  },
  methods: {
    handleChangePassword() {
      this.user.oldPassword = this.oldPassword;
      this.user.password2 = this.password2;
      if (this.user.password2 && this.user.password && this.user.oldPassword) {
        this.loading = true;
        this.$store.dispatch('auth/changePassword', this.user).then(
            () => {
              this.$router.push({name: 'Home', params:{message: 'Пароль изменён!'}});
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