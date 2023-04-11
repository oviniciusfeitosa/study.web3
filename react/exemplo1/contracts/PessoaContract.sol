// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract PessoaContract {
    struct Pessoa {
        string nome;
        bool status;
        uint8 tipo;
        uint dataCadastro;
        uint dataModificacao;
        uint numeroVersao;
    }

    mapping(address => Pessoa) private pessoas;
    address public owner;
    
    event PessoaCadastrada(address carteira, string nome);
    event PessoaAtualizada(address carteira, string nome);
    event PessoaInativada(address carteira, string nome);

    constructor() {
        owner = msg.sender; // adicionado o construtor para setar o owner
    }

    function cadastrar(
        string memory _nome,
        uint8 _tipo
    ) public {
        require(bytes(pessoas[msg.sender].nome).length == 0, "Endereco de carteira ja registrado.");
        
        require(_tipo == 1 || _tipo == 2 , "Tipo de pessoa incorreto.");

        Pessoa memory pessoa = Pessoa(
            _nome,
            true,
            _tipo,
            block.timestamp,
            block.timestamp,
            1
        );

        pessoas[msg.sender] = pessoa;

        emit PessoaCadastrada(msg.sender, _nome);
    }

    function consultar() public view returns (
        string memory,
        bool,
        uint8,
        uint,
        uint,
        uint
    ) {
        require(bytes(pessoas[msg.sender].nome).length > 0, "Registro nao encontrado.");

        Pessoa memory pessoa = pessoas[msg.sender];
        
        return (pessoa.nome, pessoa.status, pessoa.tipo, pessoa.dataCadastro, pessoa.dataModificacao, pessoa.numeroVersao);
    }

    function inativar() public {
        require(bytes(pessoas[msg.sender].nome).length > 0, "Registro nao encontrado.");
        require(pessoas[msg.sender].status == true, "Pessoa ja esta inativa.");
        
        pessoas[msg.sender].status = false;
        pessoas[msg.sender].numeroVersao++; // incrementa a versão após a inativação
        pessoas[msg.sender].dataModificacao = block.timestamp;
        
        emit PessoaInativada(msg.sender, pessoas[msg.sender].nome);
    }

    function ativar() public {
        require(bytes(pessoas[msg.sender].nome).length > 0, "Registro nao encontrado.");
        require(pessoas[msg.sender].status == false, "Pessoa ja esta ativa.");
        
        pessoas[msg.sender].status = true;
        pessoas[msg.sender].numeroVersao++; // incrementa a versão após a inativação
        pessoas[msg.sender].dataModificacao = block.timestamp;
        
        emit PessoaAtualizada(msg.sender, pessoas[msg.sender].nome);
    }

}