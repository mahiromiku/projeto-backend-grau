CREATE DATABASE faculdade;
USE faculdade;

CREATE TABLE matricula(
    id integer auto_increment primary key not null,
    nome_completo varchar(255),
    data_nascimento DATE,
    sexo varchar(255),
    endereco varchar(255),
    cpf varchar(255),
    rg varchar(255),
    telefone varchar(255)
);