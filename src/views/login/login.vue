<template>
    <div id="login">
        <div class="login-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-position="top">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" ></el-input>
                </el-form-item>
               <div class="check">
                   <el-form-item label="验证码"  prop="checkOut">
                       <el-input v-model="ruleForm.checkOut"></el-input>
                       <div class="sendCheck">获取验证码</div>
                   </el-form-item>
               </div>
                <el-form-item >
                    <el-button type="primary" style="width: 100%;margin-top: 35px" @click="login('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                ruleForm:{
                    email:'',
                    password:'',
                    checkOut:''
                },
                rules:{
                    email:[ {required: true, message: '请输入邮箱', trigger: 'blur'}],
                    password:[{required: true, message: '请输入密码', trigger: 'blur'}],
                    checkOut:[{required:true,message:'请输入验证码',trigger:'blur'}]
                },
            }
        },
        methods:{
            login(formName){
                //表单验证
                this.$refs[formName].validate((valid)=>{
                    if(valid){

                    }else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #login{
        .login-form{
            .demo-ruleForm {
                margin-top: 50px;
                .el-form-item{
                    margin-top: 10px;
                }
            }
            .check{
                .el-form-item{
                    .el-input{
                        width: 65%;
                    }
                    .sendCheck{
                        position: absolute;
                        padding:0 15px;
                        background: #2ecc71;
                        color: white;
                        border-radius: 4px;
                        right: 0;
                        top:0
                    }
                }
            }
        }
    }

    ::v-deep{
        .el-form-item__label{
            color: white;
        }
    }

</style>