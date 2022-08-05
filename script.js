let cep = document.querySelector('#cep');


async function buscaEndereco(cep) {

    let invalidoCEP = document.getElementById("erro");
    invalidoCEP.innerHTML ='';
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
           
            throw Error('Este CEP não existe!')
            
        }
        let endereco = document.getElementById('endereco');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;
        endereco.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        document.getElementById('cep').style.borderColor = "green"
        

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        
        invalidoCEP.innerHTML = `<span> CEP invalido <span>`
        invalidoCEP.style.color = "red"
        document.getElementById('cep').style.borderColor = "red"
        cidade.value = "";
        estado.value = "";
        endereco.value = "";
        bairro.value = "";
       
    }
}


cep.addEventListener('focusout', () => {
    buscaEndereco(cep.value)


})





/* RESOLVENDO VARIAS REQUISIÇÕES AO MESMO TEMPO.
let ceps = ["75696329","75690000"];
let conjuntoDeCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoDeCeps).then(respostas => console.log(respostas));
*/


