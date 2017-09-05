$(document).ready(function(){
    //adjust form data to send to "/" as POST
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
                var topping = [($(checks[i]).val())];
                myObj.toppings.push(topping);
            }
        }

        $.ajax({
			type: "POST",
			url : "/",
			data : myObj,
			dataType : "json",
			success : function(dataBack){
                location.reload();//refresh page
            },
        });
    });
});