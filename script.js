function myFunction() {
	var x = document.getElementById("wingman");
	if (x.style.display === "none") {
		x.style.display = "flex";
	} else {
		x.style.display = "none";
	}
}

const Indicator = document.getElementById("Indicator");
const mainmenuAudio = document.getElementById("mainmenu");
const submenuhoverAudio = document.getElementById("submenuhover");
const submenusubhoverAudio = document.getElementById("submenusubhover");
const submenusubselectAudio = document.getElementById("submenusubselect");
const rightNavbar = document.getElementById("right-navbar");
const rightSubmenuOption1 = document.getElementById("submenu-option1");
const rightSubmenuOption2 = document.getElementById("submenu-option2");
const rightSubmenuOption3 = document.getElementById("submenu-option3");
const rightSubmenuOption4 = document.getElementById("submenu-option4");
const muteButton = document.getElementById("mute-button");

function toggleUser() {
	Indicator.style.transform = "translateX(8px)";
	var friends = document.getElementById("friends");
	var groups = document.getElementById("groups");
	var contacts = document.getElementById("contacts");
	friends.style.display = "block";
	groups.style.display = "none";
	contacts.style.display = "none";
	submenusubselectAudio.play();
}
function toggleUsers() {
	Indicator.style.transform = "translateX(66px)";
	var friends = document.getElementById("friends");
	var groups = document.getElementById("groups");
	var contacts = document.getElementById("contacts");
	groups.style.display = "block";
	friends.style.display = "none";
	contacts.style.display = "none";
	submenusubselectAudio.play();
}
function toggleHistory() {
	Indicator.style.transform = "translateX(128px)";
	var friends = document.getElementById("friends");
	var groups = document.getElementById("groups");
	var contacts = document.getElementById("contacts");
	groups.style.display = "none";
	friends.style.display = "none";
	contacts.style.display = "none";
	submenusubselectAudio.play();
}
function toggleEnv() {
	Indicator.style.transform = "translateX(185px)";
	var friends = document.getElementById("friends");
	var groups = document.getElementById("groups");
	var contacts = document.getElementById("contacts");
	groups.style.display = "none";
	friends.style.display = "none";
	contacts.style.display = "block";
	submenusubselectAudio.play();
}

//market toggle

const Indicator2 = document.getElementById("Indicator2");

function togglecoupons() {
	Indicator2.style.transform = "translateX(20px)";
}
function toggleshop() {
	Indicator2.style.transform = "translateX(95px)";
}
function togglekeys() {
	Indicator2.style.transform = "translateX(150px)";
}
function togglemarket() {
	Indicator2.style.transform = "translateX(215px)";
}

//play csgo tab

function playTab(evt, tabname) {
	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabname).style.display = "block";
	evt.currentTarget.className += " active";
}

muteButton.addEventListener("click", function () {
	if (mainmenuAudio.muted) {
		mainmenuAudio.muted = false;
		mainmenuAudio.volume = 0.1;
		mainmenuAudio.play();
		muteButton.classList.remove("fa-volume-mute");
		muteButton.classList.add("fa-volume-up");
	} else {
		mainmenuAudio.muted = true;
		muteButton.classList.remove("fa-volume-up");
		muteButton.classList.add("fa-volume-mute");
	}
});

rightNavbar.addEventListener("mouseenter", () => {
	submenuhoverAudio.play();
});

rightSubmenuOption1.addEventListener("mouseenter", () => {
	submenusubhoverAudio.play();
});
rightSubmenuOption2.addEventListener("mouseenter", () => {
	submenusubhoverAudio.play();
});
rightSubmenuOption3.addEventListener("mouseenter", () => {
	submenusubhoverAudio.play();
});
rightSubmenuOption4.addEventListener("mouseenter", () => {
	submenusubhoverAudio.play();
});
