<template lang="html">
<div class="login_bg">
  <div class="login_container">
    <div class="login_cone"></div>
    <div class="login_ctwo">
      <div class="loginimg"></div>
      <div class="login_long_input margin_top_21">
        <div class="err">
          <span id="spanError">{{mderror}}</span>
        </div>
        <el-input placeholder="填写简历预留手机号码" v-validate="'required|phone'" name="phone" v-model="phonenum">
          <i slot="prefix" class="login_icon font_family el-icon-phone login_icon"></i> 
        </el-input>
        <span v-show="errors.has('phone')" class="c_fe6262">{{ errors.first('phone') }}</span>
      </div>
      <div class="login_list clearfix">
        <div class="login_long_input login_short_input width_76per">
          <el-input placeholder="不区分大小写，点击图片即可刷新" name="vcode" v-validate="'required|vcode'" v-model="mdvcode">  
            <i slot="prefix" class="login_icon font_family el-icon-captcha login_icon"></i> 
          </el-input>
          <span v-show="errors.has('vcode')" class="c_fe6262">{{ errors.first('vcode') }}</span>
        </div>      
        <div>
          <div class="margin_left_10 margin_top_2 cursor_p" @click="getvcodeimg">
            <div v-html='imgcode'></div>
          </div>
        </div>
      </div>
      <div class="login_list clearfix">
        <div class="login_long_input login_short_input width_76per">
          <el-input placeholder="输入短信验证码" name="smscode" v-validate="'smscode'" v-model="mdvmscode" >  
            <i slot="prefix"  class="login_icon font_family el-icon-note login_icon"></i> 
          </el-input>
          <span v-show="errors.has('smscode')" class="c_fe6262">{{ errors.first('smscode') }}</span>
        </div>
        <div class="login_text" @click="getSmsCode">获取验证码</div>
      </div>
      <div class="login_btn" @click="submitToJason">登 录</div>
    </div>
    <div class="login_cthree"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      phonenum: '',
      mderror: '',
      mdvcode: '',
      mdvmscode: '',
      imgcode:""
    }
  },
  created() {
    this.getvcodeimg()
  },
  methods: {
    submitToJason: function () {
      if (this.mdvmscode == '') {
        this.errors.add('smscode', '请输入短信验证码！');
        return
      }
      this.$validator.validateAll().then((result)=>{
        if(result){
            this.$http({
                method: 'post',
                url: this.$url + 'login',
                data: JSON.stringify({mobile: this.phonenum, verifyCode: this.mdvmscode, svgvcode:this.mdvcode}),
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
            })
          .then(response=> {
            let rlt = response.data.result
            switch (rlt) {
              case 1:
                this.$router.push({
                  path: '/information'
                });
                break;
              case -1:
                this.mderror = "短信验证码输入错误"
                break;
              case -2:
                this.mderror = "短信验证码已过期"
                break;
              case -3:
                this.errors.add('mdvcode', '请输入正确的验证码');
                break;
                case -99: 
                this.mderror = "请先获取短信验证码"
                break;
              default:
                break;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      })
    },
    getSmsCode: function(){
      this.$validator.validateAll({
        phone: this.phonenum,
        vcode: this.mdvcode
      }).then((result)=>{
        if(result){
          this.$http({
            method: 'post',
            url: this.$url + 'login/getvericode',
            data: JSON.stringify({mobile: this.phonenum, svgvcode:this.mdvcode}),
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          .then(response=> {
            let rlt = response.data.result
            switch (rlt) {
              case 1:
                this.mderror = "短信验证码已发送！"
                break;
              case -1:
                this.mderror = "短信验证码已过期！"
                break;
              case -2:
                this.mderror = "相同的验证码一天之内只能重复获得3次！"
                break;
              case -3:
                this.errors.add('mdvcode', '请输入正确的验证码！');
                break;
              default:
                break;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      })
    },
    getvcodeimg: function(){
      this.$http.get(this.$url + 'login/captcha')
      .then(response => {
        this.imgcode = response.data
      })
    }

  }
}
</script>

<style lang="css">
*{padding: 0;margin: 0;font-family: "microsoft yahei", "font_family" !important;font-size: 14px;}	
.el-input__inner{height: 27px;width: 100%;border-radius: 0;line-height: 27px;}/*重置input样式*/
.el-input,.el-select,.el-date-editor{width: 100%!important;}/*设置input，select，data框样式*/
.el-input__icon{line-height: 27px;}
.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.width_76per{
  width: 76%;
}
.clearfix {
  zoom: 1;
}
.c_fe6262 {
  color: #fe6262;
}
.c_6888ff {
  color: #6888ff;
}
.c_e7edfe {
  color: #e7edfe;
}
.font_weight_b {
  font-weight: bold;
}
.comment_context {
  border: 1px solid #f6f6f6;
  padding: 10px;
}
.list_group{
  width: 100%;
}
.list_group div{
float: left;	
}
.fieldname {
  width: 100px;
  line-height: 27px;
}
.text_width {
  width: 40px;
  line-height: 27px;
  text-align: center;
}
.width_150 {
  width: 140px;
}
.margin_b_20 {
  margin-bottom: 20px;
}
.c_999 {
  color: #999;
}
.default_button {
  display: block;
  width: 120px;
  height: 32px;
  background: #fd9162;
  color: #fff;
  line-height: 32px;
  border: none;
  border-radius: 18px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
.handle2_area {
  width: 260px;
  height: 32px;
  margin: 30px auto 0px;
}
.handle3_area {
  width: 400px;
  height: 32px;
  margin: 30px auto 0px;
}	
.prev_btn {
  background: #ccc;
  margin-right: 20px;
}
.advance_btn{
  background: #fff;
  border: 1px solid #fd9162;
  color: #fd9162;
  box-sizing: border-box;
  margin-right: 20px;
}
.icon {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
  fill: currentColor;
  overflow: hidden;
  margin-right: 2px;
}	
.list_example	{
  color: #6888ff;
  margin-left: 20px;
  cursor: pointer;
}
.width_auto{
  width: auto;
}
.upload_content{
  width: 100%;
  background: #f2f6ff;
  margin: 5px 0 0 0;
}
.upload_content span{
  cursor: pointer;	
}
.padding_10{
  padding: 10px;
}
.padding_leri_10{
  padding: 0 10px;
}
.cursor_p{
  cursor:pointer ;
}
.icondelete_leri{
  margin: 0 10px;
}
.padding_tobo{
  padding: 0px 0 5px 0;
}
.width_70{
  width: 70px;
}
.tab_title{width: 100%;height: 46px;font-size: 18px;margin-left: -10px;}
.icon3{width: 25px!important;height: 25px!important;margin-right: 3px;vertical-align:-5px!important;}
.tab_iconfont{color: #e1e8ff;font-size: 38px;float: left;margin-top: 4px;}
.tab_default_icon{font-size: 24px;vertical-align: -2px;}
.padding_top_20{
    padding-top: 20px;
}
/*重置上传按钮*/
.el-upload-dragger .el-icon-upload {
  font-size: 36px;
  margin: 16px 0 16px;
  line-height: 11px;
}
.el-upload-dragger{
  height: 68px;
}
/*login*/
.login_bg{
	background: url(../assets/images/bg.jpg) no-repeat ;
  width:100%;  
  height:100%;  
  max-width: 100%;  
  max-height: 100%;  
  top: 0;  
  right: 0;  
  bottom: 0;  
  left: 0;  
  margin: auto;  
  overflow: auto;  
  position: relative;  
  z-index:-1;  
}
.login_container {
	width: 900px;
	min-height: 620px;
	box-shadow: 0 7px 27px rgb(115, 105, 215, 0.2);
	-moz-box-shadow: 0 7px 27px rgb(115, 105, 215, 0.2);
	-o-box-shadow: 0 7px 27px rgb(115, 105, 215, 0.2);
	-webkit-box-shadow:  0 7px 27px rgb(115, 105, 215, 0.2);
	position: fixed;
	top: 50%;
	margin-top: -310px;
	left: 50%;
	margin-left: -450px;
	background: #86a7fc;
	border-radius: 2px;
}
.login_container .login_cone {
	width: 790px;
	height: 30px;
	margin: 25px auto;
	background: url(../assets/images/logo.png)no-repeat;
}
.login_container .login_cthree {
	width: 905px;
	height: 100px;
	position: absolute;
	bottom: 0;
	background: url(../assets/images/logo.png)no-repeat;
	margin-left: 25px;
}
.login_container .login_ctwo {
  width: 420px;
  margin: 75px auto;
  background: #fff;
  border-radius: 10px;
  padding: 30px 20px 20px 20px;
  position: relative;
  margin-bottom: 140px;
}
.login_ctwo .loginimg {
	background: url(../assets/images/logo.png)no-repeat;
	margin: 0 auto;
	width: 120px;
	height: 50px;
}
.login_icon{
  color: #c4d4ff;
  font-size: 28px;
  margin-top: 6px;
 }
 .login_long_input{
 	margin-bottom: 10px;
 }
.login_long_input .el-input__inner {
 	height: 40px !important;
 	line-height: 40px !important;
  width: 100%;
  border-radius: 0;
  border: 2px solid #c4d4ff;
}
.login_long_input .el-input--prefix .el-input__inner{
	padding-left: 33px;
}
.login_short_input  .el-input__inner{
	width: 320px;
}
.login_short_input div{
	width: 100px;
}
.margin_top_21{
	margin-top: 21px;
}
.login_btn{
  width: 100%;
  height: 40px;
  background: #fd9162;
  color: #fff;
  line-height: 40px;
  border: none;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
}
.login_list div{
	float: left;
}
.login_text{
	width: 100px;
	line-height: 40px;
	text-align: center;
	color: #86a7fc;
	font-size: 14px;
	cursor: pointer;
}
.login_proofimg{
	background: url(../assets/images/logo.png) no-repeat center ;
	width: 100px;
	height: 40px;
	cursor: pointer;
}
.margin_top_2{
  margin-top: 2px;
}
.margin_left_10{
  margin-left: 10px;
}
.err{
  height: 19px;
  color: red;
  overflow: hidden;
}
</style>
