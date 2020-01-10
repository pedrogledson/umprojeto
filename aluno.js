let alunos = [];

function carregaRegistros() {
  $('#tabela-alunos').find('tbody').html('');

  pegarAlunos().then(function() {
    alunos.forEach(function(alunos) {
      let tr = $('<tr>');

      tr.append($('<td>').html(aluno.id));
      tr.append($('<td>').html(aluno.nome));
      tr.append($('<td>').html(aluno.email));
      
      let buttonEditar = $('<button>').html('Editar').addClass('btn-arredondado btn-edicao');
      let buttonExcluir = $('<button>').html('Excluir').addClass('btn-arredondado btn-excluir');

      tr.append(buttonEditar);
      tr.append(buttonExcluir);

      tr.attr('data-id', aluno.id);

      buttonEditar.click(function() {
        const id = $(this).parent().attr('data-id');

        $('input[name=id]').val(aluno.id);
        $('input[name=nome]').val(aluno.nome);
        $('input[name=email]').val(aluno.email);
      });

      buttonExcluir.click(function() {
        const id = $(this).parent().attr('data-id');
        excluirAlunos({ id: id }).then(function() {
          carregaRegistros();
        })
      });

      $('#tabela-alunos').find('tbody').append(tr)
    })
  })
}

function pegarAlunos() {
  try {
    return axios.get('http://localhost:5000').then(function(resposta) {
      clientes = resposta.data
    }).catch(function(err) {
      alert('opa')
    });
  } catch (e) {
    console.log(e)
  }
}

function salvarAlunos(dadosDoAluno) {
  return axios.post('http://localhost:5000', dadosDoAluno).then(function(resposta) {
    console.log(resposta.data)
  });
}

function atualizarAlunos(dadosDoAluno) {
  return axios.patch('http://localhost:5000' + dadosDoAluno.id, dadosDoCliente).then(function(resposta) {
    console.log(resposta.data)
  });
}

function excluirCliente(dadosDoAluno) {
  return axios.delete('http://localhost:5000' + dadosDoAluno.id).then(function(resposta) {
    console.log(resposta.data)
  });
}

function limparFormulario() {
  $('input[name=id]').val('');
  $('input[name=nome]').val('');
  $('input[name=email]').val('');
}

$(document).ready(function() {
  carregaRegistros();

  $('#btn-adicionar').click(function() {
    const id = $('input[name=id]').val();
    const nome = $('input[name=nome]').val();
    const email = $('input[name=email]').val();

    if(id == '') {
      salvarAlunos({
        nome: nome,
        email: email
      }).then(function() {
        limparFormulario()
        carregaRegistros()
      })
    } else {
      atualizarAlunos({
        id: id,
        nome: nome,
        email: email
      }).then(function() {
        limparFormulario()
        carregaRegistros()
      })
    }
  })
})