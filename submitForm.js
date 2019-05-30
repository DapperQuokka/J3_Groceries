function submitForm() {
	var SUCCESS_HTML_1 = "<p class=\"submitSuccess\">Your form has been submitted (not really though).</p>";
	var SUCCESS_HTML_2 = "<div class=\"backToHomeDiv\">";
	var SUCCESS_HTML_3 = "<button class=\"backToHomeButton\" onclick=\"location.href='../store/index.html'\">Back To Home</button>";
	var SUCCESS_HTML_4 = "</div>";
	document.getElementById("form").innerHTML = SUCCESS_HTML_1 + SUCCESS_HTML_2 + SUCCESS_HTML_3 + SUCCESS_HTML_4;
}