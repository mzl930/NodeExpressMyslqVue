
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from './zh_cn.js'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'cn'
})
const config = {
    events: 'blur',
    i18n: i18n
  };
Vue.use(VeeValidate, config);
//自定义验证语言
const dictionary = {
    cn: {   
        messages: zh_CN
    }
};
Validator.localize(dictionary);
Validator.localize('cn');
//自定义验证规则
Validator.extend('phone', {    
    getMessage: field => '手机号码输入不正确',    
    validate: value => {      
        return value.length === 11 && /^\d{11}$/.test(value)    
    }
});
Validator.extend('vcode', {
    getMessage: field => '验证码输入不正确',
    validate: value => {
    return value.length === 4 && /^\d{4}$/.test(value)
    }
});
Validator.extend('smscode', {
    getMessage: field => '短信验证码输入不正确',
    validate: value => {
    return value.length === 4 && /^\d{4}$/.test(value)
    }
});

export default {
    data () {
    return {}
    },
    VeeValidate
}
