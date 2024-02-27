const upload = document.getElementById("btn-up");
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
					conv();
        }
        reader.readAsText(data)
    }
}


function conv() {
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


	
copy_btn.onclick = async function(){
	let tr1 = `Fornecedor	NF	Data de emissão	Data de entrada	Volumes	Valor	Tempo de entrega
`;
	await navigator.clipboard.writeText(document.querySelector('tbody').innerText.replace(tr1,""));
}
