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
      <form class="form needs-validation" @submit.prevent="handleResetPassword">

        <div class="mb-4 row">
          <label for="inputEmail" class="col-4 col-form-label p-0 fs-5">Email</label>
          <div class="col-8 ps-3 pe-0 d-flex flex-row">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0 rounded-start h-100">
                  <i class="fa fa-envelope fa-fw fs-5"></i>
              </span>
            </div>
            <input
                v-model="email"
                type="email"
                class="form-control rounded-0 rounded-end"
                id="inputEmail"
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
  name: "ResetPassword",
  title: 'Восстановление пароля',
  data() {
    return {
      email: '',
      loading: false,
      showMessage: false,
    };
  },
  methods: {
    handleResetPassword() {
      if (this.email) {
        this.loading = true;
        AuthService.resetPassword(this.email).then(
            () => {
              this.$router.push({name: 'Home', params: {message:
                      'На вашу почту отправлены дальнейшие инструкции!'
              }});
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