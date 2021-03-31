<template>
    <div>
        <el-button type="info" @click="loginOut">退出登录</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        loginOut() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
</style>
