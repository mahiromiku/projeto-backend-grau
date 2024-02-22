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

const tableBody = document.querySelector('.table table tbody')

function getStudentById(id){
    axios.get(`http://localhost:4000/alunos/${id}`)
        .then(response => response.data)
        .then(student => {
            const inputs = getId()
            inputs.nomeCompleto.value = student["nome_completo"]
            inputs.dataNascimento.value = student["data_nascimento"]
            inputs.sexo.value = student.sexo
            inputs.endereco.value = student.endereco
            inputs.cpf.value = student.cpf
            inputs.rg.value = student.rg
            inputs.telefone.value = student.telefone
        })
}

function getStudents(){
    axios.get('http://localhost:4000/alunos')
        .then(response => response.data)
        .then(data => {
            if(data.length > 0){
                tableBody.innerHTML = ''
                data.forEach(row => {
                    tableBody.innerHTML += `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row["nome_completo"]}</td>
                        <td>${row["data_nascimento"]}</td>
                        <td>${row.sexo}</td>
                        <td>${row.endereco}</td>
                        <td>${row.cpf}</td>
                        <td>${row.rg}</td>
                        <td>${row.telefone}</td>
                        <td>
                            <button onclick="openUpdate(); getStudentById(${row.id})">
                                <img src="../svg/pencil.svg" alt="editar">
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteStudent(${row.id})">
                                <img src="../svg/garbage.svg" alt="deletar">
                            </button>
                        </td>
                    </tr>
                    `
                })
            }else{
                tableBody.innerHTML = `
                <tr>
                    <td colspan="10">Nenhum aluno registrado 😢</td>
                </tr>
                `
            }
        })
        .catch(error => console.error('Erro:', error))
}

function deleteStudent(id){
    axios.delete(`http://localhost:4000/alunos/${id}`)
        .then(response => response.data)
        .then(data => {
            alert(data.mensagem)
            tableBody.innerHTML = ''
            getStudents()
        })
        .catch(error => console.error(error))
}

getStudents()

// exibir update

function closeUpdate(){
    const body = document.body
    const update = document.querySelector('.update')
    body.removeChild(update)
    body.style.overflow = 'auto'
}

function openUpdate(){
    const body = document.body
    const section = document.createElement('section')
    section.className = 'update'
    section.innerHTML = `
        <form class="form-update">
            <button class="close-update" onclick="closeUpdate()">
                <img src="../svg/close.svg" alt="close">
            </button>
            <label for="name">Nome completo:</label>
            <input type="text" placeholder="Nome Completo" id="name">
            <label for="birthday">Data De Nascimento:</label>
            <input type="date" placeholder="Data De Nascimento" id="birthday">
            <label for="gender">Sexo:</label>
            <select id="gender">
                <option value="" disabled selected>Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
            </select>
            <label for="address">Endereço:</label>
            <input type="text" placeholder="Endereço" id="address">
            <label for="cpf">CPF:</label>
            <input type="text" placeholder="CPF" id="cpf" maxlength="14" oninput="formatarCPF(this)">
            <label for="rg">RG:</label>
            <input type="text" placeholder="RG" id="rg" maxlength="12" oninput="formatarRG(this)">
            <label for="phone">Telefone:</label>
            <input type="text" placeholder="Telefone" id="phone" maxlength="15" oninput="formatarTelefone(this)">
            <input type="submit" value="Atualizar" id="submit">
        </form>
    `
    body.appendChild(section)
    body.style.overflow = 'hidden'
}