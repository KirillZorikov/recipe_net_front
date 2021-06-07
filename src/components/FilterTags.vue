<template>
  <span class="fs-6 d-flex flex-row">
    <div class="d-flex align-items-center me-4">
      <i class="color-red fs-4 me-1" @click="changeFiltering('zavtrak')" :class="
      {'fas fa-check-circle': check_zavtrak,
      'far fa-circle': !check_zavtrak}">
      </i> Завтрак
    </div>
    <div class="d-flex align-items-center me-4">
      <i class="color-green fs-4 me-1" @click="changeFiltering('obed')" :class="
      {'fas fa-check-circle': check_obed,
      'far fa-circle': !check_obed}">
      </i> Обед
    </div>
    <div class="d-flex align-items-center me-4">
      <i class="color-purple fs-4 me-1" @click="changeFiltering('uzhin')" :class="
      {'fas fa-check-circle': check_uzhin,
      'far fa-circle': !check_uzhin}">
      </i> Ужин
    </div>
  </span>
</template>

<script>
export default {
  name: "FilterTags",
  computed: {
    filtering() {
      return this.$store.state.filtering;
    },
    check_zavtrak() {
      return this.filtering.includes('zavtrak')
    },
    check_obed() {
      return this.filtering.includes('obed')
    },
    check_uzhin() {
      return this.filtering.includes('uzhin')
    },
  },
  methods: {
    changeFiltering(newParam) {
      let filtering = [...this.filtering]
      if (filtering.includes(newParam)) {
        filtering = filtering.filter(function (value) {
          return value !== newParam;
        });
      } else {
        filtering.push(newParam)
      }
      this.$store.commit('changePage', 1);
      this.$store.commit('changeFiltering', filtering);
    }
  }
}
</script>

<style scoped>

</style>