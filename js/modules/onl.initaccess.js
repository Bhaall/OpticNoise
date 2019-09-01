
onl.mod.initaccess={init:function(){
  onl.log('onl.initaccess.init');
  var str="",
  loc,
  password=$("#password"),
  allFields=$([]).add(password),
  tips=$("#validateTips");
  function updateTips(t){
    tips.text(t).addClass('has-error');
  }
  function checkValue(o,callback){
    $.getJSON("includes/supe.php",{
      cmd:"info"
      },make_info
    );
    function make_info(info){
      str=info["itemPassword"];
      if(o.val()!==str){
        o.parent('.form-group').addClass('has-error');
        updateTips("Enter your super secret password.");
        return false;
      }
      else{
        var COOKIE_NAME='cookieopticnoisesession';
        var options={path:'/',expires:1};
        $.cookie(COOKIE_NAME,'comps',options);
        callback();
      }
    }
  }
  function login(){
    allFields.removeClass('has-error');
    var bValid=checkValue(password,function(){
      location.href=loc;
      $('#comps-access').modal('hide')
    });
  }
  $('.access').click(function(e){
    if (!$.cookie('cookieopticnoisesession')) {
      loc=$(this).attr("href");
      $('#comps-access').modal('show');
      $('#comps-access').on('shown.bs.modal', function () {
        $('#password').focus()
      })
      e.preventDefault();
    }
  });
  $('#comps-access').on('hidden.bs.modal', function (e) {
    allFields.parent('.form-group').removeClass('has-error');
    tips.removeClass('has-error');
  });
  $("#comps-access").keypress(function(e){
    var charCode;
    if(e&&e.which){
      charCode=e.which;
    }
    else if(window.event){
      e=window.event;
      charCode=e.keyCode;
    }
    if(charCode==13||charCode==3){
      e.preventDefault();
      login();
    }
  });
  $('#dwnAccess').click(function(event){
    login();
  });
}};
