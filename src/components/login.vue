<template>
    <div class="login_con">
        <div class="login_box">
            <div class="img_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" class="login_form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLogin">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '张三',
                password: '123abc_'
            },
            // 表单验证规则
            rules: {
                // 用户名验证
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                // 密码验证
                password: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    {
                    type: 'string',
                    message: '请输入不包含空格的字符',
                    trigger: 'blur',
                    transform(value) {
                    if (value && value.indexOf(' ') === -1) {
                        return value
                    } else {
                        return false
                    }
                    }
                },
                {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                    var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
                    if (!passwordreg.test(value)) {
                        callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
                    } else {
                        callback()
                        }
                    }
                }
                ]
            }
        }
    },
    methods: {
        resetLogin() {
            // 重置表单
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            // validate表单预验证 点击登录时进行验证
            this.$refs.loginFormRef.validate(async (valid) => {
                console.log(valid) // valid返回的是一个bool类型
                if (!valid) return false // 错误则返回
                const { data: res } = await this.$http.post('login', this.form)
                console.log(res) // 返回的是promise 所以在调用前使用await,但await它和async一起配合使用，所以在方法前加上async
                if (res.status !== 200) return this.$message.error('登录失败')
                this.$message.success('登录成功')
                // 登录成功后token保存到客户端的sessionStorage
                // 其它页面除了登录之外的api接口，必须登录后才能访问
                // token只在页面打开期间生效
                window.sessionStorage.setItem('token', res.token)
                // 成功后跳转到主页
                this.$router.push('/home')
            })
        }
    }
}
</script>

<!-- scoped定义样式只能在本组件中使用 -->
<style lang="less" scoped>
.login_con{
    background: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .img_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
