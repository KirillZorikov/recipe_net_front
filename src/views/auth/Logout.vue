<template>
  <div class="row w-100 justify-content-center">
    <div class="col-md-8 p-5">
      <div class="card">
        <div class="card-header">Вы вышли из системы</div>
        <div class="card-body">
          <p>{{ message }}</p>
        </div>
      </div>
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