const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");

file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";
}

btn.onclick = function() {
    
    const { JSDOM } = require('jsdom');
    const data = file;
    const dom = new JSDOM(data);
    const { document } = dom.window;
    let array = [];


    for (let i = 0; document.querySelectorAll("#EdFornecedor")[i].textContent != '\nSCHERER S/A COMERCIO DE AUTOPECAS\n'; i++) {

        let obj = {
            "fornecedor": document.querySelectorAll("#EdFornecedor")[i].textContent.replace(/\n/g, ''),
            "nota": document.querySelectorAll("#EdNota")[i].textContent.replace(/\n/g, ''),
            "data": document.querySelectorAll("#EdData")[i].textContent.replace(/\n/g, ''),
            "volumes": document.querySelectorAll("#edVolumes")[i].textContent.replace(/\n/g, ''),
            "valor": document.querySelectorAll("#EdValor")[i].textContent.replace(/\n/g, '')
        }
        array.push(obj)
    }


    console.log("\nRelátório: \n ", array)

}




