var alreadyChosen = [];

function populateCategoryDropdown() {
	// Get inventory
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));

	var dropdownContent = document.getElementById("categoryDropdown").innerHTML;
	var categoryArray = [];
	var itemLink = "";
	var itemName = "";

	// Get different categories
	for (var i = 0; i < itemArray.length; i++) {
		if (categoryArray.indexOf(itemArray[i][2]) == -1) {
			categoryArray.push(itemArray[i][2]);
		}
	}

	// Sort array alphabetically
	categoryArray.sort();
	for (var i = 0; i < categoryArray.length; i++) {
		itemName = categoryArray[i];
		itemLink = "../browse/index.html?category=" + itemName;
		dropdownContent += "<a href=\"" + itemLink + "\">" + itemName + "</a>";
	}

	// Add categories to dropdown div
	document.getElementById("categoryDropdown").innerHTML = dropdownContent;
}

function populateManufacturerDropdown() {
	// Get inventory
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));

	var dropdownContent = document.getElementById("manufacturerDropdown").innerHTML;
	var manufacturerArray = [];
	var itemLink = "";
	var itemName = "";

	// Get different manufacturers
	for (var i = 0; i < itemArray.length; i++) {
		if (manufacturerArray.indexOf(itemArray[i][3]) == -1) {
			manufacturerArray.push(itemArray[i][3]);
		}
	}

	// Sort array alphabetically
	manufacturerArray.sort();
	for (var i = 0; i < manufacturerArray.length; i++) {
		itemName = manufacturerArray[i];
		itemLink = "../browse/index.html?manufacturer=" + itemName;
		dropdownContent += "<a href=\"" + itemLink + "\">" + itemName + "</a>";
	}

	// Add manufacturers to dropdown div
	document.getElementById("manufacturerDropdown").innerHTML = dropdownContent;
}

function populateFeaturedItems() {
	// Get inventory and inventory
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	var upperBound = itemArray.length - 1;
	var lowerBound = 0;
	var randomItem = -1;

	// Get 3 unique items
	for (var i = 1; i <= 3; i++) {
		while (true) {
			var doContinue = false;

			// Get random item number
			randomItem = Math.round(Math.random()*(upperBound - lowerBound) + lowerBound);

			if (i == 1) {
				// If first item, break while loop and add to alreadyChosen array
				alreadyChosen.push(randomItem);
				break;
			} else {
				// If not first item, make sure not duplicate
				for (var x = 0; x < alreadyChosen.length; x++) {
					if (randomItem == alreadyChosen[x]) {
						doContinue = true;
						break;
					} else {
						doContinue = false;
					}
				}

				if (doContinue == true) {
					continue;
				} else {
					alreadyChosen.push(randomItem);
					break;
				}
			}
		}

		var itemIndex = itemArray[randomItem][0];

		// HTML for random item in featured items table
		var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + itemIndex + "\">";
		var itemDisplayHTML2 = "<img src=\"../img/products/" + itemIndex + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + itemIndex + "'\">";
		var itemDisplayHTML3 = "</div>";
		var itemDisplayHTML4 = "<div class=\"itemInfo\">";
		var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + itemIndex + "\" onclick=\"location.href='../product/index.html?item=" + itemIndex + "'\">";
		var itemDisplayHTML6 = itemArray[randomItem][1];
		var itemDisplayHTML7 = "</div>";
		var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + itemIndex + "\">";
		var itemDisplayHTML9 = itemArray[randomItem][4];
		var itemDisplayHTML10 = "</div>";
		var itemDisplayHTML11 = "</div>";
		var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + itemIndex + "\">";
		var itemDisplayHTML13 = "$" + itemArray[randomItem][5];
		var itemDisplayHTML14 = "</div>";
		var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + itemIndex + "\">";

		// Use either add to cart button or quantity changer depending if item is in cart
		var alreadyInCart = false;
		var alreadyInCartQuantity = -1;
		if (cartArray == null || cartArray.length == 0) {
			alreadyInCart = false;
		} else {
			for (var y = 0; y < cartArray.length; y++) {
				if (itemIndex == cartArray[y][0]) {
					alreadyInCart = true;
					alreadyInCartQuantity = cartArray[y][2];
					break;
				}
			}
		}

		if (alreadyInCart == true) {
			var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + itemIndex + "\">";
			var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + itemIndex + "\" onclick=\"quantityMinus(this)\">-</button>";
			var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + itemIndex + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
			var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + itemIndex + "\" onclick=\"quantityPlus(this)\">+</button>";
			var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + itemIndex + "\">The maximum amount of this item you can purchase is 9999.</div>";
			var itemDisplayHTML21 = "</div>";
			var itemDisplayHTML22 = "</div>";

			// Add item to table
			document.getElementById("featuredItem_" + i.toString()).innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22;

			// Display max number alert if quantity is 9999
			if (parseInt(alreadyInCartQuantity) == 9999) {
				document.getElementById("max9999Alert_" + itemIndex).style.display = "inherit";
				document.getElementById("incQuan_" + itemIndex).disabled = true;
				document.getElementById("incQuan_" + itemIndex).style.backgroundColor = "#dee2e8";
				document.getElementById("incQuan_" + itemIndex).style.color = "#a2a7ad";
				document.getElementById("itemPrice_" + itemIndex).style.bottom = "73px";
				document.getElementById("incQuan_" + itemIndex).style.cursor = "default";
			}
		} else {
			var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + itemIndex + "\">Add to Cart</button>";
			var itemDisplayHTML17 = "</div>";

			// Add item to table
			document.getElementById("featuredItem_" + i.toString()).innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17;
		}
	}
}

function populateFreshlyBaked() {
	// Get inventory and cart
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	var upperBound = itemArray.length - 1;
	var lowerBound = 0;

	// Get 3 unique items
	for (var i = 1; i <= 3; i++) {
		while (true) {
			var doContinue = false;

			// Get random item number
			var randomItem = Math.round(Math.random()*(upperBound - lowerBound) + lowerBound);

			// Make sure is bakery item
			if (itemArray[randomItem][3] == "J3 Bakery") {
				// Make sure not duplicate
				for (var x = 0; x < alreadyChosen.length; x++) {
					if (randomItem == alreadyChosen[x]) {
						doContinue = true;
						break;
					} else {
						doContinue = false;
					}
				}

				if (doContinue == true) {
					continue;
				} else {
					alreadyChosen.push(randomItem);
					break;
				}
			} else {
				continue;
			}
		}

		var itemIndex = itemArray[randomItem][0];

		// HTML for random item in featured items table
		var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + itemIndex + "\">";
		var itemDisplayHTML2 = "<img src=\"../img/products/" + itemIndex + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + itemIndex + "'\">";
		var itemDisplayHTML3 = "</div>";
		var itemDisplayHTML4 = "<div class=\"itemInfo\">";
		var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + itemIndex + "\" onclick=\"location.href='../product/index.html?item=" + itemIndex + "'\">";
		var itemDisplayHTML6 = itemArray[randomItem][1];
		var itemDisplayHTML7 = "</div>";
		var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + itemIndex + "\">";
		var itemDisplayHTML9 = itemArray[randomItem][4];
		var itemDisplayHTML10 = "</div>";
		var itemDisplayHTML11 = "</div>";
		var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + itemIndex + "\">";
		var itemDisplayHTML13 = "$" + itemArray[randomItem][5];
		var itemDisplayHTML14 = "</div>";
		var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + itemIndex + "\">";

		// Use either add to cart button or quantity changer depending if item is in cart
		var alreadyInCart = false;
		var alreadyInCartQuantity = -1;
		if (cartArray == null || cartArray.length == 0) {
			alreadyInCart = false;
		} else {
			for (var y = 0; y < cartArray.length; y++) {
				if (itemIndex == cartArray[y][0]) {
					alreadyInCart = true;
					alreadyInCartQuantity = cartArray[y][2];
					break;
				}
			}
		}

		if (alreadyInCart == true) {
			var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + itemIndex + "\">";
			var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + itemIndex + "\" onclick=\"quantityMinus(this)\">-</button>";
			var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + itemIndex + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
			var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + itemIndex + "\" onclick=\"quantityPlus(this)\">+</button>";
			var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + itemIndex + "\">The maximum amount of this item you can purchase is 9999.</div>";
			var itemDisplayHTML21 = "</div>";
			var itemDisplayHTML22 = "</div>";

			// Add item to table
			document.getElementById("freshlyBakedItem_" + i.toString()).innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22;

			// Display max number alert if quantity is 9999
			if (parseInt(alreadyInCartQuantity) == 9999) {
				document.getElementById("max9999Alert_" + itemIndex).style.display = "inherit";
				document.getElementById("incQuan_" + itemIndex).disabled = true;
				document.getElementById("incQuan_" + itemIndex).style.backgroundColor = "#dee2e8";
				document.getElementById("incQuan_" + itemIndex).style.color = "#a2a7ad";
				document.getElementById("itemPrice_" + itemIndex).style.bottom = "73px";
				document.getElementById("incQuan_" + itemIndex).style.cursor = "default";
			}
		} else {
			var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + itemIndex + "\">Add to Cart</button>";
			var itemDisplayHTML17 = "</div>";

			// Add item to table
			document.getElementById("freshlyBakedItem_" + i.toString()).innerHTML = itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17;
		}
	}
}


function populateAll() {
	populateCategoryDropdown();
	populateManufacturerDropdown();
	populateFeaturedItems();
	populateFreshlyBaked();
}

function populateBrowseDropdowns() {
	populateCategoryDropdown();
	populateManufacturerDropdown();
}