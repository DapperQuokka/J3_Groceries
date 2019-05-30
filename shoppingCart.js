/*
	CART ARRAY FORMAT:
		[0]: Item ID
		[1]: Item Price
		[2]: Item Quantity
*/

var beforeFocusQuantity = "";
var dropdownTimer;
var cartArray = [];

function addToCart(el) {
	// Get cart
	cartArray = JSON.parse(localStorage.getItem("cart"));
	if (cartArray == null) {
		cartArray = [];
	}
	
	// Add item to cartArray
	var elementId = el.id;
	var elementIndex = elementId.substring(elementId.indexOf("_") + 1);
	var cartArrayLength = cartArray.length;
	var itemPriceFromHTML = document.getElementById("itemPrice_" + elementIndex).textContent;
	var itemPrice = itemPriceFromHTML.substring(itemPriceFromHTML.indexOf("$") + 1, itemPriceFromHTML.indexOf(".") + 3);
	cartArray[cartArrayLength] = [];
	cartArray[cartArrayLength][0] = elementIndex;
	cartArray[cartArrayLength][1] = itemPrice;
	cartArray[cartArrayLength][2] = "1";

	recalculateCart();

	// Change Add to Cart button into quantity changer
	var quantityChangerHTML1 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + elementIndex + "\">";
	var quantityChangerHTML2 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + elementIndex + "\" onclick=\"quantityMinus(this)\">-</button>";
	var quantityChangerHTML3 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + elementIndex + "\" class=\"quantityField\" value=\"1\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
	var quantityChangerHTML4 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + elementIndex + "\" onclick=\"quantityPlus(this)\">+</button>";
	var quantityChangerHTML5 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + elementIndex + "\">The maximum amount of this item you can purchase is 9999.</div>";
	var quantityChangerHTML6 = "</div>";
	document.getElementById("itemCartManage_" + elementIndex).innerHTML = quantityChangerHTML1 + quantityChangerHTML2 + quantityChangerHTML3 + quantityChangerHTML4 + quantityChangerHTML5 + quantityChangerHTML6;

	localStorage.setItem("cart", JSON.stringify(cartArray));
	displayCartDropdown(elementIndex);
}

function viewCart() {
	// Get cart and inventory
	cartArray = JSON.parse(localStorage.getItem("cart"));
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));

	var currentContent = "";

	if (cartArray == null || cartArray.length == 0) {
		// Set div contents
		currentContent = "<div class=\"emptyCartAlert\">Oh no! Your cart is empty.</div>";
		document.getElementById("cart").innerHTML = currentContent;
	} else {
		var itemsWithMaxNumber = [];
		for (var i = 0; i < cartArray.length; i++) {
			// Get info of cart item
			var elementIndex = cartArray[i][0];
			var itemName = "";

			// Find cart item's name
			for (var x = 0; x < itemArray.length; x++) {
				if (itemArray[x][0] == elementIndex) {
					itemName = itemArray[x][1];
					break;
				}
			}

			if (itemName == "") {
				console.log("This item no longer exists and has been removed from the database. Will not display.");
			} else {
				// Set HTML
				var cartHTML1 = "<tr>";
				var cartHTML2 = "<td class=\"cartTablePicture\"><img src=\"../img/products/" + cartArray[i][0] + ".png\" alt=\"Product Image\" class=\"cartItemPicture\" onclick=\"location.href='../product/index.html?item=" + cartArray[i][0] + "'\"></td>";
				var cartHTML3 = "<td class=\"cartTableItem\"><div class=\"nameInfoDiv\" onclick=\"location.href='../product/index.html?item=" + cartArray[i][0] + "'\">" + itemName + "<br><span class=\"cartItemPrice\">$" + cartArray[i][1] + "</span></div></td>";
				var cartHTML4 = "<td class=\"cartTableQuantity\"><div class=\"itemCartManage\" id=\"itemCartManage_" + cartArray[i][0] + "\">";
				var cartHTML5 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + cartArray[i][0] + "\">";
				var cartHTML6 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + cartArray[i][0] + "\" onclick=\"quantityMinus(this)\">-</button>";
				var cartHTML7 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + cartArray[i][0] + "\" class=\"quantityField\" value=\"" + cartArray[i][2] + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
				var cartHTML8 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + cartArray[i][0] + "\" onclick=\"quantityPlus(this)\">+</button>";
				var cartHTML9 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + cartArray[i][0] + "\">The maximum amount of this item you can purchase is 9999.</div>";
				var cartHTML10 = "</div></div></td>";
				var cartHTML11 = "<td class=\"cartTableTotalPrice\">$" + (parseFloat(cartArray[i][1]) * parseInt(cartArray[i][2])).toFixed(2).toString() + "</td>";
				var cartHTML12 = "<td class=\"cartTableRemoveItem\"><img src=\"../img/X.png\" alt=\"Remove Item\" class=\"cartRemoveItemPicture\" id=\"cartRemoveItem_" + cartArray[i][0] + "\" onmouseover=\"hoverChangeRemoveItemImage(this)\" onmouseout=\"unhoverChangeRemoveItemImage(this)\" onclick=\"removeItemFromCart(this)\"></td>";
				var cartHTML13 = "</tr>";

				if (parseInt(cartArray[i][2]) == 9999) { 
					itemsWithMaxNumber.push(cartArray[i][0]);
				}

				// Set HTML to variable
				currentContent += cartHTML1 + cartHTML2 + cartHTML3 + cartHTML4 + cartHTML5 + cartHTML6 + cartHTML7 + cartHTML8 + cartHTML9 + cartHTML10 + cartHTML11 + cartHTML12 + cartHTML13;
			}
		}

		// Set table contents to HTML
		document.getElementById("cartTable").innerHTML = currentContent;

		for (var y = 0; y < itemsWithMaxNumber.length; y++) {
			document.getElementById("max9999Alert_" + itemsWithMaxNumber[y]).style.display = "inherit";
			document.getElementById("incQuan_" + itemsWithMaxNumber[y]).disabled = true;
			document.getElementById("incQuan_" + itemsWithMaxNumber[y]).style.backgroundColor = "#dee2e8";
			document.getElementById("incQuan_" + itemsWithMaxNumber[y]).style.color = "#a2a7ad";
			document.getElementById("incQuan_" + itemsWithMaxNumber[y]).style.cursor = "default";
		}
	}
}

function storeCurrentQuantity(el) {
	beforeFocusQuantity = el.value;
}

function checkQuantityValid(el) {
	var elementId = el.id;
	var elementIndex = elementId.substring(elementId.indexOf("_") + 1);
	var elementValue = el.value;
	var addToCartButtonHTML = "<button onclick=\"addToCart(this)\" class=\"addToCartButton\" id=\"addToCartButton_" + elementIndex + "\">Add to Cart</button>";

	if (isNaN(elementValue)) {
		el.value = beforeFocusQuantity;
	} else if (elementValue.indexOf(".") > -1) {
		el.value = beforeFocusQuantity;
	} else if (elementValue.indexOf(" ") > -1) {
		el.value = beforeFocusQuantity;
	} else if (elementValue.indexOf("-") > -1) {
		el.value = beforeFocusQuantity;
	} else if (elementValue == "") {
		el.value = beforeFocusQuantity;
	} else {
		if (parseInt(elementValue) >= 9999) {
			// Change quantity to 9999, display max number alert, change button properties
			el.value = "9999";
			document.getElementById("max9999Alert_" + elementIndex).style.display = "inherit";
			document.getElementById("incQuan_" + elementIndex).disabled = true;
			document.getElementById("incQuan_" + elementIndex).style.backgroundColor = "#dee2e8";
			document.getElementById("incQuan_" + elementIndex).style.color = "#a2a7ad";
			document.getElementById("incQuan_" + elementIndex).style.cursor = "default";
			if (location.pathname.includes("shopping-cart/index.html") == false) {
				document.getElementById("itemPrice_" + elementIndex).style.bottom = "73px";
			}
			
			// Update array
			for (var i = 0; i < cartArray.length; i++) {
				if (cartArray[i][0] == elementIndex) {
					cartArray[i][2] = "9999";
					break;
				}
			}
		} else {
			// Remove max number alert, change button properties
			document.getElementById("max9999Alert_" + elementIndex).style.display = "none";
			document.getElementById("incQuan_" + elementIndex).disabled = false;
			document.getElementById("incQuan_" + elementIndex).style.backgroundColor = "#005ba5";
			document.getElementById("incQuan_" + elementIndex).style.color = "#ffffff";
			document.getElementById("incQuan_" + elementIndex).style.cursor = "pointer";
			if (location.pathname.includes("shopping-cart/index.html") == false) {
				document.getElementById("itemPrice_" + elementIndex).style.bottom = "42px";
			}
			
			if (parseInt(elementValue) == 0) {
				// Change quantity changer back to Add to Cart button if quantity is changed to 0, update array
				document.getElementById("quantityChanger_" + elementIndex).innerHTML = addToCartButtonHTML;
				for (var i = 0; i < cartArray.length; i++) {
					if (cartArray[i][0] == elementIndex) {
						cartArray.splice(i, 1);
						break;
					}
				}
				if (location.pathname.includes("shopping-cart/index.html") == true) {
					window.location.reload(true);
				}
			} else {
				// Update array
				for (var i = 0; i < cartArray.length; i++) {
					if (cartArray[i][0] == elementIndex) {
						cartArray[i][2] = elementValue;
						break;
					}
				}
			}
		}
		
		if (parseInt(elementValue) > beforeFocusQuantity) {
			recalculateCart();
			displayCartDropdown(elementIndex);
			if (location.pathname.includes("shopping-cart/index.html") == true) {
				cartAmountsDisplay();
			}
		} else {
			recalculateCart();
			if (location.pathname.includes("shopping-cart/index.html") == true) {
				cartAmountsDisplay();
			}
		}
		
		if (location.pathname.includes("shopping-cart/index.html") == true) {
			window.location.reload(true);
		}
	}

	beforeFocusQuantity = "";
}

function quantityMinus(el) {
	var elementId = el.id;
	var elementIndex = elementId.substring(elementId.indexOf("_") + 1);
	var quantityFieldValue = document.getElementById("quan_" + elementIndex).value;
	var addToCartButtonHTML = "<button onclick=\"addToCart(this)\" class=\"addToCartButton\" id=\"addToCartButton_" + elementIndex + "\">Add to Cart</button>";

	if (parseInt(quantityFieldValue) > 1) {
		if (parseInt(quantityFieldValue) == 9999) {
			// Remove max number alert, reenable button, change button colour
			document.getElementById("max9999Alert_" + elementIndex).style.display = "none";
			document.getElementById("incQuan_" + elementIndex).disabled = false;
			document.getElementById("incQuan_" + elementIndex).style.backgroundColor = "#005ba5";
			document.getElementById("incQuan_" + elementIndex).style.color = "#ffffff";
			document.getElementById("incQuan_" + elementIndex).style.cursor = "pointer";
			if (location.pathname.includes("shopping-cart/index.html") == false) {
				document.getElementById("itemPrice_" + elementIndex).style.bottom = "42px";
			}
		}
		// Decrease quantity by 1, update array
		document.getElementById("quan_" + elementIndex).value = (parseInt(quantityFieldValue) - 1).toString();
		for (var i = 0; i < cartArray.length; i++) {
			if (cartArray[i][0] == elementIndex) {
				cartArray[i][2] = (parseInt(cartArray[i][2]) - 1).toString();
				break;
			}
		}
	} else if (parseInt(quantityFieldValue) == 1) {
		// Change quantity changer back to Add to Cart button if quantity is changed to 0, update array
		document.getElementById("quantityChanger_" + elementIndex).innerHTML = addToCartButtonHTML;
		for (var i = 0; i < cartArray.length; i++) {
			if (cartArray[i][0] == elementIndex) {
				cartArray.splice(i, 1);
				break;
			}
		}
		if (location.pathname.includes("shopping-cart/index.html") == true) {
			window.location.reload(true);
		}
	}

	recalculateCart();
	if (location.pathname.includes("shopping-cart/index.html") == true) {
		cartAmountsDisplay();
	}
	
	if (location.pathname.includes("shopping-cart/index.html") == true) {
		window.location.reload(true);
	}
}

function quantityPlus(el) {
	var elementId = el.id;
	var elementIndex = elementId.substring(elementId.indexOf("_") + 1);
	var quantityFieldValue = document.getElementById("quan_" + elementIndex).value;

	if (parseInt(quantityFieldValue) < 9999) {
		// Increase quantity by 1, update array
		document.getElementById("quan_" + elementIndex).value = (parseInt(quantityFieldValue) + 1).toString();
		for (var i = 0; i < cartArray.length; i++) {
			if (cartArray[i][0] == elementIndex) {
				cartArray[i][2] = (parseInt(cartArray[i][2]) + 1).toString();
				break;
			}
		}
	
		if (parseInt(quantityFieldValue) == 9998) {
			// Display max number alert, disable button, change button colour
			document.getElementById("max9999Alert_" + elementIndex).style.display = "inherit";
			document.getElementById("incQuan_" + elementIndex).disabled = true;
			document.getElementById("incQuan_" + elementIndex).style.backgroundColor = "#dee2e8";
			document.getElementById("incQuan_" + elementIndex).style.color = "#a2a7ad";
			document.getElementById("incQuan_" + elementIndex).style.cursor = "default";
			if (location.pathname.includes("shopping-cart/index.html") == false) {
				document.getElementById("itemPrice_" + elementIndex).style.bottom = "73px";
			}
		}
	}
	
	recalculateCart();
	displayCartDropdown(elementIndex);
	if (location.pathname.includes("shopping-cart/index.html") == true) {
		cartAmountsDisplay();
	}
	
	if (location.pathname.includes("shopping-cart/index.html") == true) {
		window.location.reload(true);
	}
}

function recalculateCart() {
	// Calculate new cart details
	var newCartNumberOfItems = 0;
	var newCartTotalPrice = 0;
	var cartArrayLength = cartArray.length;
	for (var i = 0; i < cartArray.length; i++) {
		newCartNumberOfItems += parseInt(cartArray[i][2]);
		newCartTotalPrice += parseFloat(cartArray[i][1]) * parseInt(cartArray[i][2]);
	}

	// Update cart details in top bar, update local storage
	document.getElementById("cartContents").innerHTML = newCartNumberOfItems.toString() + " ITEMS - $" + newCartTotalPrice.toFixed(2).toString();
	localStorage.setItem("cart", JSON.stringify(cartArray));
}


function displayCartDropdown(elementIndex) {
	// Get inventory
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	
	// Remove dropdown timer
	clearTimeout(dropdownTimer);
	
	// Get item name
	var itemName;
	for (var i = 0; i < itemArray.length; i++) {
		if (itemArray[i][0] == elementIndex) {
			itemName = itemArray[i][1];
			break;
		}
	}

	// Hide cart dropdown
	document.getElementById("cartDropdownArrow").style.visibility = "hidden";
	document.getElementById("cartDropdownArrow").style.opacity = "0";
	document.getElementById("cartDropdownContent").style.visibility = "hidden";
	document.getElementById("cartDropdownContent").style.opacity = "0";

	// Display cart dropdown
	document.getElementById("cartDropdownArrow").style.visibility = "visible";
	document.getElementById("cartDropdownArrow").style.opacity = "1";
	document.getElementById("cartDropdownContent").style.visibility = "visible";
	document.getElementById("cartDropdownContent").style.opacity = "1";

	// Update dropdown contents
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i][0] == elementIndex) {
			document.getElementById("cartDropdownTablePicture").innerHTML = "<img src=\"../img/products/" + elementIndex + ".png\" alt=\"Product Image\" class=\"cartDropdownPicture\">";
			document.getElementById("cartDropdownTableItem").innerHTML = itemName + "<br><span class=\"cartDropdownItemPrice\">$" + cartArray[i][1] + "</span>";
			document.getElementById("cartDropdownTableQuantity").innerHTML = cartArray[i][2];
			document.getElementById("cartDropdownTableTotalPrice").innerHTML = "$" + (parseFloat(cartArray[i][1]) * parseInt(cartArray[i][2])).toFixed(2).toString();
			break;
		}
	}
	
	// Hide cart dropdown after delay
	dropdownTimerFunction();
}

function dropdownTimerFunction() {
	dropdownTimer = window.setTimeout(function() {
		document.getElementById("cartDropdownArrow").style.transitionTimingFunction = "linear";
		document.getElementById("cartDropdownContent").style.transitionTimingFunction = "linear";
		document.getElementById("cartDropdownArrow").style.visibility = "hidden";
		document.getElementById("cartDropdownArrow").style.opacity = ".5";
		document.getElementById("cartDropdownContent").style.visibility = "hidden";
		document.getElementById("cartDropdownContent").style.opacity = ".5";
	}, 1500);
}

function hoverChangeRemoveItemImage(el) {
	el.src="../img/X_dark.png";
}

function unhoverChangeRemoveItemImage(el) {
	el.src="../img/X.png";
}

function removeItemFromCart(el) {
	var elementId = el.id;
	var elementIndex = elementId.substring(elementId.indexOf("_") + 1);

	// Get cart
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	// Find item in cartArray
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i][0] == elementIndex) {
			cartArray.splice(i, 1);
			break;
		}
	}

	// Store new cart in local storage
	localStorage.setItem("cart", JSON.stringify(cartArray));

	// Reload page
	window.location.reload(true);
}

function emptyCart() {
	// Get cart
	cartArray = JSON.parse(localStorage.getItem("cart"));

	// Set cart to blank
	cartArray = [];

	// Store new cart in local storage
	localStorage.setItem("cart", JSON.stringify(cartArray));

	// Reload page
	window.location.reload(true);
}

function loadCart() {
	// Get cart
	cartArray = JSON.parse(localStorage.getItem("cart"));

	// Calculate cart details
	if (cartArray == null || cartArray.length == 0) {
		console.log("The cart array is empty/null. Cart details will not update.")
	} else {
		var newCartNumberOfItems = 0;
		var newCartTotalPrice = 0;
		var cartArrayLength = cartArray.length;
		for (var i = 0; i < cartArray.length; i++) {
			newCartNumberOfItems += parseInt(cartArray[i][2]);
			newCartTotalPrice += parseFloat(cartArray[i][1]) * parseInt(cartArray[i][2]);
		}
	
		// Update cart details in top bar, update local storage
		document.getElementById("cartContents").innerHTML = newCartNumberOfItems.toString() + " ITEMS - $" + newCartTotalPrice.toFixed(2).toString();
	}
}


function cartAmountsDisplay() {
	// Get cart
	cartArray = JSON.parse(localStorage.getItem("cart"));

	var numberOfItems = 0;
	var subtotal = 0;
	var DELIVERY_FEE = 9.99;
	var tax = 0;
	var TAX_RATE = 0.13;
	var total = 0;
	
	// Initialize null array
	if (cartArray == null) {
		cartArray = [];
	}
	
	// Calculate details
	for (var i = 0; i < cartArray.length; i++) {
		// Get number of items
		numberOfItems += parseInt(cartArray[i][2]);
		
		// Get subtotal
		subtotal += parseFloat(cartArray[i][1]) * parseInt(cartArray[i][2]);
	}
	
	// Calculate tax
	tax = ((subtotal + DELIVERY_FEE) * TAX_RATE).toFixed(2);
	
	// Calculate total
	total = subtotal + DELIVERY_FEE + parseFloat(tax);
	
	// Display values
	if (numberOfItems == 0) {
		document.getElementById("cartDetailsNumberOfItems").innerHTML = numberOfItems + " items in your order";
		document.getElementById("cartDetailsSubtotalAmount").innerHTML = "$0.00";
		document.getElementById("cartDetailsDeliveryFeeAmount").innerHTML = "N/A";
		document.getElementById("cartDetailsHSTAmount").innerHTML = "$0.00";
		document.getElementById("cartDetailsTotalAmount").innerHTML = "$0.00";
	} else {
		document.getElementById("cartDetailsNumberOfItems").innerHTML = numberOfItems + " items in your order";
		document.getElementById("cartDetailsSubtotalAmount").innerHTML = "$" + subtotal.toFixed(2);
		document.getElementById("cartDetailsDeliveryFeeAmount").innerHTML = "$" + DELIVERY_FEE;
		document.getElementById("cartDetailsHSTAmount").innerHTML = "$" + tax;
		document.getElementById("cartDetailsTotalAmount").innerHTML = "$" + total.toFixed(2);
	}
	
	if (numberOfItems == 0) {
		if (location.pathname.includes("shopping-cart/index.html") == true) {
			document.getElementById("checkoutButton").style.backgroundColor = "#dee2e8";
			document.getElementById("checkoutButton").disabled = true;
			document.getElementById("checkoutButton").style.color = "#a2a7ad";
			document.getElementById("checkoutButton").style.cursor = "default";
		}
	}
}