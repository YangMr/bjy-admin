<template>
    <div class="bjy-admin-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'BjyAdminBreadcrumb',

    data() {
        return {
            breadcrumbList:[]
        };
    },

    mounted() {
        console.log(this.$route);
        this.breadcrumbList = this.$route.matched.filter((item) => {
            return item.meta && item.meta.title
        })
    },

    methods: {

    },
};
</script>
<style scoped lang="scss">
.bjy-admin-breadcrumb{
    padding: 12px 20px;
    border-bottom: 1px solid #f4f4f4;
}
</style>