/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UserPOST() {
    if (document.getElementById('lib_check').checked) {
        LibrarianChecker();
    } else {
        StudentChecker();
    }
}


function StudentChecker() {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#error').html("Successful Registration. Now please log in!<br> Your Data");
            //$('#error').append(createTableFromJSON(responseData));
            document.getElementById("form").style.display = "none";
            //document.getElementById("json").textContent = JSON.stringify(frmData, undefined, 2);
            buildHtmlTable([frmData]);
        } else if (xhr.status !== 200) {
            $('#error').html('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            for (const x in responseData) {
                $('#error').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
            }
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './RegisterStudent');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function LibrarianChecker() {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#error').html("Successful Registration. Now please log in!<br> Your Data");
            //$('#error').append(createTableFromJSON(responseData));
            document.getElementById("form").style.display = "none";
            //document.getElementById("json").textContent = JSON.stringify(frmData, undefined, 2);
            buildHtmlTable([frmData]);
        } else if (xhr.status !== 200) {
            $('#error').append('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            for (const x in responseData) {
                $('#error').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
            }
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './RegisterLibrarian');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function NameCheck() {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // var myInput = document.getElementById('username');
            // if (myInput && myInput.value) {
            document.getElementById('username_error').innerHTML = "";
            // } else {
            //   document.getElementById('username_error').innerHTML = "eg";
            //}
            //$('#error').append(createTableFromJSON(responseData));
            document.querySelector('#submit').disabled = false;
        } else if (xhr.status !== 200) {
            document.getElementById('username_error').innerHTML = "Name is not Available";
            document.querySelector('#submit').disabled = true;
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './UsernameChecker');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function EmailCheck() {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('email_error').innerHTML = "";
            //$('#error').append(createTableFromJSON(responseData));
            document.querySelector('#submit').disabled = false;
        } else if (xhr.status !== 200) {
            document.getElementById('email_error').innerHTML = "Email is not Available";
            document.querySelector('#submit').disabled = true;
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './EmailChecker');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function PassCheck() {
//if (document.getElementById('student_check').checked) {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('#submit').disabled = false;
            document.getElementById('id_error').innerHTML = "";
        } else if (xhr.status !== 200) {
            document.getElementById('id_error').innerHTML = "Wrong ID number";
            document.querySelector('#submit').disabled = true;
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './StudentIdChecker');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
    // }
}

function buildHtmlTable(myList) {
    var columns = addAllColumnHeaders(myList);
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue === null)
                cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $('#json').append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) === -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $('#json').append(headerTr$);
    return columnSet;
}

//function showLogin() {
//  $("#ajaxContent").load("login.html");
//}

function showLogin() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").load(xhr.responseText);
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'none';
        } else {
            alert("Unexpected Error");
        }
    };
    xhr.open('GET', 'Login?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}


function showRegistrationForm() {
    $("#ajaxContent").load("SignUp.html");
}

function showUserMainPage() {
    $("#ajaxContent").load("loginchoices.html");
    //window.location.href = "loginchoices.html";
    document.getElementById('back').style.display = 'none';
}

function loginPOSTAlternative() {
    var frmData = {};
    $(':input').each(function () {
        frmData[$(this).attr('name')] = $(this).val();
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //setChoicesForLoggedUser();
            $("#ajaxContent").load("loginchoices.html");
            //window.location.href = "./loginchoices.html";
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("Wrong Credentials");
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './Login');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function loginPOST() {
    let data = {};
    data["username"] = document.getElementById("username_login").value;
    data["password"] = document.getElementById("password_login").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //window.location.href = xhr.responseText;
            $("#ajaxContent").load(xhr.responseText);
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'none';
        } else {
            document.getElementById("error").textContent = xhr.responseText;
        }
    };

    xhr.open('POST', 'Login?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
}

function logoutAlt() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.open("index.html", "_self")
            $("#ajaxContent").html("Successful Logout");
            document.getElementById('signup').style.display = 'block';
            document.getElementById('login').style.display = 'block';
            document.getElementById('logout').style.display = 'none';
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);

        }
    };
    xhr.open('POST', './Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };
    xhr.open('GET', 'Logout?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}

function settingPOST() {
    var frmData = {};
    $(':input').each(function () {
        if (jQuery(this)[0].hasAttribute('name')) {
            frmData[$(this).attr('name')] = $(this).val();
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            //$('#error').html("Successful Registration. Now please log in!<br> Your Data");
            //$('#error').append(createTableFromJSON(responseData));
            document.getElementById("form").style.display = "none";
            //document.getElementById("json").textContent = JSON.stringify(frmData, undefined, 2);
            buildHtmlTable([frmData]);
        } else if (xhr.status !== 200) {
            $('#error').html('Request failed. Returned status of ' + xhr.status + "<br>");
            const responseData = JSON.parse(xhr.responseText);
            for (const x in responseData) {
                $('#error').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
            }
        }
    };
    var jsonData = JSON.stringify(frmData);
    //var data = $('#myForm').serialize();
    console.log(frmData);
    xhr.open('POST', './RegisterStudent');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function showSettings() {
    //$("#ajaxContent").load("options.html");
    window.location.href = "options.html";
    //$("#FName").val('value');
    //document.getElementById('FName').value = 'hiiiii';
    //document.getElementById('back').style.display = 'block';
}

window.onload = SettingLoad();

function SettingLoad() {
    if (window.location.pathname.endsWith('options.html')) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
                buildHtmlTable([JSON.parse(xhr.responseText)]);
                alert('ok');
            } else if (xhr.status !== 200) {
                alert('Error. Returned status of ' + xhr.status);
            }
        };
        xhr.open('GET', './Books');
        xhr.send();
        document.getElementById('FName').value = 'hiiiii';
    }
}

function shoowBooks() {
    $("#ajaxContent").load("books.html");
    document.getElementById('back').style.display = 'block';
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            buildHtmlTable([JSON.parse(xhr.responseText)]);
            alert('ok');
        } else if (xhr.status !== 200) {
            alert('Error. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', './Books');
    xhr.send();
}

function showBooks() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // If the request is successful, parse the JSON array
            var bookList = JSON.parse(xhr.responseText);

            // Create a string to hold the HTML
            let html = '<table id="books" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
            html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>ISBN</td><td>TITLE</td><td>WRITER</td><td>KIND</td><td>PUBLICATION YEAR</td><td>PAGES</td><td>URL</td><td>PHOTO</td></tr>';

            // Iterate over the book list and create an HTML representation for each book

            for (let i = 0; i < bookList.books.length; i++) {
                html += "<tr><td>" + bookList.books[i].isbn +
                        "</td><td>" + bookList.books[i].title + "</td><td>" + bookList.books[i].authors +
                        "</td><td>" + bookList.books[i].genre + "</td><td>" + bookList.books[i].pages + "</td><td>" + bookList.books[i].publicationyear +
                        "</td><td>" + bookList.books[i].url + "</td><td>" + "<img height=150 src='" + bookList.books[i].photo + "'/>" + "</td></tr>";
            }
            html += "</table>";

            // Set the inner HTML of the book list container to the generated HTML
            document.getElementById("message").innerHTML = html;
        }
        xhr.open('POST', 'Books?');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
    }
}
