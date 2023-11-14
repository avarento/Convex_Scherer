const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");

file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";
}

btn.onclick = function() {
    let data = file.files[0];
    let blob = new Blob([data], { type: "application/vnd.ms-excel" });
    const link= window.document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download =  "convex_" + file.files[0].name;
    link.click();
    window.URL.revokeObjectURL(link.href);
}






