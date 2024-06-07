const nameTagInput = document.getElementById('nameTag');
const regionSelect = document.getElementById('region');
const hideUsernameCheckbox = document.getElementById('hideUsername');
const showRRChangeCheckbox = document.getElementById('showRRChange');
const uniqueColorCheckbox = document.getElementById('uniqueColor');
const platformSelect = document.getElementById('platform');
const generateButton = document.getElementById('generateButton');
const generatedUrl = document.getElementById('generatedUrl');
const copyIcon = document.getElementById('copyIcon');
const exampleResponse = document.getElementById('exampleResponse');

generatedUrl.style.display = "none";
copyIcon.style.display = "none";
exampleResponse.style.display = "none";

generateButton.addEventListener("click", function () {
    if (!nameTagInput.value.includes("#")) return alert("Please enter a valid username in the format Name#Tag");

    const data = {
        username: nameTagInput.value,
        name: nameTagInput.value.split("#")[0],
        tag: nameTagInput.value.split("#")[1],
        region: regionSelect.value,
        onlyRank: hideUsernameCheckbox.checked,
        mmrChange: showRRChangeCheckbox.checked,
        uniqueColor: uniqueColorCheckbox.checked,
    };

    const fixedName = encodeURIComponent(data.name.replace(' ', ''));
    const fixedTag = encodeURIComponent(data.tag);

    let url = "https://splendid-groovy-feverfew.glitch.me/valorant";
    url += "/" + data.region;
    url += "/" + fixedName + "/" + fixedTag;

    if (data.onlyRank && data.mmrChange) url += "?onlyRank=true&mmrChange=true";
    else if (data.onlyRank) url += "?onlyRank=true";
    else if (data.mmrChange) url += "?mmrChange=true";

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
        case "streamlabs":
            generatedUrl.textContent = "{readapi." + url + "}";
            break;
        default:
            generatedUrl.textContent = url;
    }

    if (data.uniqueColor) generatedUrl.textContent = "/me " + generatedUrl.textContent;

    generatedUrl.style.display = "block";
    copyIcon.style.display = "inline-block";
    exampleResponse.style.display = "block";

    setExample(data);
});

copyIcon.addEventListener('click', function () {
    if (generatedUrl.length <= 0) return;
    navigator.clipboard.writeText(generatedUrl.textContent);
});

function setExample(data) {
    let buffer = '';
    if (!data.onlyRank) {
        buffer += data.username;
        buffer += " [Immortal 2] : 120 RR";
    }
    else buffer += "Immortal 2 : 120 RR";
    if (data.mmrChange) buffer += " [-22]";
    exampleResponse.textContent = buffer;
}