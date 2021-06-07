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
                console.log(url);
                for (const tag of value.filtering) {
                    url += `tag=${tag}&`;
                }
                if (this.page === 1) {
                    url = url.slice(0, url.length-1);
                } else {
                    url += `page=${value.page}`;
                }
            }
            // console.log(url);
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
            this.$store.commit('changePage', to.page ? parseInt(to.page) : 1);
            console.log(to.page);
            console.log(to.filtering);
        }
    }
}