function myFunction() {
    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById("lastname").value;
    var phone = document.getElementById("phone").value;
    var off_phone = document.getElementById("off_phone").value;
    var address = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var conf_pass = document.getElementById("confirm_password").value;
    var DOB_day = document.getElementById("day").value;
    var DOB_month = document.getElementById("month").value;
    var DOB_year = document.getElementById("year").value;
    var txt_about = document.getElementById("txt_about").value;


    var reg3 = /^[a-zA-Z]*$/;
    if (fname == "") {
        document.getElementById("firstname_msg").innerHTML = "Please provide your First Name!";
        document.getElementById("firstname").style.borderColor = "red";
    } else if (reg3.test(fname) == false) {
        document.getElementById("firstname_msg").innerHTML = "First Name should only be Character!";
        document.getElementById("firstname").style.borderColor = "red";
    } else {
        document.getElementById("firstname_msg").innerHTML = "";
        document.getElementById("firstname").style.borderColor = "green";
    }

    if (lname == "") {
        document.getElementById("lastname_msg").innerHTML = "Please provide your Last Name!";
        document.getElementById("lastname").style.borderColor = "red";
    } else if (reg3.test(lname) == false) {
        document.getElementById("lastname_msg").innerHTML = "Enter Valid Last Name!";
        document.getElementById("lastname").style.borderColor = "red";
    } else {
        document.getElementById("lastname_msg").innerHTML = "";
        document.getElementById("lastname").style.borderColor = "green";
    }

    if (phone == "") {
        document.getElementById("phone_msg").innerHTML = "Please provide your Phone Number!";
        document.getElementById("phone").style.borderColor = "red";
    } else if (isNaN(parseInt(phone))) {
        document.getElementById("phone_msg").innerHTML = "Enter Only Number in Phone!";
        document.getElementById("phone").style.borderColor = "red";
    } else if (phone < 6999999999 || phone > 9999999999) {
        document.getElementById("phone_msg").innerHTML = "Enter Valid Phone Number!";
        document.getElementById("phone").style.borderColor = "red";
    } else {
        document.getElementById("phone_msg").innerHTML = "";
        document.getElementById("phone").style.borderColor = "green";
    }

    if (off_phone == "") {} else if (isNaN(parseInt(off_phone))) {
        document.getElementById("off_phone_msg").innerHTML = "Enter Only Number!";
        document.getElementById("off_phone").style.borderColor = "red";
    } else {
        document.getElementById("off_phone_msg").innerHTML = "";
        document.getElementById("off_phone").style.borderColor = "green";
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (address == "") {
        document.getElementById("email_msg").innerHTML = "Please provide your Email!";
        document.getElementById("email").style.borderColor = "red";
    } else if (reg.test(address) == false) {
        document.getElementById("email_msg").innerHTML = "Invalid Email Address!";
        document.getElementById("email").style.borderColor = "red";
    } else {
        document.getElementById("email_msg").innerHTML = "";
        document.getElementById("email").style.borderColor = "green";
    }

    var reg2 = /^[a-zA-Z0-9]{8,12}$/;
    if (password == "") {
        document.getElementById("password_msg").innerHTML = "Please Provide your Password!";
        document.getElementById("password").style.borderColor = "red";
    } else if (password.length < 8 || password.length > 12) {
        document.getElementById("password_msg").innerHTML = "Please password between 8-12 character";
        document.getElementById("password").style.borderColor = "red";
    } else if (reg2.test(password) == false) {
        document.getElementById("password_msg").innerHTML = "Please Provide Password without any Special character!";
        document.getElementById("password").style.borderColor = "red";
    } else {
        document.getElementById("password_msg").innerHTML = "";
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("age").disabled = false;
        if (conf_pass == "") {
            document.getElementById("confirm_password_msg").innerHTML = "Please Confirm the password!";
            document.getElementById("confirm_password").style.borderColor = "red";
        } else if (password != conf_pass) {
            document.getElementById("confirm_password_msg").innerHTML = "Password doesn't match";
            document.getElementById("confirm_password").style.borderColor = "red";
        } else {
            document.getElementById("confirm_password_msg").innerHTML = "";
            document.getElementById("confirm_password").style.borderColor = "green";
        }
    }


    if (DOB_month == 0 || DOB_day == 0 || DOB_year == 0) {
        alert("Please Enter Valid Date of Birth");
    }

    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();

    if (DOB_month == 0 || DOB_day == 0 || DOB_year == 0) {
        document.getElementById("dob_msg").innerHTML = "Enter a Valid Date of Birth";
    } else {
        document.getElementById("dob_msg").innerHTML = "";
        if (today_month < DOB_month) {
            age = today_year - DOB_year + ((DOB_month - today_month) / 12);
        } else {
            age = today_year - DOB_year + ((today_month - DOB_month) / 12);
        }
        document.getElementById("age").value = age.toFixed(2);
        document.getElementById("age").disabled = true;
    }

    if (document.getElementById('residence1').checked == false && document.getElementById('residence2').checked == false) {
        alert("Please Select you Gender!");
    }


    if (document.getElementById('checkbox_sample18').checked == false && document.getElementById('checkbox_sample19').checked == false && document.getElementById('checkbox_sample20').checked == false) {
        alert("Please Check atleast one CheckBox");
    }

    if (txt_about == "") {
        document.getElementById("txt_about_msg").innerHTML = "Please Fill the Text Area!";
        document.getElementById("txt_about").style.borderColor = "red";
    } else {
        document.getElementById("txt_about_msg").innerHTML = "";
        document.getElementById("txt_about").style.borderColor = "green";
    }

}