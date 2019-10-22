window.onload = () => {
    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handle_res;
    xhr.open("POST", "/stocks");

    // Parameters
    let params;
    if(localStorage && localStorage["userID"] !== undefined) {
        params = JSON.stringify({userID: localStorage.getItem("userID")});
    } else {
        // No need to render anything
        return;
    }

    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    function handle_res() {
        if(this.readyState !== 4) return;
        if(this.status === 200) {
            let stocks = JSON.parse(this.responseText);
            // Success
            renderDOM(stocks);
        } else {
            // Error!
        }
    }

    xhr.send(params);
}

function renderDOM(stocks) {
    let container = document.querySelector("#stock-container");

    stocks.forEach((stock) => {
        let currentPrice = Number(stock.currentPrice);
        let buyPrice = Number(stock.price);
        let delta = currentPrice - buyPrice;
        let percentChange = delta / buyPrice * 100;

        let stockdiv = document.createElement("div");
        stockdiv.setAttribute("id", "stock");

        let basicInfo = document.createElement("p");
        basicInfo.innerHTML = "<strong>" + stock.name + " (" + stock.ticker + "): " + "</strong> $"
            + "<span class=\"colorVar\">" + (Math.round(delta * 100) / 100) + "</span>"
            + " / "
            + "<span class=\"colorVar\">" + (Math.round(percentChange * 100) / 100)  + "</span>"
            + "%"
            + "<span id=\"expand\">+</span><span id=\"collapse\">-</span>"
            + "<span class=\"delete\" onclick=\"deleteStock(event, \'" + stock._id + "\');\">Delete</span>";

        let expandedInfo = document.createElement("div");
        expandedInfo.setAttribute("id", "expanded-info");
        expandedInfo.innerHTML = "<p>Bought For: $" + buyPrice + "</p>"
            + "<p>Current price: $" + currentPrice + "</p>"
            + "<p>Shares: " + stock.shares + "</p>";

        stockdiv.appendChild(basicInfo);
        stockdiv.appendChild(expandedInfo);

        // Add new element to container div
        container.appendChild(stockdiv);
    });

    // User is logged in, so show logout button
    document.getElementById("logout").style.visibility = "visible";

    $("#stock, this").click(function() {
        $("#expand", this).toggle();
        $("#collapse", this).toggle();
        $("#expanded-info", this).toggle();
    })
    let els = document.getElementsByClassName('colorVar');
    for (let i = 0; i < els.length; i++) {
        let cell = els[i];
        if (cell.textContent < 0) {
            cell.classList.remove('green')
        } else {
            cell.classList.add('green');
        }
    }

}

function logout() {
    localStorage.removeItem("userID");
}

function deleteStock(event, id) {
    // Prevent other event listener from triggering
    event.stopPropagation();
    console.log(typeof id);

    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handle_res;
    xhr.open("POST", "/delete");

    // Parameters
    let params = JSON.stringify({stockID: id});
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    function handle_res() {
        if(this.readyState !== 4) return;
        if(this.status === 200) {
            // Success
            location.reload();
        } else if(this.status === 404) {
            // Error removing stock from database
            console.log("Error removing stock");
        } else {
            // Error!
        }
    }

    xhr.send(params);
}
