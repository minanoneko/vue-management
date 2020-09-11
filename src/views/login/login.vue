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
                <el-row class="code" :gutter="4">
                   <el-form-item label="验证码"  prop="checkCode">
                       <el-col :span="15"><el-input v-model="ruleForm.checkCode" maxlength="6" ></el-input></el-col>
                       <el-col :span="9"><div @click="getCode('ruleForm')" class="sendCode" :class="{'not-send':disabled}">{{disabled?`${this.time}秒后重新发送`:'发送验证码'}}</div></el-col>
                   </el-form-item>
                </el-row>
                <el-form-item >
                    <el-button type="primary" style="width: 100%;margin-top: 35px" @click="login('ruleForm')">{{model==='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {stripscript,validateEmail} from "@/utils/validate";
import {getSms} from "@/api/user/login";

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
              }else {
                  cb()
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
                }else if(val.length<6) {
                    cb(new Error('密码必须小于6位数'))
                }else {
                    cb()
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
                time:60,
                disabled:false,
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
            getCode(formName){
                //单独验证邮箱
                this.$refs[formName].validateField('email',err=>{
                    if(err){
                        return
                    }
                    if(!this.disabled){
                        this.disabled=true
                        this.down()
                        getSms(this.ruleForm.email).then(res=>{
                            if(res.data.status===0){
                                this.$message.success('验证码发送成功')
                            }
                        }).catch(err=>{
                            console.log(err.data)
                        })
                    }
                })
            },

            //切换注册登录
            toggleMenu(data){
                if(this.disabled){
                    this.$message.warning('验证码发送中...')
                    return
                }
              this.menuTab.forEach(val=>{
                val.isActive=false
              })
              data.isActive=true
              this.model=data.type
            },

            //倒计时
            down(){
               let clear=setInterval(()=>{
                   this.time-=1;
                   if(this.time<=0){
                       this.time=60;
                       this.disabled=false
                       clearInterval(clear)
                   }
               },1000)
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
          .code{
              .sendCode{
                  background: #1ec18a;
                  text-align: center;
                  border-radius: 5px;
                  color: white;
                  font-size: 15px;
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
    ::v-deep{
        .el-form-item__error:nth-child(3){
            left: 3px;
        }
    }
    .not-send{
        pointer-events:none
    }
</style>