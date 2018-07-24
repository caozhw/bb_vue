//中文
var no_china = "密码不能为中文";
var no_num = "不能输入纯数字"


var req_hrader;

var coin_point_length = 8;
function header_list() {
    //头部otc列表
    if(req_hrader !=null) req_hrader.abort();
    req_hrader= $.post('/otc_header_list',{},function (res) {
        $("#header_list").empty().html(res);
    });
}

$(function () {
    setInterval('header_list()',30000);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //跳转至账户中心
    $('.people').click(function () {
        var account_url = $('#account_url').val();
        window.location.href='./set_info';
    });

    $('#login_out').click(function () {
        $.post('/loginout',{},function (res) {
            if(res.status==200){
                window.location.href=$('#index_url').val();
            }else{
                pop(res.msg);
            }
        });
    });
    if(parseInt($("#sign_status").val())){
        var Socket = new WebSocket(websockturl);
        Socket.onopen = function (event) {
            var pData = {
                sign_status: parseInt($("#sign_status").val()),
                content: '检验',
                op_type:4,
            }
            Socket.send($.toJSON(pData)); //获取消息记录，绑定fd
        };
    }
})
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?2b9139aefbc3796ce15f4d6b096e3fc0";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();



//判断纯数字最低8位
function pure_digit(obj){
    var pass_strength = obj.siblings(".strength");
    var number =/^\d{0,}$/;
    var isNumber = number.test(obj.val());

    if(isNumber)
    {
        obj.removeClass("whit");
        obj.addClass("red");
        obj.siblings(".input_mess").html(no_num);
        obj.siblings(".input_mess").show();
        return false;

    }
    else
    {
        obj.removeClass("red");
        obj.siblings(".input_mess").hide();
        return true;
    }

}


//密码强度
function password_test(obj){

    var pass_strength = obj.siblings(".strength");
    pure_digit(obj,pass_strength);
    //eight_twenty(obj,pass_strength);
    //isSpec_chart(obj,pass_strength);
    //pass_strength.find(".se1").css("background-color","#cc4e45");
    //obj.siblings(".strength").children(".up").children("span.se1").addClass("red_");

    pass_strength.children(".up").children("span.se1").removeClass("yellow");
    pass_strength.children(".up").children("span.se2").removeClass("yellow");
    pass_strength.children(".up").children("span.se1").removeClass("green");
    pass_strength.children(".up").children("span.se2").removeClass("green");
    pass_strength.children(".up").children("span.se3").removeClass("green");
    pass_strength.children(".up").children("span.se1").removeClass("red_");

    pass_strength.children(".up").children("em.f_red").hide();
    pass_strength.children(".up").children("em.f_green").hide();
    pass_strength.children(".up").children("em.f_yellow").hide();

    pass_strength.show();

    // /^(?=(.*[a-z]){1})(?=(.*[\d]){1})(?=(.*[ \WA-Z]){1}).{10,}$/
    //var d1_reg = /^(?=(.*[a-z]){1})(?=(.*[\d]){1})(?=(.*[A-Z]){1}).{10,}$/;
    //var d2_reg = /^(?=(.*[a-z]){2,2})(?=(.*[\d]){2,2})(?=(.*[A-Z]){2,2}).{10,}$/;
    //var d3_reg = /^(?=(.*[a-z]){3,})(?=(.*[\d]){3,})(?=(.*[A-Z]){3,}).{10,}$/;


    var china = new RegExp("[\\u4E00-\\u9FFF]+","g");




    var d1_reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[\W])|(?=.*?[A-Za-z])(?=.*?[\W]))[\dA-Za-z\W].{7,11}$/;
    var d2_reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[\W])|(?=.*?[A-Za-z])(?=.*?[\W]))[\dA-Za-z\W].{10,}$/;
    var d2_reg_2 = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,}).{8,}$/;

    var d3_reg = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,}).{10,20}$/;

    //var d1_reg = /^(\d)\1{2}((?<=(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)))\d){2,4}$/;


    var isChina = china.test(obj.val());
    var isRed = d1_reg.test(obj.val());
    var isYellow = d2_reg.test(obj.val())||d2_reg_2.test(obj.val());
    var isBlue = d3_reg.test(obj.val());


    if(obj.val().length<=0)
    {
        obj.removeClass("red");
        pass_strength.hide();
        obj.siblings(".input_mess").hide();
    }
    if(isChina)
    {
        console.log("中文");
        var value2 = obj.val();
        console.log(value2);
        //var value3=value2.replace(/[\\u4E00-\\u9FFF]/g,"");
        //console.log(value3);
        obj.val("");
        obj.attr("value","");
        pop_small(no_china);
        return false;
    }
    if(isRed){
        console.log("red");
        console.log(obj.val().length);
        pass_strength.show();
        pass_strength.children(".up").children("span.se1").removeClass("yellow");
        pass_strength.children(".up").children("span.se2").removeClass("yellow");
        pass_strength.children(".up").children("span.se1").removeClass("green");
        pass_strength.children(".up").children("span.se2").removeClass("green");
        pass_strength.children(".up").children("span.se3").removeClass("green");
        pass_strength.children(".up").children("span.se1").addClass("red_");
        pass_strength.children(".up").children("em.f_yellow").hide();
        pass_strength.children(".up").children("em.f_green").hide();
        pass_strength.children(".up").children("em.f_red").show();

    }
    if(isYellow){
        console.log("yellow");
        console.log(obj.val().length);
        pass_strength.children(".up").children("span.se3").removeClass("green");
        pass_strength.children(".up").children("span.se1").addClass("yellow");
        pass_strength.children(".up").children("span.se2").addClass("yellow");

        pass_strength.children(".up").children("em.f_red").hide();
        pass_strength.children(".up").children("em.f_green").hide();
        pass_strength.children(".up").children("em.f_yellow").show();
        //  $(".strength .up span.se3").removeClass("green");
        //  $(".strength .up span.se1").addClass("yellow");
        //  $(".strength .up span.se2").addClass("yellow");
    }
    if(isBlue){
        console.log("blue");
        console.log(obj.val().length);
        pass_strength.children(".up").children("span.se1").removeClass("yellow");
        pass_strength.children(".up").children("span.se2").removeClass("yellow");
        pass_strength.children(".up").children("span.se1").addClass("green");
        pass_strength.children(".up").children("span.se2").addClass("green");
        pass_strength.children(".up").children("span.se3").addClass("green");
        pass_strength.children(".up").children("em.f_red").hide();
        pass_strength.children(".up").children("em.f_yellow").hide();
        pass_strength.children(".up").children("em.f_green").show();
    }

}
//资金密码校验
function capital_password_verify(password) {
    var reg_exp = /^[a-zA-Z\d]{6,20}$/;
    var res = reg_exp.test(password);
    return res;
}
//保留pos位小数，不足补0，多余截取
function formatFloat(str,pos){
    if(str===''||str===null){
        return '';
    }
    var point_str = String(str).split('.');
    if(point_str.length<2){
        return Number(str).toFixed(pos);
    }
    if(point_str[1].length<pos){
        return Number(str).toFixed(pos);
    }
    var wei  = new  RegExp("^(\\-)*(\\d+)\.(\\d{0,"+pos+"}).*$");
    str = String(str).replace(wei,'$1$2.$3');
    return str;
}
//头部OTC订单消息
function header_trans_message() {
    $.post('/header_trans_message',{},function (data) {
        $("#informa").empty().html(data);
        //首页鼠标滑过改变背景
        $('.listdata').hover(function(){
            $(this).addClass('listdata-change')
        },function(){
            $(this).removeClass('listdata-change')
        })
        $('.indent-wid').click(function(){
            $(this).addClass('curs').siblings('div').removeClass('curs');
            var _index = $(this).index();
            $('.vessel').animate({'margin-left':-272*_index+'px'})
        })
    })
}

$(function(){
    $('.lmes').niceScroll({
        cursorcolor: "#677887",//#CC0071 光标颜色
        cursoropacitymax:.3, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 true
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", //   游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        railalign: 'right',
        autohidemode: true, //是否隐藏滚动条  true
    });
})
