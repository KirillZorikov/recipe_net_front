<template>
  <div class="wrapper mb-5">
    <h1 class="fw-bold mt-5 mb-5 ms-3">Восстановление пароля</h1>

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
      <form class="form needs-validation" @submit.prevent="handleResetPasswordComplete">

        <div class="mb-3 row">
          <label for="inputPassword" class="col-4 col-form-label p-0 fs-5">Новый пароль</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="password"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword"
                required
                :class="{'is-invalid': showMessage}"
            >
          </div>
        </div>

        <div class="mb-3 row">
          <label for="inputPassword2" class="col-4 col-form-label p-0 fs-5">Пароль ещё раз</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-id-badge fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="password2"
                type="password"
                class="form-control rounded-0 rounded-end"
                id="inputPassword2"
                required
                :class="{'is-invalid': showMessage}"
            >
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button type="submit" class="button button-blue" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm me-1"></span>
            <span>Отправить</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/auth.service'

export default {
  name: "ResetPasswordComplete",
  title: 'Восстановление пароля',
  data() {
    return {
      password: '',
      password2: '',
      loading: false,
      showMessage: false,
    };
  },
  computed: {
    uidb64() {
      return this.$route.query.uidb64;
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    handleResetPasswordComplete() {
      if (this.password2 && this.password) {
        this.loading = true;
        AuthService.resetPasswordComplete(this.uidb64, this.token, this.password, this.password2).then(
            () => {
              this.$router.push({
                name: 'Home', params: {
                  message:
                      'Пароль успешно изменён!'
                }
              });
            },
            error => {
              this.loading = false;
              if (error.response.status === 400) {
                this.showMessage = true;
              }
              if (error.response.status === 404) {
                this.$router.push({name: '404'})
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