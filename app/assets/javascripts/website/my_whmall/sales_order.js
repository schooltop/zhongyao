function order_quick_select(n){
  $("#order_state ul li a").removeClass("active");	
  if(n=="all"){	
      if($("#search_params_ship_status").val()=="draft") $("#search_params_ship_status").val("");
      $("#search_params_order_status").val("");
  	  $("#all").addClass("active");
      $('select').comboSelect();
  }else if(n=="confirmed"){
  	  $("#confirmed").addClass("active");
      $("#search_params_order_status").val("1");
  }else if(n=="unconfirmed"){
  	  $("#unconfirmed").addClass("active");
  	  $("#search_params_order_status").val("0");
  }else if(n=="ship_status"){
      $("#search_params_order_status").val("");
  	  $("#ship_status").addClass("active");
      $("#search_params_ship_status").val("draft");
      $('select').comboSelect();
  };
  get_quoted_list();
}


function get_quoted_list(){
    $('body').append(loading);
    $("#new_search_params").submit();
    close_loading_div();
}

function order_search(){
  if($("#search_params_ship_status").val()!="draft"){
    $("#ship_status").removeClass("active");
    if($("#search_params_order_status").val()=="") $("#all").addClass("active"); 
  };
  get_quoted_list();
}

