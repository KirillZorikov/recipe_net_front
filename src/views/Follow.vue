<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex p-3">
            <span><h1 class="d-inline">Мои подписки</h1> <span v-show="loading" class="spinner-border ms-4"></span></span>
          </div>
          <div v-if="!loading && !follows.length" class="d-flex justify-content-center mt-5">
            <p class="p-3 fs-3">У вас ещё нет подписок!</p>
          </div>
        </div>
      </div>
      <Loading v-if="loading" class="loading_message"/>
      <template v-else>
        <div class="row p-3">
          <template v-for="follow in follows" :key="follow">
            <FollowCard :follow="follow" @follow-deleted="loadListFollow()"/>
          </template>
        </div>
        <div v-if="follows.length" class="d-flex justify-content-center mb-5">
          <Paginator :total="totalPages"/>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";
import {FollowService} from "../services/user.services";
import FollowCard from "../components/FollowCard";

export default {
  name: 'Follow',
  title: 'Подписки',
  mixins: [initUrlParamsMixin, watchPageMixin, computedPageMixin],
  components: {FollowCard, Loading, Paginator},
  data() {
    return {
      loading: false,
      totalPages: 1,
      follows: ''
    }
  },
  created() {
    this.initUrlParams(this.page, this.filtering);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListFollow();
    },
    makeParams() {
      return {
        page: this.page,
        tags: this.filtering.toString()
      };
    },
    loadListFollow() {
      this.loading = true;
      FollowService.getListFollowingRecipes(this.makeParams()).then(
          response => {
            this.loading = false;
            this.follows = response.data.response;
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    }
  }
}
</script>

<style scoped>

</style>