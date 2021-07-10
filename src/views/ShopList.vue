<template>
  <div class="container mt-3">
    <div class="wrapper" style="max-width: 600px;">
      <div class="row">
        <div class="col-12">
          <div class="d-flex p-3">
            <span><h1 class="d-inline">Список покупок:</h1> <span v-show="loading"
                                                                  class="spinner-border ms-4"></span></span>
          </div>
          <div v-if="!loading && !recipes.length" class="d-flex justify-content-center mt-5">
            <p class="p-3 fs-3">Ваш список покупок пуст!</p>
          </div>
        </div>
      </div>
      <Loading v-if="loading" class="loading_message"/>
      <template v-else>
        <div class="row p-3 mt-4 ps-1 mb-5">
          <template v-for="recipe in recipes" :key="recipe">
            <div class="d-flex justify-content-between align-items-center">
              <span class="d-flex justify-content-between flex-row">
                <img :src="changePath(recipe.image)" class="thumbnail thumbnail-big me-3">
                <span class="ms-5">
                  <router-link :to="{name: 'Recipe', params: {slug: recipe.slug}}"
                               class="text-dark text-decoration-none fs-5">
                    {{ recipe.title }}
                  </router-link>
                  <p class="mb-1 mt-2 fs-6"><i class="far fa-clock mt-3"></i> {{ recipe.time }} мин.</p>
                </span>
              </span>
              <button @click="deleteFromPurchases(recipe.slug)" class="text-dark btn bg-transparent shadow-none">
                Удалить
              </button>
            </div>
            <hr v-if="recipes.length > 1" class="mt-3 mb-3 text-secondary">
          </template>
          <button v-if="recipes.length" type="button" @click="downloadShopList"
                  class="button button-blue d-flex align-items-center mt-5"
                  style="width: fit-content;">
            <p class="m-2">Скачать список</p>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading";
import {PurchasesUserService} from "../services/user.services";
import {constants} from "../constants";

export default {
  name: 'ShopList',
  title: 'Список покупок',
  components: {Loading},
  data() {
    return {
      loading: false,
      recipes: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPurchases();
    },
    loadListPurchases() {
      this.loading = true;
      PurchasesUserService.getListPurchasesRecipes().then(
          response => {
            this.loading = false;
            this.recipes = response.data;
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    },
    deleteFromPurchases(recipe_slug) {
      this.loading = true;
      PurchasesUserService.deleteFromPurchases(recipe_slug).then(
          () => {
            this.$store.commit('changePurchasesCount', this.$store.state.purchasesCount - 1);
            this.loadListPurchases();
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    },
    downloadShopList() {
      PurchasesUserService.downloadPurchases().then((response) => {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'shop_list.txt');
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    changePath(url) {
      let search = 'media/'
      return constants.MEDIA_DIR_URL + url.slice(url.indexOf(search) + search.length);
    }
  }
}
</script>

<style scoped>

</style>