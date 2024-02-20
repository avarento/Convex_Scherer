const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");
let html;
let elementDOM;
let namefile;



function dateDifference(a, b) {
    let x = a.split("/");
    const date1 = new Date(x[2] + '/' + x[1] + '/' + x[0]);
    let y = b.split("/");
    const date2 = new Date(y[2] + '/' + y[1] + '/' + y[0]);
    const diffInMilliseconds = Math.abs(date2 - date1);
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    return diffInDays
}

file.onchange = function() {
    if (file.files[0].type !== 'text/html') {
        alert("O tipo do arquivo aceito é somente .html");
    } else {
        //btn.style.color = "black";
        btn.style.display = "inline";
        upload.style.display = "none";
        const data = file.files[0];
        let reader = new FileReader();  
        reader.onload = function (e) {
            html = e.target.result;
        }
        reader.readAsText(data)
    }
}


btn.onclick = function() {    
    function creatDOM(htmlString) {
        let parse = new DOMParser();
        let DOM = parse.parseFromString(htmlString, 'text/html');
        namefile = DOM.querySelector("#EdPeriodo").innerText.slice(10,20);
        let array = [];
        for (let i = 0; DOM.querySelectorAll("#EdFornecedor")[i].textContent != '\nSCHERER S/A COMERCIO DE AUTOPECAS\n'; i++) {
            let dataA = DOM.querySelectorAll("#EdData")[i].textContent.replace(/\n/g, '');
            let dataB = DOM.querySelector("#EdPeriodo").innerText.slice(10,20);
            let diff = dateDifference(dataA, dataB);
            
            let obj = {
                //esqueci de usar o .innerText
                "fornecedor": DOM.querySelectorAll("#EdFornecedor")[i].textContent.replace(/\n/g, ''),
                "nota": DOM.querySelectorAll("#EdNota")[i].textContent.replace(/\n/g, ''),
                "data": DOM.querySelectorAll("#EdData")[i].textContent.replace(/\n/g, ''),
                "datae": DOM.querySelector("#EdPeriodo").innerText.slice(10,20),
                "volumes": DOM.querySelectorAll("#edVolumes")[i].textContent.replace(/\n/g, ''),
                "valor": DOM.querySelectorAll("#EdValor")[i].textContent.replace(/\n/g, ''),
                "demora": diff
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

