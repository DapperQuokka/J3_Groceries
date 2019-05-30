function checkout() {
	// Get data from form
	var cardNumber = document.forms["checkoutForm"]["cardNumber"].value;
	var cardHolder = document.forms["checkoutForm"]["name"].value;
	var expiryMonth = document.forms["checkoutForm"]["expiryMonth"].value;
	var expiryYear = document.forms["checkoutForm"]["expiryYear"].value;
	var cvv = document.forms["checkoutForm"]["cvv"].value;

	// Error check fields
	if (cardNumber.length < 16) {
		// Error check card number
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid card number! Must be 16 digits!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (isNaN(cardNumber) == true) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid card number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (cardNumber.indexOf(".") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid card number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (cardNumber.indexOf(" ") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid card number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (isNaN(cardHolder) == false) {
		// Error check card holder
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid card holder name!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryMonth == "") {
		// Error check expiry month
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (isNaN(expiryMonth) == true) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryMonth.indexOf(".") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryMonth.indexOf(" ") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryMonth.length < 2) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month! Must be 2 digits!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry month!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryYear == "") {
		// Error check expiry year
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry year!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (isNaN(expiryYear) == true) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry year!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryYear.indexOf(".") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry year!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryYear.indexOf(" ") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry year!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (expiryYear.length < 2) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid expiry year! Must be 2 digits!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (parseInt(new Date().getFullYear().toString().substring(2)) > parseInt(expiryYear)) {
		// Error check for if year has passed
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid expiry year! It has already passed!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (parseInt(new Date().getFullYear().toString().substring(2)) == parseInt(expiryYear)) {
		// Error check for if month has passed
		if (parseInt((new Date().getMonth() + 1).toString()) > parseInt(expiryMonth)) {
			document.getElementById("checkoutError").style.display = "block";
			document.getElementById("checkoutError").innerHTML = "<!>ERROR: Invalid expiry month! It has already passed!";
			throw new Error("Oopsies. An error was thrown.");
		}
	} else if (cvv == "") {
		// Error check cvv number
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid CVV number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (isNaN(cvv) == true) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid CVV number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (cvv.indexOf(".") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid CVV number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (cvv.indexOf(" ") > -1) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid CVV number!";
		throw new Error("Oopsies. An error was thrown.");
	} else if (cvv.length < 3) {
		document.getElementById("checkoutError").style.display = "block";
		document.getElementById("checkoutError").innerHTML = "<!>ERROR:  Invalid CVV number! Must be 3 digits!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Set success HTML
	var SUCCESS_HTML_0 = "<tr><td class=\"mainTableCell\" id=\"mainTableCell1\">";
	var SUCCESS_HTML_1 = "<h2>Payment Successful</h2><p>Thank you for buying with J3 Groceries.</p>";
	var SUCCESS_HTML_2 = "<div class=\"backToHomeDiv\">";
	var SUCCESS_HTML_3 = "<button class=\"backToHomeButton\" onclick=\"location.href='../store/index.html'\">Back To Home</button>";
	var SUCCESS_HTML_4 = "</div></td></tr>";
	document.getElementById("mainContents").innerHTML = SUCCESS_HTML_0 + SUCCESS_HTML_1 + SUCCESS_HTML_2 + SUCCESS_HTML_3 + SUCCESS_HTML_4;

	// Empty cart and save in localStorage
	cartArray = [];
	localStorage.setItem("cart", JSON.stringify(cartArray));
}

function checkEmptyCart() {
	// Get cart
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	// Handle cart
	if (cartArray.length == 0 || cartArray == null) {
		var SUCCESS_HTML_0 = "<tr><td class=\"mainTableCell\" id=\"mainTableCell1\">";
		var SUCCESS_HTML_1 = "<h2>Oopsies!</h2><p>Get back to where you came from! You're at the checkout page with no items in your cart! You can't checkout if your cart is empty!</p>";
		var SUCCESS_HTML_2 = "<div class=\"backToHomeDiv\">";
		var SUCCESS_HTML_3 = "<button class=\"backToHomeButton\" onclick=\"location.href='../store/index.html'\">Back To Home</button>";
		var SUCCESS_HTML_4 = "</div></td></tr>";
		document.getElementById("mainContents").innerHTML = SUCCESS_HTML_0 + SUCCESS_HTML_1 + SUCCESS_HTML_2 + SUCCESS_HTML_3 + SUCCESS_HTML_4;
		throw new Error("Oopsies. An error was thrown.");
	}
}