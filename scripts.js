const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");

file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";
}

btn.onclick = function() {
    //alert("Ainda sem solução...")
    dowload();
}

function download(file, "out.xlsx", "application/vnd.ms-excel"){
    if(!contentType){
        contentType = 'application/octet-stream';
    }
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}




