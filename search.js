var searchMatches = [];
var originalSearchMatches;

function searchItems() {
	// Get inventory and cart
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));
	var cartArray = JSON.parse(localStorage.getItem("cart"));

	// Get search details
	var fullSearch = window.location.search;
	var searchTerm = unescape(fullSearch.substring(fullSearch.indexOf("=") + 1));

	// Check if search term only contains spaces
	if (searchTerm.match(/^[+]+$/g) != null) {
		document.getElementById("numberOfResults").innerHTML = "Oops! Something went wrong!";
		document.getElementById("error").innerHTML = "Your search term only contains spaces! Where the letters at?";
		throw new Error("Oopsies. An error was thrown.");
	}

	searchTerm = searchTerm.replace(/\+/g, " ");

	// Check if search term exists
	if (fullSearch == "") {
		document.getElementById("numberOfResults").innerHTML = "Oops! Something went wrong!";
		document.getElementById("error").innerHTML = "You haven't entered a search term!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Check if there's no =
	if (fullSearch.indexOf("=") == -1) {
		document.getElementById("numberOfResults").innerHTML = "Oops! Something went wrong!";
		document.getElementById("error").innerHTML = "You haven't entered a search term!";
		throw new Error("Oopsies. An error was thrown.");
	}

	// Check if it's not ?query
	if (fullSearch.substring(0, fullSearch.indexOf("=")) != "?query") {
		document.getElementById("numberOfResults").innerHTML = "Oops! Something went wrong!";
		document.getElementById("error").innerHTML = "That isn't a query!";
		throw new Error("Oopsies. An error was thrown.");
	}

	//var searchMatches = [];
	var numberOfItems = 0;
	var currentContents = "";

	if (searchTerm == "") {
		document.getElementById("numberOfResults").innerHTML = "Oops! Something went wrong!";
		document.getElementById("error").innerHTML = "You haven't entered a search term!";
		throw new Error("Oopsies. An error was thrown.");
	} else {
		// Split search terms by word for match with each word of search term algorithms
		var spaceSplitSearch = searchTerm.split(" ");

		while (true) {
			var blankTerm = false;
			var lastTerm = false;
			for (var i = 0; i < spaceSplitSearch.length; i++) {
				if (spaceSplitSearch[i] == "") {
					blankTerm = true;
					break;
				}

				if (i == spaceSplitSearch.length - 1) {
					lastTerm = true;
				}
			}

			if (blankTerm == true) {
				spaceSplitSearch.splice(i, 1);
			}
			
			if (lastTerm == true) {
				break;
			}
		}

		// Search by product ID
		for (var i = 0; i < itemArray.length; i++) {
			if (itemArray[i][0].toUpperCase() == searchTerm.toUpperCase()) {
				searchMatches.push(itemArray[i]);
			}
		}

		// Search by name (match with full search term)
		for (var i = 0; i < itemArray.length; i++) {
			var alreadyMatched = false;
			if (itemArray[i][1].toUpperCase().includes(searchTerm.toUpperCase())) {
				for (var x = 0; x < searchMatches.length; x++) {
					if (searchMatches[x][0] == itemArray[i][0]) {
						alreadyMatched = true;
						break;
					} else {
						continue;
					}
				}

				if (alreadyMatched == false) {
					searchMatches.push(itemArray[i]);
				}
			}
		}

		// Search by name (match with each word of search term)
		for (var y = 0; y < spaceSplitSearch.length; y++) {
			for (var i = 0; i < itemArray.length; i++) {
				var alreadyMatched = false;
				if (itemArray[i][1].toUpperCase().includes(spaceSplitSearch[y].toUpperCase())) {
					for (var x = 0; x < searchMatches.length; x++) {
						if (searchMatches[x][0] == itemArray[i][0]) {
							alreadyMatched = true;
							break;
						} else {
							continue;
						}
					}

					if (alreadyMatched == false) {
						searchMatches.push(itemArray[i]);
					}
				}
			}

		// Search by company
		for (var i = 0; i < itemArray.length; i++) {
			var alreadyMatched = false;
			if (itemArray[i][3].toUpperCase().includes(searchTerm.toUpperCase())) {
				for (var x = 0; x < searchMatches.length; x++) {
					if (searchMatches[x][0] == itemArray[i][0]) {
						alreadyMatched = true;
						break;
					} else {
						continue;
					}
				}

				if (alreadyMatched == false) {
					searchMatches.push(itemArray[i]);
				}
			}
		}
	}

		// Search by description
		for (var i = 0; i < itemArray.length; i++) {
			var alreadyMatched = false;
			if (itemArray[i][4].toUpperCase().includes(searchTerm.toUpperCase())) {
				for (var x = 0; x < searchMatches.length; x++) {
					if (searchMatches[x][0] == itemArray[i][0]) {
						alreadyMatched = true;
						break;
					} else {
						continue;
					}
				}

				if (alreadyMatched == false) {
					searchMatches.push(itemArray[i]);
				}
			}
		}

		// Search by description (match with each word of search term)
		for (var y = 0; y < spaceSplitSearch.length; y++) {
			for (var i = 0; i < itemArray.length; i++) {
				var alreadyMatched = false;
				if (itemArray[i][4].toUpperCase().includes(spaceSplitSearch[y].toUpperCase())) {
					for (var x = 0; x < searchMatches.length; x++) {
						if (searchMatches[x][0] == itemArray[i][0]) {
							alreadyMatched = true;
							break;
						} else {
							continue;
						}
					}

					if (alreadyMatched == false) {
						searchMatches.push(itemArray[i]);
					}
				}
			}
		}
	}

	// Developer pass-through to see all items
	if (searchTerm.toUpperCase() == "SHOW ME EVERYTHING") {
		searchMatches = [];
		for (var g = 0; g < itemArray.length; g++) {
			searchMatches.push(itemArray[g]);
		}
	}

	// Get searchMatches results and set HTML
	var itemsWithMaxNumber = [];
	for (var i = 0; i < searchMatches.length; i++) {
		// Add new row
		if (numberOfItems % 3 == 0) {
			currentContents += "<tr>";
		}

		// Set HTML for item
		var itemDisplayHTML0 = "<td>";
		var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML2 = "<img src=\"../img/products/" + searchMatches[i][0] + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + searchMatches[i][0] + "'\">";
		var itemDisplayHTML3 = "</div>";
		var itemDisplayHTML4 = "<div class=\"itemInfo\">";
		var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + searchMatches[i][0] + "\" onclick=\"location.href='../product/index.html?item=" + searchMatches[i][0] + "'\">";
		var itemDisplayHTML6 = searchMatches[i][1];
		var itemDisplayHTML7 = "</div>";
		var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML9 = searchMatches[i][4];
		var itemDisplayHTML10 = "</div>";
		var itemDisplayHTML11 = "</div>";
		var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML13 = "$" + searchMatches[i][5];
		var itemDisplayHTML14 = "</div>";
		var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + searchMatches[i][0] + "\">";

		// Set cartArray if null
		if (cartArray == null) {
			cartArray = [];
		}

		// Use either add to cart button or quantity changer depending if item is in cart
		var alreadyInCart = false;
		var alreadyInCartQuantity = -1;
		for (var z = 0; z < cartArray.length; z++) {
			if (searchMatches[i][0] == cartArray[z][0]) {
				alreadyInCart = true;
				alreadyInCartQuantity = cartArray[z][2];
				break;
			}
		}

		if (alreadyInCart == true) {
			var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + searchMatches[i][0] + "\">";
			var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + searchMatches[i][0] + "\" onclick=\"quantityMinus(this)\">-</button>";
			var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + searchMatches[i][0] + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
			var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + searchMatches[i][0] + "\" onclick=\"quantityPlus(this)\">+</button>";
			var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + searchMatches[i][0] + "\">The maximum amount of this item you can purchase is 9999.</div>";
			var itemDisplayHTML21 = "</div>";
			var itemDisplayHTML22 = "</div>";
			var itemDisplayHTML23 = "</td>";

			// Add item to currentContents
			currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22 + itemDisplayHTML23;

			// Add to array if quantity is 9999
			if (parseInt(alreadyInCartQuantity) == 9999) {
				itemsWithMaxNumber.push(searchMatches[i][0]);
			}
		} else {
			var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + searchMatches[i][0] + "\">Add to Cart</button>";
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

	// Display number of results and results
	document.getElementById("numberOfResults").innerHTML = numberOfItems.toString() + " results found for \"" + searchTerm + "\"";
	document.getElementById("itemsTable").innerHTML = currentContents;
	
	if (numberOfItems == 0) {
		document.getElementById("items").innerHTML = "<div class=\"noResults\"><div class=\"noResultsLine1\">Is that a vegetable we've never heard of?</div><div class=\"noResultsLine2\">Our search monkeys couldn't find any results!</div></div>";
	}
	
	for (var i = 0; i < itemsWithMaxNumber.length; i++) {
		// Display max number alert if quantity is 9999
		document.getElementById("max9999Alert_" + itemsWithMaxNumber[i]).style.display = "inherit";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).disabled = true;
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.backgroundColor = "#dee2e8";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.color = "#a2a7ad";
		document.getElementById("itemPrice_" + itemsWithMaxNumber[i]).style.bottom = "73px";
		document.getElementById("incQuan_" + itemsWithMaxNumber[i]).style.cursor = "default";
	}

	// Set originalSearchMatches to searchMatches
	originalSearchMatches = JSON.parse(JSON.stringify(searchMatches));
}

function itemSortBy() {
	var sortSelect = document.getElementById("sortBy");
	var selectedText = sortSelect.options[sortSelect.selectedIndex].text;

	if (selectedText == "Relevance") {
		// Sort by relevance, make searchMatches equal originalSearchMatches
		searchMatches = JSON.parse(JSON.stringify(originalSearchMatches));
	} else if (selectedText == "Alphabetical A-Z") {
		// Sort by alphabetical A-Z
		searchMatches.sort(function(a, b) {
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
		searchMatches.sort(function(a, b) {
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
		searchMatches.reverse();
	} else if (selectedText == "Price Lowest to Highest") {
		// Sort by lowest to highest price
		searchMatches.sort(function(a, b) {
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
		searchMatches.sort(function(a, b) {
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
		searchMatches.reverse();
	}

	// Get searchMatches results and set HTML
	var numberOfItems = 0;
	var currentContents = "";
	var itemsWithMaxNumber = [];
	for (var i = 0; i < searchMatches.length; i++) {
		// Add new row
		if (numberOfItems % 3 == 0) {
			currentContents += "<tr>";
		}

		// Set HTML for item
		var itemDisplayHTML0 = "<td>";
		var itemDisplayHTML1 = "<div class=\"itemPictureDiv\" id=\"itemPicture_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML2 = "<img src=\"../img/products/" + searchMatches[i][0] + ".png\" alt=\"Item Picture\" class=\"itemPicture\" onclick=\"location.href='../product/index.html?item=" + searchMatches[i][0] + "'\">";
		var itemDisplayHTML3 = "</div>";
		var itemDisplayHTML4 = "<div class=\"itemInfo\">";
		var itemDisplayHTML5 = "<div class=\"itemName\" id=\"itemName_" + searchMatches[i][0] + "\" onclick=\"location.href='../product/index.html?item=" + searchMatches[i][0] + "'\">";
		var itemDisplayHTML6 = searchMatches[i][1];
		var itemDisplayHTML7 = "</div>";
		var itemDisplayHTML8 = "<div class=\"itemDescription\" id=\"itemDescription_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML9 = searchMatches[i][4];
		var itemDisplayHTML10 = "</div>";
		var itemDisplayHTML11 = "</div>";
		var itemDisplayHTML12 = "<div class=\"itemPrice\" id=\"itemPrice_" + searchMatches[i][0] + "\">";
		var itemDisplayHTML13 = "$" + searchMatches[i][5];
		var itemDisplayHTML14 = "</div>";
		var itemDisplayHTML15 = "<div class=\"itemCartManage\" id=\"itemCartManage_" + searchMatches[i][0] + "\">";

		// Set cartArray if null
		if (cartArray == null) {
			cartArray = [];
		}

		// Use either add to cart button or quantity changer depending if item is in cart
		var alreadyInCart = false;
		var alreadyInCartQuantity = -1;
		for (var z = 0; z < cartArray.length; z++) {
			if (searchMatches[i][0] == cartArray[z][0]) {
				alreadyInCart = true;
				alreadyInCartQuantity = cartArray[z][2];
				break;
			}
		}

		if (alreadyInCart == true) {
			var itemDisplayHTML16 = "<div class=\"quantityChanger\" id=\"quantityChanger_" + searchMatches[i][0] + "\">";
			var itemDisplayHTML17 = "<button class=\"quantityMinusButton\" id=\"decQuan_" + searchMatches[i][0] + "\" onclick=\"quantityMinus(this)\">-</button>";
			var itemDisplayHTML18 = "<input type=\"text\" autocomplete=\"off\" id=\"quan_" + searchMatches[i][0] + "\" class=\"quantityField\" value=\"" + alreadyInCartQuantity + "\" onfocus=\"storeCurrentQuantity(this);\" onblur=\"checkQuantityValid(this);\">";
			var itemDisplayHTML19 = "<button class=\"quantityPlusButton\" id=\"incQuan_" + searchMatches[i][0] + "\" onclick=\"quantityPlus(this)\">+</button>";
			var itemDisplayHTML20 = "<div class=\"max9999Alert\" id=\"max9999Alert_" + searchMatches[i][0] + "\">The maximum amount of this item you can purchase is 9999.</div>";
			var itemDisplayHTML21 = "</div>";
			var itemDisplayHTML22 = "</div>";
			var itemDisplayHTML23 = "</td>";

			// Add item to currentContents
			currentContents += itemDisplayHTML0 + itemDisplayHTML1 + itemDisplayHTML2 + itemDisplayHTML3 + itemDisplayHTML4 + itemDisplayHTML5 + itemDisplayHTML6 + itemDisplayHTML7 + itemDisplayHTML8 + itemDisplayHTML9 + itemDisplayHTML10 + itemDisplayHTML11 + itemDisplayHTML12 + itemDisplayHTML13 + itemDisplayHTML14 + itemDisplayHTML15 + itemDisplayHTML16 + itemDisplayHTML17 + itemDisplayHTML18 + itemDisplayHTML19 + itemDisplayHTML20 + itemDisplayHTML21 + itemDisplayHTML22 + itemDisplayHTML23;

			// Add to array if quantity is 9999
			if (parseInt(alreadyInCartQuantity) == 9999) {
				itemsWithMaxNumber.push(searchMatches[i][0]);
			}
		} else {
			var itemDisplayHTML16 = "<button onclick=\"addToCart(this)\"  class=\"addToCartButton\" id=\"addToCartButton_" + searchMatches[i][0] + "\">Add to Cart</button>";
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

	// Display new results
	document.getElementById("itemsTable").innerHTML = currentContents;
	
	if (numberOfItems == 0) {
		document.getElementById("items").innerHTML = "<div class=\"noResults\"><div class=\"noResultsLine1\">Is that a vegetable we've never heard of?</div><div class=\"noResultsLine2\">Our search monkeys couldn't find any results!</div></div>";
	}
	
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