const msg = document.getElementById("msg");
const file = document.getElementById("fileUploaded");

file.onchange = function() {
            msg.innerHTML = "Arquivo enviado.";
}