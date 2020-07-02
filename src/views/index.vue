<template>
    <div id="index">
        <div class="index-form">
            <div class="title">
                <span class="title-font login-btn" :class="{'title-color':isBtn}">登录</span>
                <span class="title-font reg-btn" :class="{'title-color':!isBtn}">注册</span>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                isBtn:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    #index{
        height: 100vh;
        background: #344a5f;
        .index-form{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 320px;
            top:200px;
            .title{
                text-align: center;
                margin-top: 10px;
                .title-font{
                    padding: 10px 30px;
                    color: white;
                    border-radius: 4px;
                    margin-left: 5px;
                }
            }
        }
    }
    .title-color{
        background: #7b7b7b;
    }
</style>