
# select radio/checkbox/select

## radio button

        - target：select a radio
                $('#radioId').attr('checked',true);


        - target: get selected value for a radio group
        		data.userStatus = $('input[name="updateUserStatus"]:checked').val();

## check box

        - target：check/cancel all checkbox

                $('#selectAll').live('click',function(){
                $("input[name='authority']").each(function(){
                        $(this).attr("checked",true);
                        });  
                });

                $('#cancelAll').live('click',function(){
                $("input[name='authority']").each(function(){
                        $(this).attr("checked",false);
                        });  
                });

## select

        - target：select an option
                method1：each
                $('#branchCompanyId option').each(function(){
                if($(this).val()===lastSearchCompany){
                        $(this).attr('selected','selected');
                        qfang.manager.organization.User.refreshSearchUserPosition();
                        return;
                }
                });

                method2：find
                $('#positionType').find('option[value=""]').attr('selected','selected');


        - target：reset select
                var ele = $("#positionId");
                ele.empty();
                ele.append('<option value="">全部岗位</option>');
                var p; 
                for(p in data){
                	ele.append('<option value='+data[p].id+' >'+data[p].name+'</option>');
        		}