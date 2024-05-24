const nameTagInput = document.getElementById('nameTag');
const regionSelect = document.getElementById('region');
const hideUsernameCheckbox = document.getElementById('hideUsername');
const showRRChangeCheckbox = document.getElementById('showRRChange');
const platformSelect = document.getElementById('platform');
const generateButton = document.getElementById('generateButton');
const generatedUrl = document.getElementById('generatedUrl');
// const exampleResponse = document.getElementById('exampleResponse');

generateButton.addEventListener('click', function () {
    let url = "https://splendid-groovy-feverfew.glitch.me/valorant";
    url += "/" + regionSelect.value;

    if (!nameTagInput.value.includes("#")) return alert("Please enter a valid username in the format Name#Tag");

    const name = encodeURIComponent(nameTagInput.value.split("#")[0].replace(' ', ''));
    const tag = encodeURIComponent(nameTagInput.value.split("#")[1]);

    url += "/" + name + "/" + tag;

    if (hideUsernameCheckbox.checked && showRRChangeCheckbox.checked) url += "?onlyRank=true&mmrChange=true";
    else if (hideUsernameCheckbox.checked) url += "?onlyRank=true";
    else if (showRRChangeCheckbox.checked) url += "?mmrChange=true";

    switch (platformSelect.value) {
        case "streamelements":
            generatedUrl.textContent = "$(customapi." + url + ")";
            break;
        case "nightbot":
            generatedUrl.textContent = "$(customapi " + url + ")";
            break;
        case "fossabot":
            generatedUrl.textContent = "$(customapi " + url + ")";
            break;
        default:
            generatedUrl.textContent = url;
    }
});