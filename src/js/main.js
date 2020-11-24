function copyText() {
    var copyText = document.getElementById("copiedCode");

    copyText.select();

    document.execCommand("copy");
}