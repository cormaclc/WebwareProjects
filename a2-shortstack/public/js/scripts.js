// Add some Javascript code here, to run on the front end.

function appendID(){
    console.log('run')
    if (window.localStorage["userID"] !== undefined) {
        let form = document.querySelector("#add-stock");
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "userID";
        input.value = window.localStorage["userID"];
        form.appendChild(input);
    }
    // return false; // don't submit the form

    let ticker = document.querySelector("#ticker").value;
    let shares = document.querySelector("#num-shares").value;
    let price = document.querySelector("#bought-at").value;
    //let userID = document.querySelector("#userID").value;

    xhr = new XMLHttpRequest();

    console.log(shares);

    xhr.onreadystatechange = handle_res;
    xhr.open("POST", "/addstock");

    // Parameters
    let params = JSON.stringify({ticker: ticker, shares: shares, price: price, userID: window.localStorage.userID});
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    function handle_res() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
            // Success
            //let userID = JSON.parse(this.responseText);
            // localStorage.setItem("userID", userID);
            // redirect
            window.location.href = '/stocks'; //relative to domain
        } else if (this.status === 401) {
            // Invalid login
            displayError("Please fill all fields");
            return;
        } else {
            // Error!
        }
    }

    xhr.send(params);


    return false;
}

// Override form submit and handle authentication manually
function submitLogin() {
    let username = document.querySelector(".username-field").value;
    let password = document.querySelector(".password-field").value;

    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handle_res;
    xhr.open("POST", "/login");

    // Parameters
    let params = JSON.stringify({username: username, password: password});
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    function handle_res() {
        if(this.readyState !== 4) return;
        if(this.status === 200) {
            // Success
            let userID = JSON.parse(this.responseText);
            localStorage.setItem("userID", userID);
            // redirect
            window.location.href = '/stocks'; //relative to domain
        } else if(this.status === 401) {
            // Invalid login
            displayError("Invalid Username/Password");
            return;
        } else {
            // Error!
        }
    }

    xhr.send(params);

    // Prevent form from submitting
    return false;
}

// Override form submit and handle authentication manually
function submitRegistration() {
    let username = document.querySelector(".username-field").value;
    let password = document.querySelectorAll(".password-field")[0].value;
    let comfirm = document.querySelectorAll(".password-field")[1].value;

    if (password !== comfirm) {
        displayError("Passwords do not match");
    } else {
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = handle_res;
        xhr.open("POST", "/register");

        // Parameters
        let params = JSON.stringify({username: username, password: password});
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        function handle_res() {
            if(this.readyState !== 4) return;
            if(this.status === 200) {
                // Account created
                let userID = JSON.parse(this.responseText);
                localStorage.setItem("userID", userID);
                // redirect
                window.location.href = '/stocks'; //relative to domain
            } else if(this.status === 409) {
                // Username in use
                displayError("Username Taken");
                return;
            } else {
                // Error!
            }
        }

        xhr.send(params);
    }

    // Prevent form from submitting
    return false;
}

function displayError(message) {
    let errorObj = document.querySelector(".error-msg");
    let textObj = errorObj.querySelector(".error-text");

    textObj.innerText = message;
    // fadeIn(errorObj);
    errorObj.style.display = 'block';
    errorObj.style.opacity = 1;
    // Display for 3 seconds
    // setTimeout(function(){
    //     fade(errorObj);
    // }, 3000);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;
    }, 50);
}
