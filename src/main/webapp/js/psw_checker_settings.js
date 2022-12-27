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




pass.addEventListener('keyup', () => {
    checkPassword();
    password_safety();
})



passconfirm.addEventListener('keyup', checkPassword);





