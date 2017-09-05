$(document).ready(function(){
    $("#myForm").submit(function(event){
        event.preventDefault();

        var myObj = {
            toppings : [],
            burger : {
                comments : $("#commentText").val(),
            },
        }

        var checks = document.getElementsByClassName("checkInput");
        for(var i = 0; i < checks.length; i++){
            if(checks[i].checked){
                var topping = {
                    nameToppings : ($(checks[i]).val()),
                }
                myObj.toppings.push(topping);
            }
        }

        console.log(myObj);
        $.ajax({
			type: "POST",
			url : "/",
			data : myObj,
			dataType : "json",
			success : function(dataBack){
                console.log(dataBack);
            },
        });
    });
});