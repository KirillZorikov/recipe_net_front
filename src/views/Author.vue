<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center p-3">
            <h1 v-if="author" class="d-inline">{{ author.name ? author.name : author.username }}</h1>
            <FilterTags/>
          </div>
          <template v-if="currentUser && currentUser.username !== author.username">
            <button v-if="!do_follow" type="button" class="button button-light-blue d-flex align-items-center ms-2"
                    @click="actionFollow('add')">
              <i class="fas fa-pen me-2"></i>Подписаться на автора
            </button>
            <button v-else type="button" class="button button-light-blue d-flex align-items-center ms-2"
                    @click="actionFollow('delete')">
              <i class="far fa-times-circle me-2"></i>Отписаться от автора
            </button>
          </template>
        </div>
      </div>
      <Loading v-if="loading" class="loading_message"/>
      <template v-else>
        <div class="row p-3">
          <template v-for="recipe in recipes" :key="recipe">
            <RecipeCard :recipe="recipe" :show_full="false" @recipe-deleted="loadListRecipes()"/>
          </template>
        </div>
        <div class="d-flex justify-content-center mb-5">
          <Paginator :total="totalPages"/>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import RecipeCard from "../components/RecipeCard";
import {loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import FilterTags from "../components/FilterTags";
import Loading from "../components/Loading";
import {RecipeUserService, MiscService, FollowService} from "../services/user.services";

export default {
  name: 'Author',
  mixins: [loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
  components: {Loading, FilterTags, RecipeCard, Paginator},
  props: ['username'],
  data() {
    return {
      loading: false,
      totalPages: 1,
      author: '',
      do_follow: ''
    }
  },
  created() {
    this.initUrlParams(this.page, this.filtering);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListRecipes(RecipeUserService.getListRecipesByUser, this.username);
      this.loadAuthor();
    },
    makeParams() {
      return {
        page: this.page,
        tags: this.filtering.toString()
      };
    },
    loadAuthor() {
      MiscService.getAuthorInfo(this.username).then(
          response => {
            this.author = response.data;
            this.do_follow = this.author.do_follow;
          },
          error => {
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      )
    },
    actionFollow(action) {
      let func = action === 'add' ? FollowService.addFollow : FollowService.deleteFollow
      func(this.author.username).then(
          () => {
            this.do_follow = !this.do_follow
          })
    }
  }
}
</script>

<style scoped>

</style>