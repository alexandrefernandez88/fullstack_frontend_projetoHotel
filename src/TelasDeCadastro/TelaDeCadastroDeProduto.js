import Pagina from "../templates/Pagina.js";
import FormCadProduto from "../Formularios/FormCadProduto.js";
import TabelaDeProduto from "../tabelas/tabelaDeProduto.js"
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento.js";
import TelaErro from "./TelaErro.js";
import STATUS from "../Utilitarios/Util.js";

export default function TelaCadastroDeProduto(props) {

    const localRecursos = "http://localhost:4000/produto";

    function pesquisarID(idp) {
        fetch(localRecursos + "/" + idp, {method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaProdutos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function buscarProdutos() {
        fetch(localRecursos, {method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaProdutos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararProdutoParaEdicao(produto, edicao) {
        setAtualizando(edicao);
        setProdutoEmEdicao(produto);
        setExibirTabela(false);
    }

    function excluirProduto(produto) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(produto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            alert(dados.mensagem);
            buscarProdutos();
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [autalizando, setAtualizando] = useState(false);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState({
        idp: 0,
        titulo: "",
        preco: "",
        descricao: "",
        categoria: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarProdutos();
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
                    <TabelaDeProduto dados={listaProdutos} onTabela={setExibirTabela} editarProduto={prepararProdutoParaEdicao} excluirProduto={excluirProduto}  pesquisarID={pesquisarID} buscarProdutos={buscarProdutos}/>
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos produtos. Entre em contato com o administrador do sistema." />
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadProduto onTabela={setExibirTabela} modoEdicao={autalizando} produto={produtoEmEdicao} editarProduto={prepararProdutoParaEdicao} listaProdutos={listaProdutos}  buscarProdutos={buscarProdutos} />
            </Pagina>
        );
    }
}