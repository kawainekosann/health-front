<template>
    <!--一定要有div，作为根div存在-->
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png"/>
            </div>
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="login_form" label-width="0px">
                <!--此处 prop绑定验证规则 rules里的对应属性-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont iconshouye"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont iconshouye"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">提交</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: "admin",
                    password: "123456"
                },
                //验证对象
                loginRules: {
                    username: [
                        //必填项验证
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        //长度验证
                        {min: 5, max: 20, message: '长度在5到20个字符', trigger: 'blur'}
                    ],
                    password: [
                        //必填项验证
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //长度验证
                        {min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            //重置表单内容
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields()
            },
            //登录方法
            login() {
                //验证校验规则
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return;//验证失败
                    const {data: res} = await this.$http.post("login", this.loginForm)//访问后台
                    if (res.flag == "ok") {
                        console.log(res.user)
                        this.$message.success("操作成功");//信息提示
                        this.$router.push({path: "/home"})//页面路由跳转
                        window.sessionStorage.setItem("user",res.user)//存储user对象
                    } else {
                        this.$message.error("操作失败");
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: cornflowerblue;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #e9e9e9;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            width: 130px;
            height: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 5px;
            box-shadow: 0 0 5px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #0ee;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #795da3;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0%;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>