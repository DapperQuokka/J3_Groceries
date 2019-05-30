function loadProductPage() {
	// Get inventory and cart
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	// Get product info
	var fullTerm = window.location.search;
	var itemID = unescape(fullTerm.substring(fullTerm.indexOf("=") + 1)).toUpperCase();

	// Check if search term exists
	if (fullTerm == "") {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You haven't entered an item ID!";
		throw new Error("Oopsies. An error was thrown.");
	}
	
	// Check if there's no =
	if (fullTerm.indexOf("=") == -1) {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You haven't entered an item ID!";
		throw new Error("Oopsies. An error was thrown.");
	}
	
	// Check if there's no item ID specified
	if (itemID == "") {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You haven't entered an item ID!";
		throw new Error("Oopsies. An error was thrown.");
	}
	
	// Check if it's not ?query
	if (fullTerm.substring(0, fullTerm.indexOf("=")) != "?item") {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! That isn't an item query!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Get item index in itemArray
	var itemArrayIndex = -1;
	for (var i = 0; i < itemArray.length; i++) {
		if (itemArray[i][0].toUpperCase() == itemID) {
			itemArrayIndex = i;
			break;
		}
	}
	
	// If product is not found
	if (itemArrayIndex == -1) {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! That product doesn't exist!";
		throw new Error("Oopsies. An error was thrown.");
	}
	
	// Set product HTML code
	var itemDisplayHTML1 = "<tr><td id=\"pictureTD\">";
	var itemDisplayHTML2 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + itemID + "\">";
	var itemDisplayHTML3 = "<img src=\"../img/products/" + itemID + ".png\" alt=\"Item Picture\" class=\"itemPicture\">";
	var itemDisplayHTML4 = "</div></td><td class=itemInfoTD><div class=\"itemInfo\">";
	var itemDisplayHTML5 = "<div class=\"itemID\">" + itemID + "</div>";
	var itemDisplayHTML6 = "<div class=\"itemName\" id=\"itemName_" + itemID + "\">";
	var itemDisplayHTML7 = itemArray[itemArrayIndex][1];
	var itemDisplayHTML8 = "</div>";
	var itemDisplayHTML9 = "<div class=\"itemDescription\" id=\"itemDescription_" + itemID + "\">";
	var itemDisplayHTML10 = itemArray[itemArrayIndex][4];
	var itemDisplayHTML11 = "</div></div>";
	var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + itemID + "\">";
	var itemDisplayHTML13 = "$" + itemArray[itemArrayIndex][5];
	var itemDisplayHTML14 = "</div>";
	var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + itemID + "\">";

	// Initialize null cartArray
	if (cartArray == null) {
		cartArray = [];
	}

	// Use either add to cart button or quantity changer depending if item is in cart
	var alreadyInCart = false;
	var alreadyInCartQuantity = -1;
	for (var i = 0; i < cartArray.length; i++) {
		if (itemID == cartArray[i][0]) {
			alreadyInCart = true;
			alreadyInCartQuantity = cartArray[i][2];
			break;
		}
	}

	if (alreadyInCart == true) {
		var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + itemID + "\">";
		var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + itemID + "\" onclick=\"quantityMinus(this)\">-</button>";
		var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + itemID + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
		var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + itemID + "\" onclick=\"quantityPlus(this)\">+</button>";
		var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + itemID + "\">The maximum amount of this item you can purchase is 9999.</div>";
		var itemDisplayHTML21 = "</div>";
		var itemDisplayHTML22 = "</div><div class=\"itemDetails\"><div class=\"category\">Category: " + itemArray[itemArrayIndex][2];
		var itemDisplayHTML23 = "</div><div class=\"manufacturer\">Manufacturer: " + itemArray[itemArrayIndex][3];
		var itemDisplayHTML24 = "</div></div></td></tr>";

		// Add item to display
		document.getElementById("itemTable").innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22 + itemDisplayHTML23 + itemDisplayHTML24;

		// Display max number alert if quantity is 9999
		if (parseInt(alreadyInCartQuantity) == 9999) {
			document.getElementById("max9999Alert_" + itemID).style.display = "inherit";
			document.getElementById("incQuan_" + itemID).disabled = true;
			document.getElementById("incQuan_" + itemID).style.backgroundColor = "#dee2e8";
			document.getElementById("incQuan_" + itemID).style.color = "#a2a7ad";
			document.getElementById("itemPrice_" + itemID).style.bottom = "73px";
			document.getElementById("incQuan_" + itemID).style.cursor = "default";
		}
	} else {
		var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\" class=\"addToCartButton\" id=\"addToCartButton_" + itemID + "\">Add to Cart</button>";
		var itemDisplayHTML17 = "</div><div class=\"itemDetails\"><div class=\"category\">Category: " + itemArray[itemArrayIndex][2];
		var itemDisplayHTML18 = "</div><div class=\"manufacturer\">Manufacturer: " + itemArray[itemArrayIndex][3];
		var itemDisplayHTML19 = "</div></div></td></tr>";

		// Add item to display
		document.getElementById("itemTable").innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19;
	}
}