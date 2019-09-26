 
	//Grant renders a menu or a tree based on data as follows
	//objects with parentId of null are root elements
	var Grant = (function(){
	
		var configuration={
						'containerId':'GrantContainer',	
						'itemId':'GrantItem'	
						};
		
		var setConfiguration = function(_configuration){
			for(var attr in _configuration){
				if(configuration[attr] !== undefined){
					configuration[attr] = _configuration[attr];
				}
			}
			configuration = _configuration;
		
		}
		
		var fakeData = [
					{'id':'1','name':'name1','url':'www.google.com','parentId':null,'order':'1'},
					{'id':'2','name':'name2','url':'www.facebook.com','parentId':null,'order':'2'},
					{'id':'3','name':'name3','url':'www.apple.com','parentId':null,'order':'3'},
					{'id':'4','name':'name4','url':'www.ibm.com','parentId':'1','order':'4'},
					{'id':'5','name':'name5','url':'www.google.com','parentId':'1','order':'1'},
					{'id':'6','name':'name6','url':'www.facebook.com','parentId':'2','order':'2'},
					{'id':'7','name':'name7','url':'www.apple.com','parentId':'2','order':'1'},
					{'id':'8','name':'name8','url':'www.ibm.com','parentId':'3','order':'2'},
					{'id':'9','name':'name9','url':'www.apple.com','parentId':'4','order':'1'},
					{'id':'10','name':'name10','url':'www.ibm.com','parentId':'4','order':'2'}
				];
		//this function create ul and li, put it into element has elementId
		var renderChildren = function(elementId){
			//debugger;
			var container = $('#'+elementId);
			
			if(container === undefined || container.attr('rendered')!==undefined && container.attr('rendered')==='YES'){
				return;
			}else{
				container.attr('rendered','YES');
			}
			
			var data;
			
			if(elementId === configuration.containerId){
				data = getData(null);
			}else{
				data = getData(elementId);
			}
		
			if(data===undefined || data === null || data.length === undefined || data.length === 0 ){
				return;
			}
			
			var ul = $('<ul></ul>');
			for(var i=0; i<data.length; i++){
				ul.append(createLi(data[i].id, data[i].name, data[i].parentId, data[i].order));
			}
			
			var add = $('<li parentId='+data[0].parentId+'><a href="">add</a></li>');
			$(add).bind('click',onClickAdd);
			ul.append(add);
			container.append(ul);
			
		}
		
		var createLi = function(id, name, url, parentId, order){
			var li = $('<li id='+id+' name='+name+' url='+url+' parentId='+parentId+' order='+order+'>'+name+'</li>');
			$(li).bind('click',onClick);
			return li;
		}
		
		var onClick = function(event){
		
			var id = $(this).attr('id');
			//change style of selected item
			selectElement(id);
			//render children items of this item
			renderChildren(id);
			//show the current item at updating section
			renderItem(id);
			event.stopPropagation();
		}
		
		var onClickAdd = function(event){
			var parentId = $(this).attr('parentId');
			
			if(parentId!==undefined && parentId!=='null'){
				selectElement(parentId);
			}else if(parentId==='null'){
				//add button in first level does not have parentId
				selectElement(null);
			}
			renderItem(null);
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
	
		var getData = function(parentId){
			//ajax
			var out = [];
			
			if(fakeData === undefined || fakeData.length===0){
				return out;
			}
			for(var i=0; i < fakeData.length; i++){
				if(fakeData[i].parentId === parentId){
					out.push(fakeData[i]);
				}
			}
			return out;
		}
		
		var renderItem = function(id){
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
				updateBtn = $('<a class="btn" key='+child.attr('id')+' href="javascript:void(0)">update</a>');
				$(updateBtn).bind('click',updateItem);
				deleteBtn = $('<a class="btn" key='+child.attr('id')+' href="javascript:void(0)">delete</a>');
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
				submitBtn = $('<a class="btn" href="javascript:void(0)">submit</a>');
				submitBtn.bind('click',insertItem);
				item.append('name:').append(nameInput);
				item.append('url:').append(urlInput);
				item.append('order:').append(orderInput);
				item.append(submitBtn);
			}
			
			
		
			
		}
		
		var updateItem = function(){
			var newName = $('#'+'newName').val();
			var newUrl = $('#'+'newUrl');
			var newOrder = $('#'+'newOrder');
			//ajax update
			
			//reset tree node
			//createLi();
			//replace tree node
		}
		
		var deleteItem = function(){
			//ajax
			
			//delete item and children
		}
		
		var insertItem = function(){
			var newName = $('#'+'newName').val();
			var newUrl = $('#'+'newUrl');
			var newOrder = $('#'+'newOrder');
			
			//ajax
			
			//insert item
			//createLi();
			//append tree node
		}
		
		var sortChildren = function(){
			
		
		}
		
		var init = function(configuration){
			setConfiguration(configuration);
			renderChildren(configuration.containerId);
		}
	
		return{
		
			init:init
		
		}
	
	
	}());
	
