import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Row, Form } from 'react-bootstrap';
import BarraBusca from '../componentes/BarraBusca.jsx';
import CaixaSelecao from "../componentes/CaixaSelecao.jsx";
import TabelaItensVenda from '../tabelas/TabelaItensVenda.jsx';

export default function FormCadVenda(props) {
    const [formValidado, setFormValidado] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    //trabalhando com as quantidades dos itens
    const [qtdItem, setQtdItem] = useState(1);
    const [subTotalCalculado, setSubTotalCalculado] = useState(0.00);
    //estado venda possui correlação com a venda gerenciada no backend
    const [venda, setVenda] = useState({
        id: 0,
        dataVenda: "",
        desconto: 0,
        // valorTotalTributos: 0,
        listaProdutos: []
    });

    useEffect(() => {
        fetch("http://localhost:4000/cliente", { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((listaClientes) => {
                setListaClientes(listaClientes);
            }).catch((erro) => {
                alert("Não foi possível recuperar os dados dos clientes do banco de dados.");
            });
    });



    function cadastrarVenda() {
        fetch("http://localhost:4000/venda", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "dataVenda": venda.dataVenda,
                // "desconto": venda.desconto,
                // "valorTotalTributos": venda.valorTotalTributos,
                "cliente": {
                    "cpf": clienteSelecionado.cpf,
                },
                "produto":venda.listaProdutos
            })
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((dados) => {
                if (dados.status) {
                    setVenda({ ...venda, id: dados.id });
                }
                alert(dados.mensagem);
            })
            .catch((erro) => {
                alert("Erro ao registrar a venda: " + erro.message);
            });
    }

    function selecionarItem(item){
        setProdutoSelecionado(item);
        setSubTotalCalculado(qtdItem * parseFloat(item.preco))
    }


    //identificar o alvo
    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setVenda({ ...venda, [alvo]: e.target.checked });
        }
        else {
            setVenda({ ...venda, [alvo]: e.target.value });
            // console.log("Digitou " + e.target.value);
        }
    }



    // function manipularQuantidades(e) {
    //     const qtd = parseInt(e.currentTarget.value);
    //     if (qtd > 0) {
    //         setQtdItem(qtd);
    //         subTotalCalculado(qtd * parseFloat(produtoSelecionado.price));
    //     }
    // }



    const manipularSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            cadastrarVenda();
        }
        else {
            setFormValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };



    return (
        <Container>
            <Row className="mt-2 mb-3 border d-flex text-center">
                <h2>Cadastro de Venda</h2>
            </Row>
            <Row className="mt-2 p-2 border border-success">
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="2" controlId='idVenda'>
                            <Form.Label>Identificador da venda</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="0"
                                defaultValue="0"
                                disabled
                                name="id"
                                value={venda.id}
                                onChange={manipularMudanca} />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o código da venda!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} md="3" controlId='dataVenda'>
                            <Form.Label>Data da Venda</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                name="dataVenda"
                                value={venda.dataVenda}
                                onChange={manipularMudanca} />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a data da venda!
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* <Form.Group as={Col} md="5" controlId="desconto">
                            <Form.Label>Desconto da Venda</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="0.00"
                                value={venda.desconto}
                                name="desconto"
                                onChange={manipularMudanca}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o valor de desconto!
                            </Form.Control.Feedback>
                        </Form.Group> */}
                    </Row>
                    <Row className="mb-3">
                        {/* <Form.Group as={Col} md="8" controlId="valorTotalTributos">
                            <Form.Label>Valor total</Form.Label>
                            <Form.Control
                                type="text"
                                placeHolder="0.00"
                                value={venda.valorTotalTributos}
                                name="valorTotalTributos"
                                precision="2"
                                onChange={manipularMudanca}
                                //colocar o valor do subtotalcalculado final da tabela itens vendas jsx
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe os tributos.
                            </Form.Control.Feedback>
                        </Form.Group> */}
                    </Row>
                    <Row>
                        <Form.Group as={Col} md='12' controlId="valorTotalTributos">
                            <Form.Label>Selecione um cliente:</Form.Label>
                            <BarraBusca
                                campoBusca={"nome"}
                                campoChave={"cpf"}
                                dados={listaClientes}
                                funcaoSelecao={setClienteSelecionado}
                                placeHolder={'Selecione um cliente'}
                                valor={""}
                            />
                        </Form.Group>
                        <p />
                        <p />
                    </Row>


                    {/* inserir produtos inicio */}
                    <Row>
                        {
                            /* sessão responsável por permitir que produtos sejam selecionados demonstração de relacionamento */
                        }
                        <Container className='m-2 border'>
                            <Row className='m-3'>
                                <Col md={2}>
                                    <Form.Label>Selecione um produto:</Form.Label>
                                </Col>
                                <Col>
                                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/produto"}
                                        campoChave={"idp"}//mudei para IDP ao in´ves de ID
                                        campoExibicao={"titulo"}
                                        funcaoSelecao={selecionarItem}


                                        />
                                </Col>
                            </Row>
                            <Row>
                                {/* Detalhar os produtos selecionados */}
                                <Col md={12}>
                                    <Row>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>ID:</Form.Label>
                                                {/* {produtoSelecionado?.id?.valor} se fóssemos pesquisar outro valor que fosse ID, mas para isso deveríamos consultar antes de passar o id */}
                                                <Form.Control type="text" value={produtoSelecionado?.idp?.valor} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Produto:</Form.Label>
                                                <Form.Control type="text" value={produtoSelecionado?.titulo} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>Preço R$:</Form.Label>
                                                <Form.Control type="text" value={produtoSelecionado?.preco} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group>
                                                <Form.Label>Descrição:</Form.Label>
                                                <Form.Control type="text" value={produtoSelecionado?.descricao} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>Categoria:</Form.Label>
                                                <Form.Control type="text" value={produtoSelecionado?.categoria} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>Qtd</Form.Label>
                                                <Form.Control type="number" 
                                                    min={1}
                                                    value={qtdItem}
                                                    onChange={(e) => {
                                                        const qtd = parseInt(e.currentTarget.value);
                                                        if (qtd > 0) {
                                                            setQtdItem(qtd);
                                                            setSubTotalCalculado(qtd * parseFloat(produtoSelecionado.preco).toFixed(2));
                                                        }
                                                    }} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>SubTotal</Form.Label>
                                                <Form.Control type="text" value={subTotalCalculado} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1} className="middle">
                                            <Form.Group>
                                                <Form.Label>Adicionar</Form.Label>
                                                <Button onClick={() => {
                                                    let listaItensVendidos = venda.listaProdutos;
                                                    listaItensVendidos.push({
                                                        codigo: produtoSelecionado.idp,
                                                        descricao: produtoSelecionado.titulo,
                                                        preco: produtoSelecionado.preco,
                                                        qtd: qtdItem,
                                                        subTotal: subTotalCalculado
                                                    });
                                                    setVenda({ ...venda, listaProdutos: listaItensVendidos });
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        width="16" 
                                                        height="16" 
                                                        fill="currentColor" 
                                                        class="bi bi-plus-circle " 
                                                        viewBox="0 0 16 16">
                                                        <path fill="#4fc528" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path fill="#4fc528" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                    </svg>
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <p><strong>Produtos selecionados:</strong></p>
                                <TabelaItensVenda
                                    listaItens={venda.listaProdutos}
                                    setVenda={setVenda}
                                    dadosVenda={venda}
                                />
                            </Row>
                        </Container>
                    </Row>
                    <Button type="submit" className="btn btn-success border border-success">Confirmar a venda</Button>
                    <Button
                        className="btn btn-danger border border-warning text-white"
                        type="button"
                        onClick={() => {
                            props.onTabela(true);
                        }}>
                        Voltar
                    </Button>
                </Form>
            </Row >
        </Container >
    );
}