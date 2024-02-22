const tableBody = document.querySelector('.table table tbody')

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
                            <button>
                                <img src="../svg/pencil.svg" alt="editar">
                            </button>
                        </td>
                        <td>
                            <button onclick="${deleteStudent(row.id)}">
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

function closeUpdate(){
    const update = document.querySelector('.update')
    document.body.removeChild(update)
}