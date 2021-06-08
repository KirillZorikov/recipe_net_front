export default {
    watch: {
        pageStateOptions(value) {
            let url = `${window.location.pathname}`;
            if (value.filtering.length === 0) {
                if (this.page !== 1) {
                    url += `?page=${value.page}`;
                }
            } else {
                url += '?';
                for (const tag of value.filtering) {
                    url += `tag=${tag}&`;
                }
                if (this.page === 1) {
                    url = url.slice(0, url.length-1);
                } else {
                    url += `page=${value.page}`;
                }
            }
            this.$router.push(url);
        },
        page() {
            this.loadData()
        },
        filtering() {
            this.loadData();
        },
        $route() {
            if (this.$route.name !== this.$options.name) {
                this.$store.commit('changePage', 1);
                this.$store.commit('changeFiltering', []);
            }
        },
        queryParams(to) {
            if (this.$route.name !== this.$options.name) {
                return
            }
            this.$store.commit('changePage', to.page ? parseInt(to.page): 1);
            if (Array.isArray(to.filtering)) {
                this.$store.commit('changeFiltering', to.filtering);
            } else {
                this.$store.commit('changeFiltering', to.filtering ? [to.filtering]: []);
            }
        }
    }
}