import Pagina from "../templates/Pagina.js";
import FormCadVenda from "../Formularios/FormCadVenda.js";
import TabelaDeVenda from "../tabelas/tabelaDeVenda.js";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento.js";
import TelaErro from "./TelaErro.js";
import STATUS from "../Utilitarios/Util.js";

export default function TelaCadastroDeVenda(props) {

    const localRecursos = "http://localhost:4000/venda";

    // function pesquisarID(id) {
    //     fetch(localRecursos + "/" + id, { method: "GET" })
    //         .then((resposta) => {
    //             return resposta.json();
    //         }).then((dados) => {
    //             setListaVendas(dados);
    //             setStatus(STATUS.sucesso);
    //         }).catch((erro) => {
    //             setStatus(STATUS.erro);
    //         });
    // }

    function buscarVendas() {
        fetch(localRecursos, {method: "GET"})
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaVendas(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
    }

    function prepararVendaParaEdicao(venda, edicao) {
        setAtualizando(edicao);
        setVendaEmEdicao(venda);
        setExibirTabela(false);
    }

    function excluirVenda(venda) {
        fetch(localRecursos, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venda)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            alert(dados.mensagem);
            buscarVendas();
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaVendas, setListaVendas] = useState([]);
    const [autalizando, setAtualizando] = useState(false);
    const [vendaEmEdicao, setVendaEmEdicao] = useState({
        id: 0,
        dataVenda: "",
        // desconto: "",
        // valorTotalTributos: "",
        cpf: "",
        cliente: "",
        listaProdutos: []
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarVendas();
    }, []);

    if (exibirTabela) {
        if (status == STATUS.ocioso) {
            return (
                <TelaCarregamento/>
            );
        }
        else if (status == STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaDeVenda dados={listaVendas} onTabela={setExibirTabela} editarVenda={prepararVendaParaEdicao} excluirVenda={excluirVenda} buscarVendas={buscarVendas}/>
                    {/* pesquisarID={pesquisarID} */}
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados das vendas. Entre em contato com o administrador do sistema." />
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadVenda onTabela={setExibirTabela} modoEdicao={autalizando} venda={vendaEmEdicao} editarVenda={prepararVendaParaEdicao} listaVendas={listaVendas} buscarVendas={buscarVendas} />
            </Pagina>
        );
    }
}