/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let pass = document.getElementById('pwd');
let passconfirm = document.getElementById('pwd-valid');
let result = document.getElementById('result');
let warning = document.getElementById('warning');
let submit = document.getElementById('submit');


function student_checker() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var email = document.getElementById('email').value;
    var years = (new Date(end).getFullYear() - new Date(start).getFullYear());
    if (new Date(end).getMonth() < new Date(start).getMonth())
        years--;
    else {
        if (new Date(end).getMonth() == new Date(start).getMonth()) {
            if (new Date(end).getDate() < new Date(start).getDate())
                years--;
        }
    }
    if (document.getElementById('student_check').checked) {
        var select = document.getElementById('uni');
        var value = select.options[select.selectedIndex].value;
        if (value == 'UOC' && email.endsWith("uoc.gr") == false) {
            alert("Your email should end with uoc.gr")
            return false;
        } else if (value == 'HELMEPA' && email.endsWith("helmepa.gr") == false) {
            alert("Your email should end with helmepa.gr")
            return false;
        } else if (value == "TUC" && email.endsWith("tuc.gr") == false) {
            alert("Your email should end with tuc.gr")
            return false;
        }
        if (end < start) {
            alert("You cannot get your Id card after its expiration date")
            return false;
        }
        if (document.getElementById('ugrad').checked && years > 6) {
            alert("Id card cannot be older than 6 years when you are an undergraduate")
            return false;
        } else if (document.getElementById('grad').checked && years > 2) {
            alert("Id card cannot be older than 2 years when you are a graduate")
            return false;
        } else if (document.getElementById('master').checked && years > 5) {
            alert("Id card cannot be older than 5 years when you are a master")
            return false;
        }
        return true;
    } else {
        return true;
    }
}

function checkbox_checker() {
    if (document.getElementById('terms').checked == false) {
        alert("You need to accept our terms and conditions");
    }
}




function checkPassword() {
    result.innerText = pass.value == passconfirm.value ? "Matching" : "Not Matching";
    if (pass.value.length == 0 && passconfirm.value.length == 0) {
        result.innerText = "";
    }
    if (pass.value != passconfirm.value) {
        submit.disabled = true;
    } else {
        submit.disabled = false;
    }
}

function pswShow() {
    var x = document.getElementById("pwd");
    var y = document.getElementById("pwd-valid");
    var z = document.getElementById("showpass");
    if (x.type === "password") {
        x.type = "text";
        y.type = "text";
        z.value = "Hide Password";
    } else {
        x.type = "password";
        y.type = "password";
        z.value = "Show Password";
    }
}

function password_safety() {
    value = pass.value;
    if (value.includes("uoc") === true || value.includes("elmepa") === true || value.includes("tuc") === true) {
        warning.innerHTML = "This password cannot be used";
        submit.disabled = true;
    } else {
        warning.innerHTML = "";
        submit.disabled = false;
    }
}

function password_strength() {
    value = pass.value;
    var strong = false;
    var medium = false;
    var weak = false;
    var lower = /^[a-z]+$/;
    var upper = /^[A-Z]+$/;
    if (value.replace(/[^0-9]/g, '').length >= (value.length / 2)) {
        weak = true;
    }
    var lowercase = false;
    var capital = false;
    var symbols = value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
    for (i = 0; i < value.length; i++) {
        if (lower.test(value.charAt(i))) {
            lowercase = true;
        }
        if (upper.test(value.charAt(i))) {
            capital = true;
        }
    }

    if (symbols != null && lowercase != null && capital != null) {
        if (symbols.length > 1 && lowercase && capital) {
            strong = true
        }
    }

    if (weak) {
        document.getElementById("weak").innerHTML = "Weak";
        document.getElementById("medium").innerHTML = "";
        document.getElementById("strong").innerHTML = "";
        submit.disabled = true;
    } else if (strong && !weak) {
        document.getElementById("weak").innerHTML = "";
        document.getElementById("medium").innerHTML = "";
        document.getElementById("strong").innerHTML = "Strong";
        submit.disabled = false;
    } else {
        document.getElementById("weak").innerHTML = "";
        document.getElementById("medium").innerHTML = "Medium";
        document.getElementById("strong").innerHTML = "";
        submit.disabled = false;
    }

    if (value.length == 0) {
        document.getElementById("weak").innerHTML = "";
        document.getElementById("medium").innerHTML = "";
        document.getElementById("strong").innerHTML = "";
    }
}

function  student_selector() {
    if (document.getElementById('lib_check').checked) {
        document.getElementById('idcode').value = '';
        document.getElementById('student_forms').style.display = 'none';
        document.querySelector('#addr_title').innerHTML = 'Address of the Library:';
        document.getElementById('lib_forms').style.display = 'block';
        document.querySelector('#lib_info').setAttribute('required', '');
        document.querySelector('#lib').setAttribute('required', '');
    }
    if (document.getElementById('student_check').checked) {
        document.getElementById('student_forms').style.display = 'block';
        document.querySelector('#addr_title').innerHTML = 'Home Address:';
        document.getElementById('lib_forms').style.display = 'none';
        document.querySelector('#lib_info').removeAttribute('required');
        document.querySelector('#lib').removeAttribute('required', '');
    }
}


pass.addEventListener('keyup', () => {
    checkPassword();
    password_safety();
})



passconfirm.addEventListener('keyup', checkPassword);


