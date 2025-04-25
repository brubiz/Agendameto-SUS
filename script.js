// Variáveis globais
let usuarioLogado = null;

// Quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal de login
    const btnLogin = document.querySelector('.btn-login');
    const modal = document.getElementById('login-modal');
    const spanClose = document.querySelector('.close');
    
    btnLogin.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });
    
    spanClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Formulário de login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const cpf = document.getElementById('cpf').value;
        const senha = document.getElementById('senha').value;
        
        // Simulação de login (substituir por chamada real à API)
        fazerLogin(cpf, senha);
    });
    
    // Formulário de agendamento
    const agendamentoForm = document.getElementById('agendamento-form');
    agendamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!usuarioLogado) {
            alert('Por favor, faça login para agendar uma consulta.');
            return;
        }
        
        const especialidade = document.getElementById('especialidade').value;
        const medico = document.getElementById('medico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        
        // Simulação de agendamento (substituir por chamada real à API)
        agendarConsulta(usuarioLogado.id, especialidade, medico, data, horario);
    });
    
    // Carregar especialidades (simulado)
    carregarEspecialidades();
});

// Função para simular login
function fazerLogin(cpf, senha) {
    // Aqui você faria uma chamada ao backend para validar o login
    // Esta é uma simulação com dados fixos
    if (cpf === '12345678900' && senha === 'sus123') {
        usuarioLogado = {
            id: 1,
            nome: "Fulano da Silva",
            cpf: "123.456.789-00",
            dataNascimento: "15/05/1980"
        };
        
        alert(`Bem-vindo, ${usuarioLogado.nome}!`);
        document.getElementById('login-modal').style.display = 'none';
        habilitarAgendamento();
        // Aqui você carregaria as consultas do usuário
    } else {
        alert('CPF ou senha incorretos. Tente novamente.');
    }
}

// Habilitar formulário de agendamento após login
function habilitarAgendamento() {
    document.getElementById('medico').disabled = false;
    document.getElementById('data').disabled = false;
    document.getElementById('horario').disabled = false;
    document.querySelector('#agendamento-form button').disabled = false;
}

// Carregar especialidades (simulado)
function carregarEspecialidades() {
    const especialidades = [
        { id: 1, nome: "Clínico Geral" },
        { id: 2, nome: "Cardiologia" },
        { id: 3, nome: "Dermatologia" },
        { id: 4, nome: "Pediatria" },
        { id: 5, nome: "Ginecologia" }
    ];
    
    const select = document.getElementById('especialidade');
    especialidades.forEach(esp => {
        const option = document.createElement('option');
        option.value = esp.id;
        option.textContent = esp.nome;
        select.appendChild(option);
    });
    
    // Quando selecionar especialidade, carrega médicos
    select.addEventListener('change', function() {
        const especialidadeId = this.value;
        if (especialidadeId) {
            carregarMedicos(especialidadeId);
        } else {
            document.getElementById('medico').innerHTML = '<option value="">Selecione um médico</option>';
            document.getElementById('medico').disabled = true;
        }
    });
}

// Carregar médicos por especialidade (simulado)
function carregarMedicos(especialidadeId) {
    // Simulação - na prática, viria do backend
    const medicos = {
        1: [
            { id: 101, nome: "Dr. Carlos Silva" },
            { id: 102, nome: "Dra. Ana Oliveira" }
        ],
        2: [
            { id: 201, nome: "Dr. Roberto Costa" }
        ],
        3: [
            { id: 301, nome: "Dra. Juliana Santos" },
            { id: 302, nome: "Dr. Marcelo Lima" }
        ],
        4: [
            { id: 401, nome: "Dra. Patrícia Almeida" }
        ],
        5: [
            { id: 501, nome: "Dra. Fernanda Rodrigues" }
        ]
    };
    
    const select = document.getElementById('medico');
    select.innerHTML = '<option value="">Selecione um médico</option>';
    
    if (medicos[especialidadeId]) {
        medicos[especialidadeId].forEach(med => {
            const option = document.createElement('option');
            option.value = med.id;
            option.textContent = med.nome;
            select.appendChild(option);
        });
    }
    
    // Quando selecionar médico, carrega datas disponíveis
    select.addEventListener('change', function() {
        const medicoId = this.value;
        if (medicoId) {
            carregarDatasDisponiveis(medicoId);
        } else {
            document.getElementById('data').value = '';
            document.getElementById('data').disabled = true;
        }
    });
}

// Carregar datas disponíveis (simulado)
function carregarDatasDisponiveis(medicoId) {
    // Simulação - na prática, viria do backend
    const datasDisponiveis = ["2023-12-05", "2023-12-07", "2023-12-10"];
    
    const inputData = document.getElementById('data');
    inputData.min = new Date().toISOString().split('T')[0]; // Data atual como mínima
    inputData.disabled = false;
    
    // Quando selecionar data, carrega horários
    inputData.addEventListener('change', function() {
        const dataSelecionada = this.value;
        if (dataSelecionada) {
            carregarHorariosDisponiveis(medicoId, dataSelecionada);
        } else {
            document.getElementById('horario').innerHTML = '<option value="">Selecione um horário</option>';
            document.getElementById('horario').disabled = true;
        }
    });
}

// Carregar horários disponíveis (simulado)
function carregarHorariosDisponiveis(medicoId, data) {
    // Simulação - na prática, viria do backend
    const horarios = ["08:00", "09:30", "11:00", "14:00", "15:30"];
    
    const select = document.getElementById('horario');
    select.innerHTML = '<option value="">Selecione um horário</option>';
    
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        select.appendChild(option);
    });
    
    select.disabled = false;
}

// Simular agendamento de consulta
function agendarConsulta(usuarioId, especialidadeId, medicoId, data, horario) {
    // Aqui você faria uma chamada ao backend para registrar o agendamento
    console.log('Agendando consulta:', {
        usuarioId,
        especialidadeId,
        medicoId,
        data,
        horario
    });
    
    alert(`Consulta agendada com sucesso para ${data} às ${horario}`);
    // Limpar formulário
    document.getElementById('agendamento-form').reset();
    document.getElementById('medico').disabled = true;
    document.getElementById('data').disabled = true;
    document.getElementById('horario').disabled = true;
}
