onl.mod.initdownload={init:function(){
  onl.log('onl.initdownload.init');
  var str="",
  loc,
  type,
  itemId,
  password=$("#login-password"),
  allFields=$([]).add(password),
  tips=$("#validateLoginTips");
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
      $('#comps-login').modal('hide')
    });
  }

  $('.download').click(function(e){
    type=$(this).data("type");
    itemId=$(this).data("id");
    if (type=="comp") {
      loc="download_comp.php?id=" + itemId;
    }
    else if (type="song") {
      loc="download_song.php?id=" + itemId;
    }
    if (!$.cookie('cookieopticnoisesession')) {
      $('#comps-login').modal('show');
      $('#comps-login').on('shown.bs.modal', function () {
        $('#password').focus()
      });
    }
    else {
      location.href=loc;
    }
    e.preventDefault();
  });

  $('#comps-login').on('hidden.bs.modal', function (e) {
    allFields.parent('.form-group').removeClass('has-error');
    tips.removeClass('has-error');
  });

  $("#comps-login").keypress(function(e){
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
  $('#dwnLogin').click(function(e){
    e.preventDefault;
    login();
  });
}};
