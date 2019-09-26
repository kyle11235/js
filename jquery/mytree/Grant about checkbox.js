var Grant = (function(){
	
	var init = function(){
		$('#selectAll').bind("click",selectAll);
		$('#cancelAll').bind("click",cancelAll);
		$('#submitButton').bind("click",submit);
		$('input[type=checkbox][name=ability]').bind("click",unCheckChildren);
		
	}
	
	var submit = function(){
		var accountId = $('#accountId').val();
		var ids = [];
		$("input[type=checkbox][name=ability]:checked").each(function(){
			   ids.push($(this).val());
		  });  
		var url = ctx+"/manager/user/grant/";	
		$.ajax({ 
			type: "POST",
			url: url,
			data:{
				accountId:accountId,
				ids:ids
			},
			dataType:'json',
			success: function(res){
				if(res.code ===200){
					alert('成功');
				}else{
					alert('失败');
				}
			},
			error: function(xhr,msg){
				alert(msg);
			}
		});
	}
	
	var unCheckChildren = function(){
		var id = $(this).val();
		$('input[type=checkbox][parentId='+id+']').each(function(){
			   $(this).attr("checked",false);
		  }); 
	}
	
	var selectAll = function(){
		$("input[name='ability']").each(function(){
		   $(this).attr("checked",true);
		  });  
	}
	
	var cancelAll = function(){
		$("input[name='ability']").each(function(){
		   $(this).attr("checked",false);
		  }); 
	}
	return{
		init:init
	}
	
}());