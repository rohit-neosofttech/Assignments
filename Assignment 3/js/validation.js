$(document).ready(function() {
    $('#a_click').click(function() {
        var fname = $('#firstname').val();
        var lname = $('#lastname').val();
        var phone = $('#phone').val();
        var off_phone = $('#off_phone').val();
        var address = $("#email").val();
        var password = $('#password').val();
        var conf_pass = $("#confirm_password").val();

        var DOB_day = $('#DOB_day').val();
        var DOB_month = $('DOB_month').val();
        var DOB_year = $('#DOB_year').val();
        var txt_about = $('#txt_about').val();

        var reg = /^[a-zA-Z]+([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var reg2 = /^[a-zA-Z0-9]{8,12}$/;
        var reg3 = /^[a-zA-Z]*$/;

        if (fname == "") {
            $('#firstname_msg').text("* Please enter email address");
            $('#firstname').css('border', '1px solid red');
        } else if (reg3.test(fname) == false) {
            $('#firstname_msg').text("* First Name should only be Character!");
            $('#firstname').css('border', '1px solid red');
        } else {
            $('#firstname_msg').text("");
            $('#firstname').css('border', '1px solid green');
        }

        if (lname == "") {
            $("#lastname_msg").text("* Please provide your Last Name!");
            $("#lastname").css('border', '1px solid red');
        } else if (reg3.test(lname) == false) {
            $("#lastname_msg").text("* Last Name should only be Character!");
            $("#lastname").css('border', '1px solid red');
        } else {
            $("#lastname_msg").text("");
            $("#lastname").css('border', '1px solid green');
        }

        if (phone == "") {
            $("#phone_msg").text("* Please provide your Phone Number!");
            $("#phone").css('border', '1px solid red');
        } else if (isNaN(parseInt(phone))) {
            $("#phone_msg").text("* Enter Only Number in Phone!");
            $("#phone").css('border', '1px solid red');
        } else if (phone.startsWith("+") == true) {
            if (phone.length != 13) {
                $("#phone_msg").text("* Enter Valid Phone Number!");
                $("#phone").css('border', '1px solid red');
            } else {
                $("#phone_msg").text("");
                $("#phone").css('border', '1px solid green')
            }
        } else {
            if (phone < 6999999999 || phone > 9999999999) {
                $("#phone_msg").text("* Enter Valid Phone Number!");
                $("#phone").css('border', '1px solid red');
            } else {
                $("#phone_msg").text("");
                $("#phone").css('border', '1px solid green')
            }
        }

        var off_phone = $("#off_phone").val();
        if (off_phone == "") {
            $("#off_phone_msg").text("* Please provide your Phone Number!");
            $("#off_phone").css('border', '1px solid red');
        } else if (isNaN(parseInt(off_phone))) {
            $("#off_phone_msg").text("* Enter Only Number in Phone!");
            $("#off_phone").css('border', '1px solid red');
        } else if (off_phone < 6999999999 || off_phone > 9999999999) {
            $("#off_phone_msg").text("* Enter Valid Phone Number!");
            $("#off_phone").css('border', '1px solid red');
        } else {
            $("#off_phone_msg").text("");
            $("#off_phone").css('border', '1px solid green')
        }

        if (address == "") {
            $("#email_msg").text("* Please provide your Email!");
            $("#email").css('border', '1px solid red');
        } else if (reg.test(address) == false) {
            $("#email_msg").text("* Invalid Email Address!");
            $("#email").css('border', '1px solid red');
        } else {
            $("#email_msg").text("");
            $("#email").css('border', '1px solid green');
        }

        if (password == "") {
            $("#password_msg").text("* Please Provide your Password!");
            $("#password").css('border', '1px solid red');;
        } else if (password.length < 8 || password.length > 12) {
            $("#password_msg").text("* Please password between 8-12 character");
            $("#password").css('border', '1px solid red');;
        } else if (reg2.test(password) == false) {
            $("#password_msg").text("* Please Provide Password without any Special character!");
            $("#password").css('border', '1px solid red');;
        } else {
            $("#password_msg").text("");
            $("#password").css('border', '1px solid green');
            $('#confirm_password').prop("disabled", false)
            if (conf_pass == "") {
                $("#confirm_password_msg").text("* Please Confirm the password!");
                $("#confirm_password").css('border', '1px solid red');
            } else if (password != conf_pass) {
                $("#confirm_password_msg").text("* Password doesn't match");
                $("#confirm_password").css('border', '1px solid red');
            } else {
                $("#confirm_password_msg").text("");
                $("#confirm_password").css('border', '1px solid green');
            }
        }



        var DOB_day = $("#day").val();
        var DOB_month = $("#month").val();
        var DOB_year = $("#year").val();

        today_date = new Date();
        today_year = today_date.getFullYear();
        today_month = today_date.getMonth();
        today_day = today_date.getDate();
        var age = 0;

        if (DOB_month == 0 || DOB_day == 0 || DOB_year == 0) {
            $("#dob_msg").text("* Enter a Valid Date of Birth");
        } else {
            $("#dob_msg").text("");
            if (today_month < DOB_month) {
                age = today_year - DOB_year + ((DOB_month - today_month) / 12);
            } else {
                age = today_year - DOB_year + ((today_month - DOB_month) / 12);
            }
            $("#age").val(age.toFixed(2));
            $("#age").disabled = true;
            $("#age").css('border', '1px solid green');
        }

        if ($('input[name="radio"]:checked').length == 0) {
            $("#gender_msg").text("* Select a Gender!");
        } else {
            $("#gender_msg").text("");
        }

        if ($(".checkbox").is(":checked")) {
            $("#checkbox_msg").text("");
        } else {
            $("#checkbox_msg").text("Select a Category!");
        }

        var txt_about = $("#txt_about").val();
        if (txt_about == "") {
            $("#txt_about_msg").text("* Please Fill the Text Area!");
            $("#txt_about").css('border', '1px solid red');
        } else {
            $("#txt_about_msg").text("");
            $("#txt_about").css('border', '1px solid green');
        }
    });
});