<template>
  <nav aria-label="Переключение страниц" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: page === 1}">
        <button class="page-link" :="{disabled: page === 1}"
           @click="changePage(page - 1)">
          &laquo;
        </button>
      </li>

      <template v-for="pageNumber in paginatorArray" :key="pageNumber">
        <li class="page-item" :class="{active: pageNumber === page, disabled: pageNumber === '...'}">
          <button class="page-link" :="{disabled: pageNumber === page || pageNumber === '...'}"
                  @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </li>
      </template>

      <li class="page-item" :class="{disabled: page === total}">
        <button class="page-link" :="{disabled: page === total}"
           @click="changePage(page + 1)">
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import generatePaginatorArray from "../services/utils";
export default {
  name: "Paginator",
  props: ['total'],
  computed: {
    page() {
      return this.$store.state.page;
    },
    paginatorArray() {
      return generatePaginatorArray(this.total, this.page)
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$store.commit('changePage', pageNumber);
    }
  },
}
</script>

<style scoped>
</style>