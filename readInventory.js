var itemArray = [];

function readInventoryFile() {
	var fileContents;

	// Get inventory file contents using XMLHttpRequest
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "../inventory.txt", false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState == 4) {
			if (rawFile.status == 200 || rawFile.status == 0) {
				fileContents = rawFile.responseText;
			}
		}
	};
	rawFile.send(null);

	// Split into lines
	var fileLines = fileContents.split("\n");

	// Remove comment lines and empty lines
	while (true) {
		var doContinue = false;

		for (var i = 0; i < fileLines.length; i++) {
			// Remove lines that start with "//" (comments)
			if (fileLines[i].charAt(0) == "/" && fileLines[i].charAt(1) == "/") {
				fileLines.splice(i, 1);
				doContinue = true;
				break;
			}

			// Remove lines that are empty
			if (fileLines[i] < " ") {
				fileLines.splice(i, 1);
				doContinue = true;
				break;
			}
		}

		// Restart check if invalid line has been found and removed
		if (doContinue == true) {
			continue;
		} else {
			break;
		}
	}

	// Store elements into itemArray
	for (var i = 0; i < fileLines.length; i++) {
		itemArray[i] = fileLines[i].split(",");
	}

	// Store array in session storage
	sessionStorage.setItem("inventory", JSON.stringify(itemArray));
}

function checkInventoryLoaded() {
	// Check if inventory array is currently stored in session storage
	var data = sessionStorage.getItem("inventory");
	var itemArray = JSON.parse(sessionStorage.getItem("inventory"));

	if (data == null) {
		// Set inventory if inventory has not already been set
		readInventoryFile();
	} else {
		console.log("The inventory array is already populated. It won't get populated again.");
	}
}
















