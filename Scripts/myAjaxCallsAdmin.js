//add product check avilable product id
$(function () {
    $("#pid_output").text("")
    $("#product_id").focusout(function () {

        var p_id = $("#product_id").val();
       
        var d = { "p_id": p_id };

        var settings = {
            type: "POST",
            dataType: "json",
            url: "/Admin/pidAvailabilityAjax",
            data: d,
            success: function (resp) {
                if (resp.available ==1) {
                    //location.href = resp.urlToRedirect;
                    $("#pid_output").text("")
                }
                else if (resp.available == 0) {
                    //location.href = resp.urlToRedirect;
                    $("#pid_output").text("ID Already Exist!")
                }
                else if (resp.available == -1) {
                    //location.href = resp.urlToRedirect;
                    $("#pid_output").text("Something Went Wrong!")
                }
            },
            error: function (e) {
                alert("error");
                //somethin went wrong
            }
        };

        $.ajax(settings);//asynchronous

        return false;
    });
});








