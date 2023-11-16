const upload = document.getElementById("upload");
const btn = document.getElementById("btn");
const file = document.getElementById("fileUploaded");
let conteudoHTML;

file.onchange = function() {
    btn.style.display = "inline";
    upload.style.display = "none";

    const data = file.files[0];
    let leitor = new FileReader();
    
    leitor.onload = function (e) {
        conteudoHTML = e.target.result;
        
     

    }

    leitor.readAsText(data)
}

btn.onclick = function() {
    // let data = file.files[0];
    // let blob = new Blob([data], { type: "application/vnd.ms-excel" });
    // const link= window.document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download =  "convex_" + file.files[0].name;
    // link.click();
    // window.URL.revokeObjectURL(link.href);



    // const cheerio = require('cheerio');
    // const $ = cheerio.load(conteudoHTML);
    // var titulo = $('h1').text();
    console.log(conteudoHTML);
    
  
    // let array = [];


    // for (let i = 0; document.querySelectorAll("#EdFornecedor")[i].textContent != '\nSCHERER S/A COMERCIO DE AUTOPECAS\n'; i++) {

    //     let obj = {
    //         "fornecedor": document.querySelectorAll("#EdFornecedor")[i].textContent.replace(/\n/g, ''),
    //         "nota": document.querySelectorAll("#EdNota")[i].textContent.replace(/\n/g, ''),
    //         "data": document.querySelectorAll("#EdData")[i].textContent.replace(/\n/g, ''),
    //         "volumes": document.querySelectorAll("#edVolumes")[i].textContent.replace(/\n/g, ''),
    //         "valor": document.querySelectorAll("#EdValor")[i].textContent.replace(/\n/g, '')
    //     }
    //     array.push(obj)
    // }


    // console.log("\nRelátório: \n ", array)




}



