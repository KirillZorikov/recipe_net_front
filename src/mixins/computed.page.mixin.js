export default {
    computed: {
        pageStateOptions() {
            return {
                page: this.page,
                filtering: this.filtering
            };
        },
        queryParams() {
            return {
                page: this.$route.query.page,
                filtering: this.$route.query.tag
            };
        },
        filtering() {
            return this.$store.state.filtering;
        },
        page() {
            return this.$store.state.page;
        },
        recipes() {
            return this.$store.state.recipes;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
}