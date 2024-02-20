function getId(){
    return {
        nomeCompleto: document.getElementById('name'),
        dataNascimento: document.getElementById('birthday'),
        sexo: document.getElementById('gender'),
        endereco: document.getElementById('address'),
        cpf: document.getElementById('cpf'),
        rg: document.getElementById('rg'),
        telefone: document.getElementById('phone')
    }
}

function getData(){
    const formId = getId()
    for(let key in formId){
        formId[key] = formId[key].value
    }
    return formId
}

function sendStudent(){
    const data = getData()
    if(data.nomeCompleto.trim() !== '' && data.dataNascimento.trim() !== '' && data.sexo.trim() !== '' && data.endereco.trim() !== '' && data.cpf.trim() !== '' && data.rg.trim() !== '' && data.telefone.trim() !== ''){
        axios.post('http://localhost:4000/alunos', data)
        .then(response => response.data)
        .then(data => {
            alert(data.mensagem)
            for(let key in data){
                data[key] = ''
            }
        })
        .catch(error => {
            console.error('Erro:', error)
            alert('O servidor não está aceitando envios de formulário')
        })
    }else{
        alert('Confira se os dados estão corretos')
    }
}

const form = document.getElementById('registration')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    sendStudent()
})

//mascaras
function formatarCPF(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    }
    if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    }
    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
    }
    campo.value = valor;
}

function formatarRG(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    }
    if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    }
    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
    }
    campo.value = valor;
}

function formatarTelefone(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length === 11) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formato (11) 12345-6789
    } else {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3'); // Formato (11) 1234-5678
    }
    campo.value = valor;
}