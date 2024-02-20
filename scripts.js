const upload = document.getElementById("btn-up");
const convert = document.getElementById("btn-conv");
const download = document.getElementById("btn-down");
const copy = document.getElementById("copy-container");
const copy_btn = document.getElementById("btn-copy");
const file = document.getElementById("fileUploaded");
let html;
let elementDOM;
let namefile;
let workBook;



upload.onclick = function() {

			file.click();
   
};

function add (fornecedor, nf, dataemissao, dataentrada, volume, valor, diff){
    var corpoTabela = document.querySelector('tbody');
    var tr= document.createElement('tr');
    var tdfornecedor= document.createElement('td');
    var tdnf= document.createElement('td');
    var tddataemissao= document.createElement('td');
    var tddataentrada= document.createElement('td');
    var tdvolume= document.createElement('td');
    var tdvalor= document.createElement('td');
    var tddiff= document.createElement('td');
    
    tdfornecedor.textContent = fornecedor;
    tdnf.textContent = nf;
    tddataemissao.textContent = dataemissao;
    tddataentrada.textContent = dataentrada;
    tdvolume.textContent = volume;
    tdvalor.textContent = valor;
    tddiff.textContent = diff;
    
    tr.appendChild(tdfornecedor);
     tr.appendChild(tdnf);
     tr.appendChild(tddataemissao);
     tr.appendChild(tddataentrada);
     tr.appendChild(tdvolume);
     tr.appendChild(tdvalor);
     tr.appendChild(tddiff);
    
    corpoTabela.appendChild(tr);
    }

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
      

        const data = file.files[0];
        let reader = new FileReader();  
        reader.onload = function (e) {
            html = e.target.result;
        }
        reader.readAsText(data)
    }
}


convert.onclick = function() {
	if (file.files.length !== 0) {
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
             add(obj.fornecedor, obj.nota, obj.data, obj.datae, obj.volumes, obj.valor, obj.demora)
            array.push(obj)
        }
        return array;
    }
    elementDOM = creatDOM(html);
    console.log(elementDOM)
    copy.style.display = "inline";
    
	} else {
		alert("Sem arquivos para converter!");
	}
    
}

download.onclick = function(){
	if (document.querySelector("tbody").children.length > 1) {
		let sheet = XLSX.utils.json_to_sheet(elementDOM);
    workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, sheet, 'Sheet 1');
		XLSX.writeFile(workBook, './' + namefile + '.xlsx');
	} else {
		alert("Sem dados para download!");
	} 
}
	
copy_btn.onclick = function(){
	alert("Ainda n funciona...");
}
