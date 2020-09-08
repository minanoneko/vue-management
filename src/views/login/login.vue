<template>
    <div id="login">
        <div class="login-form">
          <ul class="menu-tab">
            <li v-for="item in menuTab" :key="item.id"  class="tab-font" :class="{'font-block':item.isActive}" @click="toggleMenu(item)">{{item.text}}</li>
          </ul>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-position="top">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" maxlength="16" minlength="6"></el-input>
                </el-form-item>
              <el-form-item label="重复密码" prop="passwords" v-if="model==='register'">
                <el-input v-model="ruleForm.passwords" type="password" maxlength="16" minlength="6"></el-input>
              </el-form-item>
               <div class="check">
                   <el-form-item label="验证码"  prop="checkCode">
                       <el-input v-model="ruleForm.checkCode" maxlength="6" ></el-input>
                       <div class="sendCheck" @click="getCode" >获取验证码</div>
                   </el-form-item>
               </div>
                <el-form-item >
                    <el-button type="primary" style="width: 100%;margin-top: 35px" @click="login('ruleForm')">{{model==='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {stripscript,validateEmail} from "@/utils/validate";

export default {
        name: "login",
        data(){
            //校验验证码
            let checkCode=(rule,val,cb)=>{
              this.ruleForm.checkCode=stripscript(val);
              val=this.ruleForm.checkCode
              let reg=/^[a-z0-9]{6}$/;
              if(val===''){
                  cb(new Error('请输入验证码'))
              }else if(!reg.test(val)){
                cb(new Error('验证码格式错误'))
              }
            };
            //校验邮箱
            let checkEmail=(rule,val,cb)=>{
              if (val===''){
                cb(new Error('请输入邮箱'));
              }else if(!validateEmail(val)){
                cb(new Error('邮箱格式错误'))
              }else{
                cb();
              }
            };
            //校验密码
            let checkPassword=(rule,val,cb)=>{
              this.ruleForm.password=stripscript(val);
              val=this.ruleForm.password
              if(val===''){
                cb(new Error('请输入密码'))
              }
            }
            //校验二次密码
            let repeatPassword=(rule,val,cb)=>{
              this.ruleForm.passwords=stripscript(val);
              val=this.ruleForm.passwords
              if(val===''){
                cb(new Error('请再次输入密码'))
              }else if(val!==this.ruleForm.password){
                cb(new Error('两次密码不相同'))
              }else {
                cb()
              }
            }
            return{
              model:'login',
              menuTab:[{text:'登录',isActive:true,type:'login'},{text:'注册',isActive:false,type:'register'}],
              //表单数据
                ruleForm:{
                    email:'',
                    password:'',
                    passwords:'',
                    checkCode:''
                },
                rules:{
                    email:[ {validator:checkEmail,trigger:'blur',required: true}],
                    password:[{validator:checkPassword,trigger:'blur',required: true}],
                    passwords:[{validator:repeatPassword,trigger:'blur',required: true}],
                    checkCode:[{validator:checkCode,trigger:'blur',required: true}]
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
            },
            getCode(){

            },
            toggleMenu(data){
              this.menuTab.forEach(val=>{
                val.isActive=false
              })
              data.isActive=true
              this.model=data.type
            }
        }
    }
</script>

<style lang="scss" scoped>
    #login{
      height: 100vh;
      background: #344a5f;
        .login-form{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          top:200px;
          .menu-tab{
            display: flex;
            justify-content: center;
            .tab-font{
              color: white;
              padding: 10px 30px;
              border-radius: 4px;
              margin-left: 5px;
            }
          }
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
    .font-block{
      background: #7b7b7b;
    }
    ::v-deep{
        .el-form-item__label{
            color: white;
        }
    }

</style>