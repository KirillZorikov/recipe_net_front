<template>
  <div class="wrapper">
    <h1 class="fw-bold mt-5 mb-5 ms-3">Выход</h1>
    <div class="text-center mt-5">
      <p class="fs-3">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: "Logout",
  title: 'Выход',
  data() {
    return {
      user: new User('', ''),
      message: '',
    };
  },
  created() {
    this.handleLogout()
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout').then(
          () => {
            this.message = "Вы вышли из своей учётной записи. Ждём вас снова!"
          },
          error => {
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      )
    }
  }
}
</script>

<style scoped>

</style>