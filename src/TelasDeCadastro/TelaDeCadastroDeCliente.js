import Pagina from "../templates/Pagina.js";
import FormCadCliente from "../Formularios/FormCadCliente.js";
import TabelaDeClientes from "../tabelas/tabelaDeClientes.js";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento.js";
import TelaErro from "./TelaErro.js";
import STATUS from "../Utilitarios/Util.js";

export default function TelaDeCadastroDeCliente(props) {

    const localRecursos = "http://localhost:4000/cliente";

    function pesquisarCPF(cpf) {
        fetch(localRecursos + "/" + cpf, { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaClientes(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
    }

    function buscarClientes() {
        fetch(localRecursos, { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaClientes(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
    }

    function prepararClienteParaEdicao(cliente, edicao) {
        setAtualizando(edicao);
        setClienteEmEdicao(cliente);
        setExibirTabela(false);
    };


    function excluirCliente(cliente) {
        fetch(localRecursos, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            alert(dados.mensagem);
            buscarClientes();
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }


    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaClientes, setListaClientes] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [clienteEmEdicao, setClienteEmEdicao] = useState(
        {
            cpf: "",
            nome: "",
            sobrenome: "",
            usuario: "",
            cidade: "",
            uf: "",
            cep: "",
            endereco: "",
            numero: "",
            bairro: "",
            telefone: "",
            email: ""
        }
    );


    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarClientes();
    }, []);



    function alternarTelas() {
        setExibirTabela(!exibirTabela)
    }




    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarClientes();
    }, []);

    if (exibirTabela) {
        if (status == STATUS.ocioso) {
            return (
                <TelaCarregamento />
            );
        }
        //editado final do "tabelaDeClientes"
        else if (status == STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaDeClientes dados={listaClientes} onTabela={setExibirTabela} editarCliente={prepararClienteParaEdicao} excluirCliente={excluirCliente} pesquisarCPF={pesquisarCPF} buscarClientes={buscarClientes} />
                </Pagina>
            );
        }

        else {
            return (
                <TelaErro mensagem="Não foi possível recuperar os dados dos funcionários. Entre em contato com o administrador do sistema." />
            );
        }
    }
    //nova parte da atividade add no final do item abaixo
    else {
        return (
            <Pagina>
                <FormCadCliente onTabela={setExibirTabela} listaClientes={listaClientes} buscarClientes={buscarClientes} chamarTabelaClientes={alternarTelas} modoEdicao={atualizando} cliente={clienteEmEdicao} editarCliente={prepararClienteParaEdicao} />
            </Pagina>
        );
    }
}
