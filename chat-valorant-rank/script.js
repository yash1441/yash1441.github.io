const nameTagInput = document.getElementById('nameTag');
const regionSelect = document.getElementById('region');
const hideUsernameCheckbox = document.getElementById('hideUsername');
const showRRChangeCheckbox = document.getElementById('showRRChange');
const platformSelect = document.getElementById('platform');
const generateButton = document.getElementById('generateButton');
const generatedUrl = document.getElementById('generatedUrl');
const copyIcon = document.getElementById('copyIcon');
const exampleResponse = document.getElementById('exampleResponse');

copyIcon.style.display = "none";

generateButton.addEventListener("click", function () {
    if (!nameTagInput.value.includes("#")) return alert("Please enter a valid username in the format Name#Tag");

    const queryData = {
        username: nameTagInput,
        name: nameTagInput.value.split("#")[0],
        tag: nameTagInput.value.split("#")[1],
        region: regionSelect.value,
        onlyRank: hideUsernameCheckbox.checked,
        mmrChange: showRRChangeCheckbox.checked
    };

    const fixedName = encodeURIComponent(queryData.name.replace(' ', ''));
    const fixedTag = encodeURIComponent(queryData.tag);

    let url = "https://splendid-groovy-feverfew.glitch.me/valorant";
    url += "/" + queryData.region;
    url += "/" + fixedName + "/" + fixedTag;

    if (queryData.onlyRank && queryData.mmrChange) url += "?onlyRank=true&mmrChange=true";
    else if (queryData.onlyRank) url += "?onlyRank=true";
    else if (queryData.mmrChange) url += "?mmrChange=true";

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

    copyIcon.style.display = "inline-block";

    exampleResponse.textContent = "Generating response...";
    setExample(queryData);
});

copyIcon.addEventListener('click', function () {
    if (generatedUrl.length <= 0) return;
    navigator.clipboard.writeText(generatedUrl.textContent);
});

function setExample(queryData) {
    fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/${regionSelect.value}/${name}/${tag}?api_key=${process.env.BASE_KEY}`)
        .then(response => response.json())
        .then(data => {
            let buffer = '';
            if (!data.onlyRank) {
                buffer += queryData.username;
                buffer += " [" + data.data.currenttier + "]";
            }
            else buffer += data.data.currenttierpatched;
            if (queryData.mmrChange) buffer += " [" + data.data.mmr_change_to_last_game + "]";
            exampleResponse.textContent = buffer;
        })
}