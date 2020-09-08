// 过滤特殊字符
export function stripscript(str){
    let parrten= new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let rs="";
    for(let i=0;i<str.length;i++){
        rs=rs+str.substr(i,1).replace(parrten,'')
    }
    return rs
}

//验证邮箱
export  function validateEmail(val){
    let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(val);
}