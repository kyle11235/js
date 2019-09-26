 
	//MyTree renders a menu or a tree based on data as follows
	//objects with parentId of null are root elements
	var MyTree = (function(){
	
		var configuration={
						'containerId':'MyTreeContainer',	
						'itemId':'MyTreeItem',
						'maxLevel':4
						};
		
		var setConfiguration = function(_configuration){
			for(var attr in _configuration){
				if(configuration[attr] !== undefined){
					configuration[attr] = _configuration[attr];
				}
			}
		}
		
		var defaultData = [
						{'id':'1','name':'name1','url':'www.google.com','parentId':null,'order':1},
						{'id':'2','name':'name2','url':'www.facebook.com','parentId':null,'order':2},
						{'id':'3','name':'name3','url':'www.apple.com','parentId':null,'order':3},
						{'id':'4','name':'name4','url':'www.ibm.com','parentId':1,'order':4},
						{'id':'5','name':'name5','url':'www.google.com','parentId':1,'order':1},
						{'id':'6','name':'name6','url':'www.facebook.com','parentId':2,'order':2},
						{'id':'7','name':'name7','url':'www.apple.com','parentId':2,'order':1},
						{'id':'8','name':'name8','url':'www.ibm.com','parentId':3,'order':2},
						{'id':'9','name':'name9','url':'www.apple.com','parentId':4,'order':1},
						{'id':'10','name':'name10','url':'www.ibm.com','parentId':4,'order':2}
					];
		//this function create ul and li, put it into element has elementId
		var renderChildren = function(elementId, level){
			//debugger;
			var container = $('#'+elementId);
			
			if(container === undefined || container.attr('rendered')!==undefined && container.attr('rendered')==='YES'){
				return;
			}else{
				container.attr('rendered','YES');
			}
			var parentId = elementId;
			//get data from server
			var url;
			if(elementId === configuration.containerId){
				parentId=null;
				url = ctx+"/manager/menu/list/-1";	
			}else{
				url = ctx+"/manager/menu/list/"+elementId;
			}
			if(level===undefined){
				level = 1; 
				container.attr('level',1);
			}else{
				level = parseInt(container.attr('level'))+1;
			}
			$.ajax({ 
				type: "GET",
				url: url,
				dataType:'json',
				success: function(res){
					var ul = $('<ul id="'+parentId+'_ul"></ul>');
					var data = res.menus;
					if(data!==undefined && data !== null && data.length !== undefined && data.length !== 0 ){
						for(var i=0; i<data.length; i++){
							ul.append(createLi(data[i].id, data[i].name, data[i].url, data[i].parentId, data[i].order, level));
						}
					}
					debugger;
					if(level<=configuration.maxLevel){
						var add = $('<li parentId="'+parentId+'" order="9999"><a href="">添加</a></li>');
						$(add).bind('click',onClickAdd);
						ul.append(add);
					}
					container.append(ul);
					
				},
				error: function(xhr,msg){
					alert(msg);
				}
			});
		}
		
		var createLi = function(id, name, url, parentId, order, level, isSelected){
			if(url===null){
				url='';
			}
			var str;
			if(isSelected!==undefined && isSelected==='YES'){
				str = '<li id='+id+' level="'+level+'" class="selected" name="'+name+'" url="'+url+'" parentId="'+parentId+'" order="'+order+'">'+name+'</li>';
			}else{
				str = '<li id='+id+' level="'+level+'" name="'+name+'" url="'+url+'" parentId="'+parentId+'" order="'+order+'">'+name+'</li>';
			}
			var li = $(str);
			$(li).bind('click',onClick);
			return li;
		}
		
		var onClick = function(event){
		
			var id = $(this).attr('id');
			var level = parseInt($(this).attr('level'));
			//change style of selected item
			selectElement(id);
			//render children items of this item
			renderChildren(id, level+1);
			//show the current item at updating section
			var parentId = $(this).attr('parentId');
			renderItem(id,parentId);
			event.stopPropagation();
		}
		
		var onClickAdd = function(event){
			var parentId = $(this).attr('parentId');
			
			if(parentId!==undefined){
				selectElement(parentId);
				renderItem(null, parentId);
			}
			return false;
			//return false; contains preventDefault and stopPropagation
		}
	
		var selectElement = function(id){
			if(id!==null){
				$('.selected').removeClass('selected');
				$('#'+id).addClass('selected');
			}else{
				$('.selected').removeClass('selected');
			}
			
		}
	
		
		var renderItem = function(id, parentId){
			var item = $('#'+configuration.itemId);
			var child;
			var nameInput;
			var orderInput;
			var updateBtn;
			var deleteBtn;
			var submitBtn;
			
			if(item === undefined){
				return;
			}
			item.html('');
			
			if(id!==undefined && id!==null ){
				child = $('#'+id);
			
				nameInput = $('<input id="newName" value='+child.attr('name')+'></input>');
				urlInput = $('<input id="newUrl" value='+child.attr('url')+'></input>');
				orderInput = $('<input id="newOrder" value='+child.attr('order')+'></input>');
				updateBtn = $('<a class="btn" itemId='+child.attr('id')+' parentId='+parentId+' href="javascript:void(0)">更新</a>');
				$(updateBtn).bind('click',updateItem);
				deleteBtn = $('<a class="btn" itemId='+child.attr('id')+' href="javascript:void(0)">删除</a>');
				$(deleteBtn).bind('click',deleteItem);
				item.append('name:').append(nameInput);
				item.append('url:').append(urlInput);
				item.append('order:').append(orderInput);
				item.append(updateBtn);
				item.append(deleteBtn);
			}else{
				nameInput = $('<input id="newName"></input>');
				urlInput = $('<input id="newUrl"></input>');
				orderInput = $('<input id="newOrder"></input>');
				submitBtn = $('<a class="btn" parentId='+parentId+' href="javascript:void(0)">提交</a>');
				submitBtn.bind('click',insertItem);
				item.append('name:').append(nameInput);
				item.append('url:').append(urlInput);
				item.append('order:').append(orderInput);
				item.append(submitBtn);
			}
			
			
		
			
		}
		
		var updateItem = function(){
			var id = $(this).attr('itemId');
			var newName = $('#'+'newName').val();
			var newUrl = $('#'+'newUrl').val();
			var newOrder = $('#'+'newOrder').val();
			var parentId = $(this).attr('parentId');
			if($.trim(newName) === ''){
				alert('请输入名字');
				return;
			}
			
			if(isNaN(newOrder) || newOrder<1 || newOrder>9999){
				alert('排序必须为数字，范围1-9999');
				return;
			}
			
			//ajax update
			var url = ctx+"/manager/menu/update/";	
			$.ajax({ 
				type: "POST",
				url: url,
				data:{
					id:id,
					name:newName,
					url:newUrl,
					order:newOrder
				},
				dataType:'json',
				success: function(res){
					if(res.rows ===1){
						//update tree node
						var li = $('#'+id);
						var level = li.attr('level');
						var newLi = createLi(id, newName, newUrl, parentId, newOrder, level, 'YES');
						li.remove();
						addLiToList(newLi);
					}else{
						alert('wrong');
					}
				},
				error: function(xhr,msg){
					alert(msg);
				}
			});
			return false;
		}
		
		var deleteItem = function(){
			//ajax
			if(!confirm('确定删除?')){
				return;
			}
			//delete item and children
			var id = $(this).attr('itemId');
			var url = ctx+"/manager/menu/delete/";	
			$.ajax({ 
				type: "POST",
				url: url,
				data:{
					id:id
				},
				dataType:'json',
				success: function(res){
					if(res.rows !== 0){
						$('#'+id).remove();
						$('#'+configuration.itemId).html('');
					}else{
						alert('wrong');
					}
				},
				error: function(xhr,msg){
					alert(msg);
				}
			});
			
			return false;
		}
		
		var insertItem = function(){
			var newName = $('#'+'newName').val();
			var newUrl = $('#'+'newUrl').val();
			var newOrder = $('#'+'newOrder').val();
			var parentId = $(this).attr('parentId');
			var level;
			if(parentId!=='null'){
				level =  parseInt($('#'+parentId).attr('level'))+1;
			}else{
				level = 1;
			}
			if($.trim(newName) === ''){
				alert('请输入名字');
				return;
			}
			
			if(isNaN(newOrder) || newOrder<1 || newOrder>9999){
				alert('排序必须为数字，范围1-9999');
				return;
			}
			//ajax
			var url = ctx+"/manager/menu/add/";	
			$.ajax({ 
				type: "POST",
				url: url,
				data:{
					name:newName,
					url:newUrl,
					parentId:parentId,
					order:newOrder
				},
				dataType:'json',
				success: function(res){
					if(res.id !== undefined){
						//insert item
						var li = createLi(res.id, newName, newUrl, parentId, newOrder, level);
						//append tree node
						addLiToList(li);
						$('#'+configuration.itemId).html('');
					}else{
						alert('wrong');
					}
				},
				error: function(xhr,msg){
					alert(msg);
				}
			});
			return false;
		}
		
		var addLiToList = function(li){
			var parentId = li.attr('parentId');
			
			
			$('#'+parentId+'_ul').children('[parentId]='+parentId).each(function(){
				if(parseInt(li.attr('order')) <= parseInt($(this).attr('order'))){
					$(this).before(li);
					return false;
				}
			});
		}
		
		var init = function(configuration){
			setConfiguration(configuration);
			renderChildren(configuration.containerId);
		}
	
		return{
			init:init
		
		}
	
	
	}());
	
