<template>
    <!--引入布局-->
    <el-container class="home_container">
        <!--头部-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt>
                <span>个人运动平台</span>
            </div>
            <el-button type="info" @click="logout">
                安全退出
            </el-button>
        </el-header>
        <el-container>
            <!--侧边栏-->
            <el-aside width="200px">
                <el-menu
                        background-color="white"
                        text-color="black">
                    <!--一级菜单-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item index="1-1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航二</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--主体内容-->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
          return{
              //菜单列表
              menuList:[]
          }
        },
        methods: {
            logout() {
                window.sessionStorage.clear();//清除session
                this.$router.push("/login")//回到首页
            },
            //获取导航菜单方法
            getMenuList(){

            }
        },
        created() {
            this.getMenuList;
        }
    }
</script>

<style lang="less" scoped>
    /*布局器样式*/
    .home_container {
        height: 100%;
    }

    .el-header {
        background-color: burlywood;
        display: flex;
        justify-content: space-between; /*//左右贴边*/
        padding-left: 0%; /*//左边界*/
        color: #fff;
        font-size: 20px;

        div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }

    }

    .el-aside {
        background-color: #e9e9e9;
    }

    .el-main {
        background-color: #dddddd;
    }

    img {
        width: 55px;
        height: 55px;
    }
</style>