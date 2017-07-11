var emailerror = false;
var passworderror = false;

//news letter ajax call
$(function () {
    $("#output").text("")
           $("#btn_newsletter").click(function () {

               var email = $("#news_email").val();
               var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
               if (!pattern.test(email)) {
                   $("#output").text("Please Enter Valid Email Address!");
                   return false;
               }
               var d = { "email": email};

               var settings = {
                   type : "POST",
                   dataType: "json",
                   url: "/Home/NewsLetterAjax",
                   data: d,
                   success: function (resp) {
                       if (resp.output != null) {
                           //location.href = resp.urlToRedirect;
                           $("#output").text(resp.output)
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

//Singup ajax call

$(function () {

  
    $("#btn_singup").click(function () {

        
            $("#s_output").text("")
            var name = $("#s_name").val();
            var email = $("#s_email").val();
            var pass = $("#s_pass").val();
            var cpass = $("#s_cpass").val();


            var $myForm = $('#signupform');

            if (!$myForm[0].checkValidity()) {
                // If the form is invalid, submit it. The form won't actually submit;
                // this will just cause the browser to display the native HTML5 error messages.
                $myForm.find(':submit').click();
            }

            emailerror = false;
            passworderror = false;
            check_Email_su();
            check_Pasword_su_n();
            if (emailerror === true || passworderror === true) {
                //alert("Registration successfull");
                return false;

            }



            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                $("#s_output").text("Please Enter Valid Email Address!");
                return false;
            }

            var d = { "name": name, "email": email, "pass": pass, "cpass": cpass };

            var settings = {
                type : "POST",
                dataType: "json",
                url: "/Home/SingupAjax",
                data: d,
                success: function (resp) {
                    if (resp.output != null) {
                        //location.href = resp.urlToRedirect;
                        $("#s_output").text(resp.output)
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
    //login ajax call
    $(function () {
        $("#l_output").text("")
        $("#btn_login").click(function () {

            var email = $("#l_email").val();
            var pass = $("#l_pass").val();

            var $myForm = $('#loginform');

            if (!$myForm[0].checkValidity()) {
                // If the form is invalid, submit it. The form won't actually submit;
                // this will just cause the browser to display the native HTML5 error messages.
                $myForm.find(':submit').click();
            }
           
            
            check_Email_lgin();
            
            if (emailerror === true ) {
                //alert("Registration successfull");
                return false;

            }




            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                $("#l_output").text("Please Enter Valid Email Address!");
                return false;
            }

            var d = { "email": email, "password": pass };

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/LoginAjax",
                data: d,
                success: function (resp) {
                    if (resp.output != null) {
                        //location.href = resp.urlToRedirect;
                        if (resp.output == "Loged in!")
                        {
                            location.reload();
                        }
                        $("#l_output").text(resp.output)
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

    //logout ajax call
    $(function () {
        
        $("#btn_logout").click(function () {

            var d = null;

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/LogoutAjax",
                data: d,
                success: function (resp) {
                    location.reload();
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


    //Add to cart ajax call

    function addToCart(p_id) {

       

        var valid = $("#session_field").val();
        if (valid == "false") {
            $('#myModal88').modal();
        }
        else {

            if (p_id == "")
            {
                p_id = $("#mfpid").val();

            }
            var q = $("#single_Quantity").text();

            var d = { "p_id": p_id, "quantity": q };

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/addToCartAjax",
                data: d,
                success: function (resp) {
                    if (resp.valid == false) {
                        //location.href = resp.urlToRedirect;
                        alert("error");

                    }
                    //for displaying cart count written in _myTemlate
                    if (resp.stockOut == 1) {
                        $("#cart_btn").text(resp.message)
                    }
                    setTimeout(
                          function () {
                              $("#cart_btn").text("Add to cart")


                          }, 1500);
                    cartCount();

                },
                error: function (e) {
                    alert("error");
                    //somethin went wrong
                }
            };

            $.ajax(settings);//asynchronous

        }

       // alert(p_id);
        return false;

    }

//delete from cart ajax call i cart page
    function deleteFromCart(cid) {

        $('.' + cid).hide();

        var d = { "cid": cid };

        var settings = {
            type: "POST",
            dataType: "json",
            url: "/Home/DeleteFromCartAjax",
            data: d,
            success: function (resp) {
                //for displaying cart count written in _myTemlate
                cartCount();

            },
            error: function (e) {
                alert("error");
                //somethin went wrong
            }
        };

        $.ajax(settings);//asynchronous

        return false;
    }



//update quantity ajax call in cart page 
    function updatequantity(cid, flag) {


        
        var d = { "cid": cid, "flag": flag };

        var settings = {
            type: "POST",
            dataType: "json",
            url: "/Home/UpdateQuantityAjax",
            data: d,
            success: function (resp) {

                $("#"+cid+cid).text("Rs. "+resp.amount);
            },
            error: function (e) {
                alert("error");
                //somethin went wrong
            }
        };

        $.ajax(settings);//asynchronous*/





       








      //  single_Quantity
      // 
        

        return false;




    }

//add update shipment ajax call
    function shipingDetails() {
       // $('#contact_form').validator();
        

        var name = $("#first_name").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();

        var $myForm = $('#contact_form');

        if (!$myForm[0].checkValidity()) {
            // If the form is invalid, submit it. The form won't actually submit;
            // this will just cause the browser to display the native HTML5 error messages.
            $myForm.find(':button').click();
        }
        
            var d = { "name": name, "phone": phone, "address": address, "city": city, "state": state, "zip": zip };

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/ShipingDetailsAjax",
                data: d,
                success: function (resp) {
                    if (resp.output != null) {
                        //location.href = resp.urlToRedirect;
                        $("#shiping_btn").prop('disabled', false);
                    }

                },
                error: function (e) {
                    alert("error");
                    //somethin went wrong
                }
            };

            $.ajax(settings);//asynchronous
            return false;
        


    }





    function completeAddress() {

        var errors = ["List of errors:\r\n"];

        var name = $("#name2").val();
        var cnic = $("#cnic").val();
        if (name == null || name == "") {

            errors.push("Name can't be blank\r\n");

        }

        if (cnic == null || cnic == "" || cnic.length != 13 || ($.isNumeric(cnic)==false)) {

            errors.push("Phone can't be blank\r\n");

        }

        if (errors.length > 1) {
            $("#reciver_btn").prop('disabled', true);

        }
        else
        {
            var d = { "name": name, "cnic": cnic };

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/CompleteAddressAjax",
                data: d,
                success: function (resp) {
                    if (resp.output != null) {
                        //location.href = resp.urlToRedirect;
                        $("#reciver_btn").prop('disabled', false);
                        
                    }

                },
                error: function (e) {
                    alert("error");
                    //somethin went wrong
                }
            };

            $.ajax(settings);//asynchronous
            return false;
        }
    }



    function PlaceOrder() {
        $("#loader").show();
        var captcha = grecaptcha.getResponse()
        if (captcha == "")
        {
            $("#loader").hide();
            $("#c_output").text("Please Check Google reCaptcha!");
            return false;

        }
       

        var d = { "captcha": captcha };

        var settings = {
            type: "POST",
            dataType: "json",
            url: "/Home/PlaceOrderAjax",
            data: d,

            success: function (resp) {
                if (resp.output != null) {
                    //location.href = resp.urlToRedirect;
                    $("#loader").hide();

                    $("#c_output").text(resp.output);
                    //for displaying cart count written in _myTemlate
                    cartCount();
                    setTimeout(
                          function () {
                              //do something special
                              location.reload();

                          }, 1500);

                }

            },
            error: function (e) {
                alert("error");
                //somethin went wrong
            }
        };

        $.ajax(settings);//asynchronous
        return false;



    }



    
    $(function () {
        $("#btn_updatePass").click(function () {
            $("#s_output").text("")
            var cupass = $("#CurrentPass").val();
            var npass = $("#NewPass").val();
            var cpass = $("#ConfirmPass").val();



            var $myForm = $('#changepassform');

            if (!$myForm[0].checkValidity()) {
                // If the form is invalid, submit it. The form won't actually submit;
                // this will just cause the browser to display the native HTML5 error messages.
                $myForm.find(':submit').click();
            }


            passworderror = false;
            check_Pasword_su_change();
            if (passworderror === true) {
                //alert("Registration successfull");
                return false;

            }


            var d = { "CurrentPass": cupass, "NewPassword": npass, "ConfirmPassword": cpass };

            var settings = {
                type: "POST",
                dataType: "json",
                url: "/Home/UpdatePasswordAjax",
                data: d,
                success: function (resp) {
                    if (resp.output != null) {
                        //location.href = resp.urlToRedirect;
                        $("#s_output").text(resp.output)
                        $("#CurrentPass").val("");
                        $("#NewPass").val("");
                        $("#ConfirmPass").val("");
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





//validations for sign up
 


    //signup validations
    $(document).ready(function () {



        $("#emailError").hide();
        $("#emailError01").hide();//login

        $("#passwordError1").hide();
        $("#passwordError1").hide();


        $("#l_email").focusout(function () {//login
            check_Email_lgin();
        });
        $("#s_email").focusout(function () {
            check_Email_su();
        });
        $("#s_pass").focusout(function () {
            check_Pasword_su_n();
        });
        $("#NewPass").focusout(function () {
            check_Pasword_su_change();
        });



    });



    function check_Email_lgin() {

        var userEmail = $("#l_email").val();
        var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var valid = emailReg.test(userEmail);

        if (valid) {
            $("#check01").removeClass("help-block has-error").addClass("help-block has-success");
            $("#emailError01").hide();
        }
        else {
            $("#check01").removeClass("form-group").addClass("form-group has-error");
            $("#emailError01").html("Invalid Email Address");
            $("#emailError01").show();

            emailerror = true;

        }
    };



    function check_Email_su() {

        var userEmail = $("#s_email").val();
        var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var valid = emailReg.test(userEmail);

        if (valid) {
            $("#check1").removeClass("help-block has-error").addClass("help-block has-success");
            $("#emailError").hide();
        }
        else {
            $("#check1").removeClass("form-group").addClass("form-group has-error");
            $("#emailError").html("Invalid Email Address");
            $("#emailError").show();

            emailerror = true;

        }
    };

    function check_Pasword_su_n() {

        var userPassword = $("#s_pass").val().length;

        if (userPassword < 5) {
            $("#passwordError1").html("Should be at least 5 Characters long")
            $("#passwordError1").show();

            $("#check2").removeClass("form-group has-feedback").addClass("form-group has-error");
            passworderror = true;
        }
        else {
            $("#check2").removeClass("form-group has-error").addClass("form-group has-success");
            $("#passwordError1").hide();
        }
    };


    function check_Pasword_su_change() {

        var userPassword = $("#NewPass").val().length;

        if (userPassword < 5) {
            $("#passerror").html("Should be at least 5 Characters long")
            $("#passerror").show();

            $("#passcheck").removeClass("form-group has-feedback").addClass("form-group has-error");
            passworderror = true;
        }
        else {
            $("#passcheck").removeClass("form-group has-error").addClass("form-group has-success");
            $("#passerror").hide();
        }
    };