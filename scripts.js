const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");

file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";
}

btn.onclick = function() {
    alert("Ainda sem solução...")
}




