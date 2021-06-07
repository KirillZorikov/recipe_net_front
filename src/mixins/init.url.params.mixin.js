export default {
    methods: {
        initUrlParams(page, filtering) {
            if (page && this.$route.query.page) {
                this.$store.commit('changePage', parseInt(this.$route.query.page));
            }
            if (filtering && this.$route.query.tag) {
                let tags = this.$route.query.tag
                if (Array.isArray(tags)) {
                    this.$store.commit('changeFiltering', tags);
                } else {
                    this.$store.commit('changeFiltering', [tags]);
                }
            }
        }
    }
}