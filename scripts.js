const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");
let html;
let elementDOM;
let namefile;


file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";
    const data = file.files[0];
    let reader = new FileReader();  
    reader.onload = function (e) {
        html = e.target.result;
    }
    reader.readAsText(data)
}


btn.onclick = function() {    
    function creatDOM(htmlString) {
        let parse = new DOMParser();
        let DOM = parse.parseFromString(htmlString, 'text/html');
        namefile = DOM.querySelector("#EdPeriodo").innerText.slice(9,19);
        let array = [];
        for (let i = 0; DOM.querySelectorAll("#EdFornecedor")[i].textContent != '\nSCHERER S/A COMERCIO DE AUTOPECAS\n'; i++) {
            let obj = {
                //esqueci de usar o .innerText
                "fornecedor": DOM.querySelectorAll("#EdFornecedor")[i].textContent.replace(/\n/g, ''),
                "nota": DOM.querySelectorAll("#EdNota")[i].textContent.replace(/\n/g, ''),
                "data": DOM.querySelectorAll("#EdData")[i].textContent.replace(/\n/g, ''),
                "datae": DOM.querySelector("#EdPeriodo").innerText.slice(9,19),
                "volumes": DOM.querySelectorAll("#edVolumes")[i].textContent.replace(/\n/g, ''),
                "valor": DOM.querySelectorAll("#EdValor")[i].textContent.replace(/\n/g, '')
            }
            array.push(obj)
        }
        return array;
    }
    elementDOM = creatDOM(html);
    console.log(elementDOM)

    let sheet = XLSX.utils.json_to_sheet(elementDOM)
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, sheet, 'Sheet 1');
    XLSX.writeFile(workBook, './' + namefile + '.xlsx');
    
}

