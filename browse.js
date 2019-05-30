var browseMatches = [];

function browseItems() {
	// Get inventory and cart
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	var cartArray = JSON.parse(localStorage.getItem("cart"));
	
	// Get browse details
	var browseTerm = window.location.search;
	var browseTypeIndex = -1;
	var itemName = unescape(browseTerm.substring(browseTerm.indexOf("=") + 1));
	var browseType = browseTerm.substring(1, browseTerm.indexOf("="));
	var currentContents = "";
	var numberOfItems = 0;

	// Get type of browse
	if (browseType == "category") {
		browseTypeIndex = 2;
	} else if (browseType == "manufacturer") {
		browseTypeIndex = 3;
	} else {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You're browsing by a type that doesn't exist. You can only browse by category and manufacturer!";
		throw new Error("Oopsies. An error was thrown.");
	}
	
	// Check if term is blank
	if (itemName == "") {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You haven't specified a browse term!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Store item names
	var browsedItemsArray = [];
	for (var i = 0; i < itemArray.length; i++) {
		if (itemArray[i][browseTypeIndex] == itemName) {
			browsedItemsArray.push(itemArray[i][1]);
			browseMatches.push(itemArray[i]);
		}
	}

	// Sort array alphabetically
	browsedItemsArray.sort();

	var itemsWithMaxNumber = [];
	for (var i = 0; i < browsedItemsArray.length; i++) {
		for (var x = 0; x < itemArray.length; x++) {
			if (itemArray[x][1] == browsedItemsArray[i]) {
				// Add new row
				if (numberOfItems % 3 == 0) {
					currentContents += "<tr>";
				}

				// Set HTML for item
				var itemDisplayHTML0 = "<td>";
				var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + itemArray[x][0] + "\">";
				var itemDisplayHTML2 = "<img src=\"../img/products/" + itemArray[x][0] + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + itemArray[x][0] + "'\">";
				var itemDisplayHTML3 = "</div>";
				var itemDisplayHTML4 = "<div class=\"itemInfo\">";
				var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + itemArray[x][0] + "\" onclick=\"location.href='../product/index.html?item=" + itemArray[x][0] + "'\">";
				var itemDisplayHTML6 = itemArray[x][1];
				var itemDisplayHTML7 = "</div>";
				var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + itemArray[x][0] + "\">";
				var itemDisplayHTML9 = itemArray[x][4];
				var itemDisplayHTML10 = "</div>";
				var itemDisplayHTML11 = "</div>";
				var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + itemArray[x][0] + "\">";
				var itemDisplayHTML13 = "$" + itemArray[x][5];
				var itemDisplayHTML14 = "</div>";
				var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + itemArray[x][0] + "\">";

				// Use either add to cart button or quantity changer depending if item is in cart
				var alreadyInCart = false;
				var alreadyInCartQuantity = -1;
				if (cartArray == null || cartArray.length == 0) {
					alreadyInCart = false;
				} else {
					for (var y = 0; y < cartArray.length; y++) {
						if (itemArray[x][0] == cartArray[y][0]) {
							alreadyInCart = true;
							alreadyInCartQuantity = cartArray[y][2];
							break;
						}
					}
				}

				if (alreadyInCart == true) {
					var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + itemArray[x][0] + "\">";
					var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + itemArray[x][0] + "\" onclick=\"quantityMinus(this)\">-</button>";
					var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + itemArray[x][0] + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
					var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + itemArray[x][0] + "\" onclick=\"quantityPlus(this)\">+</button>";
					var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + itemArray[x][0] + "\">The maximum amount of this item you can purchase is 9999.</div>";
					var itemDisplayHTML21 = "</div>";
					var itemDisplayHTML22 = "</div>";
					var itemDisplayHTML23 = "</td>";

					// Add item to currentContents
					currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22 + itemDisplayHTML23;

					// Add to array if quantity is 9999
					if (parseInt(alreadyInCartQuantity) == 9999) {
						itemsWithMaxNumber.push(itemArray[x][0]);
					}
				} else {
					var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + itemArray[x][0] + "\">Add to Cart</button>";
					var itemDisplayHTML17 = "</div>";
					var itemDisplayHTML18 = "</td>";

					// Add item to currentContents
					currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17;
				}

				// Increase numberOfItems
				numberOfItems++;

				// End row
				if (numberOfItems % 3 == 0) {
					currentContents += "</tr>";
				}
			}
		}
	}

	// End row in case row was not ended
	if (numberOfItems % 3 != 0) {
		currentContents += "</tr>";
	}

	// Display error in case there's no items
	if (numberOfItems == 0) {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You're browsing for something that doesn't have any items. This specific " + browseType + " doesn't have any items!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Display number of items, browse type, and contents
	if (browseType == "category") {
		document.getElementById("browsingBy").innerHTML = numberOfItems + " items found in category \"" + itemName + "\"";
	} else {
		document.getElementById("browsingBy").innerHTML = numberOfItems + " items found by manufacturer \"" + itemName + "\"";
	}
	document.getElementById("itemsTable").innerHTML = currentContents;

	for (var i = 0; i < itemsWithMaxNumber.length; i++) {
		// Display max number alert if quantity is 9999
		document.getElementById("max9999Alert_" + itemsWithMaxNumber[i]).style.display = "inherit";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).disabled = true;
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.backgroundColor = "#dee2e8";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.color = "#a2a7ad";
		document.getElementById("itemPrice_" + itemsWithMaxNumber[i]).style.bottom = "73px";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.cursor = "default";
	}
}

function itemSortBy() {
	var sortSelect = document.getElementById("sortBy");
	var selectedText = sortSelect.options[sortSelect.selectedIndex].text;

	if (selectedText == "Relevance") {
		// If sort by relevance, just reload page
		window.location.reload(true);
		
	} else if (selectedText == "Alphabetical A-Z") {
		// Sort by alphabetical A-Z
		browseMatches.sort(function(a, b) {
			var productA = a[1].toUpperCase();
			var productB = b[1].toUpperCase();
			if (productA < productB) {
				return -1;
			}

			if (productA > productB) {
				return 1;
			}

			return 0;
		});

	} else if (selectedText == "Alphabetical Z-A") {
		// Sort by alphabetical A-Z then reverse array
		browseMatches.sort(function(a, b) {
			var productA = a[1].toUpperCase();
			var productB = b[1].toUpperCase();
			if (productA < productB) {
				return -1;
			}

			if (productA > productB) {
				return 1;
			}

			return 0;
		});
		browseMatches.reverse();

	} else if (selectedText == "Price Lowest to Highest") {
		// Sort by lowest to highest price
		browseMatches.sort(function(a, b) {
			var priceA = a[5];
			var priceB = b[5];
			if (priceA - priceB < 0) {
				return -1;
			}

			if (priceA - priceB > 0) {
				return 1;
			}

			return 0;
		});

	} else if (selectedText == "Price Highest to Lowest") {
		// Sort by highest to lowest price
		browseMatches.sort(function(a, b) {
			var priceA = a[5];
			var priceB = b[5];
			if (priceA - priceB < 0) {
				return -1;
			}

			if (priceA - priceB > 0) {
				return 1;
			}

			return 0;
		});
		browseMatches.reverse();
	}

	// Get browseMatches results and set HTML
	var numberOfItems = 0;
	var currentContents = "";
	var itemsWithMaxNumber = [];
	for (var i = 0; i < browseMatches.length; i++) {
		// Add new row
		if (numberOfItems % 3 == 0) {
			currentContents += "<tr>";
		}

		// Set HTML for item
		var itemDisplayHTML0 = "<td>";
		var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + browseMatches[i][0] + "\">";
		var itemDisplayHTML2 = "<img src=\"../img/products/" + browseMatches[i][0] + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + browseMatches[i][0] + "'\">";
		var itemDisplayHTML3 = "</div>";
		var itemDisplayHTML4 = "<div class=\"itemInfo\">";
		var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + browseMatches[i][0] + "\" onclick=\"location.href='../product/index.html?item=" + browseMatches[i][0] + "'\">";
		var itemDisplayHTML6 = browseMatches[i][1];
		var itemDisplayHTML7 = "</div>";
		var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + browseMatches[i][0] + "\">";
		var itemDisplayHTML9 = browseMatches[i][4];
		var itemDisplayHTML10 = "</div>";
		var itemDisplayHTML11 = "</div>";
		var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + browseMatches[i][0] + "\">";
		var itemDisplayHTML13 = "$" + browseMatches[i][5];
		var itemDisplayHTML14 = "</div>";
		var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + browseMatches[i][0] + "\">";

		// Set cartArray if null
		if (cartArray == null) {
			cartArray = [];
		}

		// Use either add to cart button or quantity changer depending if item is in cart
		var alreadyInCart = false;
		var alreadyInCartQuantity = -1;
		for (var z = 0; z < cartArray.length; z++) {
			if (browseMatches[i][0] == cartArray[z][0]) {
				alreadyInCart = true;
				alreadyInCartQuantity = cartArray[z][2];
				break;
			}
		}

		if (alreadyInCart == true) {
			var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + browseMatches[i][0] + "\">";
			var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + browseMatches[i][0] + "\" onclick=\"quantityMinus(this)\">-</button>";
			var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + browseMatches[i][0] + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
			var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + browseMatches[i][0] + "\" onclick=\"quantityPlus(this)\">+</button>";
			var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + browseMatches[i][0] + "\">The maximum amount of this item you can purchase is 9999.</div>";
			var itemDisplayHTML21 = "</div>";
			var itemDisplayHTML22 = "</div>";
			var itemDisplayHTML23 = "</td>";

			// Add item to currentContents
			currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22 + itemDisplayHTML23;

			// Add to array if quantity is 9999
			if (parseInt(alreadyInCartQuantity) == 9999) {
				itemsWithMaxNumber.push(browseMatches[i][0]);
			}
		} else {
			var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + browseMatches[i][0] + "\">Add to Cart</button>";
			var itemDisplayHTML17 = "</div>";
			var itemDisplayHTML18 = "</td>";

			// Add item to currentContents
			currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17;
		}

		// Increase numberOfItems
		numberOfItems++;

		// End row
		if (numberOfItems % 3 == 0) {
			currentContents += "</tr>";
		}
	}

	// End row in case row was not ended
	if (numberOfItems % 3 != 0) {
		currentContents += "</tr>";
	}

	// Display error in case there's no items
	if (numberOfItems == 0) {
		document.getElementById("error").innerHTML = "Oops! Something went wrong! You're browsing for something that doesn't have any items. This specific " + browseType + " doesn't have any items!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Display contents
	document.getElementById("itemsTable").innerHTML = currentContents;

	for (var i = 0; i < itemsWithMaxNumber.length; i++) {
		// Display max number alert if quantity is 9999
		document.getElementById("max9999Alert_" + itemsWithMaxNumber[i]).style.display = "inherit";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).disabled = true;
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.backgroundColor = "#dee2e8";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.color = "#a2a7ad";
		document.getElementById("itemPrice_" + itemsWithMaxNumber[i]).style.bottom = "73px";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.cursor = "default";
	}
}