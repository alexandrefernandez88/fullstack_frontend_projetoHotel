import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
// import { Container, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento.js';
import TelaErro from '../TelasDeCadastro/TelaErro.js';
import STATUS from '../Utilitarios/Util.js';
// import BarraBusca from '../componentes/BarraBusca.jsx';
// import CaixaSelecao from '../componentes/CaixaSelecao.jsx';

export default function FormCadProduto(props) {
    const localRecursos = "http://localhost:4000/produto";
    const [formValidado, setFormValidado] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [status, setStatus] = useState(STATUS.sucesso);
    //inicio complemento atv 1 fullstack2
    const [formValido, setFormValido] = useState(false);
    //fim complemento atv 1 fullstack2
    //inicio complemento atv 2 fullstack2

    //fim complemento atv 2 fullstack2

    const idp = useRef("");
    const titulo = useRef("");
    const preco = useRef("");
    const descricao = useRef("");
    const categoria = useRef("");

    //inicio complemento atv 1 fullstack2
    function buscarProduto() {
        fetch(localRecursos, { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setFormValido(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
    }
    //fim complemento atv 1 fullstack2


    function cadastrarProduto(produto) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarProduto.push(produto);
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarProduto();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function prepararTela(produto) {
        if (props.modoEdicao) {
            idp.current.value = produto.idp;
            titulo.current.value = produto.titulo;
            preco.current.value = produto.preco;
            descricao.current.value = produto.descricao;
            categoria.current.value = produto.categoria;
        }
    }

    function validarDados() {
        const produto = {
            idp: idp.current.value,
            titulo: titulo.current.value,
            preco: preco.current.value,
            descricao: descricao.current.value,
            categoria: categoria.current.value
        }
        if (produto.idp && produto.titulo && produto.preco && produto.descricao && produto.categoria)
            return produto;
        else
            return undefined;
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const produto = validarDados();
            if (produto) {
                setStatus(STATUS.ocioso);
                cadastrarProduto(produto);
                setStatus(STATUS.sucesso);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    useEffect(() => {
        prepararTela(props.produto);
        buscarProduto();
    }, []);

    if (status == STATUS.sucesso) {
        return (
            <Container>
                <Row className="mt-3 mb-3 border d-flex text-center">
                    <h2>Cadastro de Produto</h2>
                </Row>
                <Row className="mt-3 p-2 border">
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    id="idp"
                                    name="idp"
                                    disabled={(props.modoEdicao) ? "disabled" : ""}
                                    required
                                    type="number"
                                    ref={idp}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o IDP!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="10">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    id="titulo"
                                    name="titulo"
                                    required
                                    type="text"
                                    placeHolder="Título do produto"
                                    ref={titulo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe um título correto!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="10">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    id="preco"
                                    name="preco"
                                    required
                                    type="number"
                                    placeHolder="Preço"
                                    ref={preco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço do produto!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="10">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    id="descricao"
                                    name="descricao"
                                    required
                                    type="text"
                                    placeHolder="Descrição da Atividade"
                                    ref={descricao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a descrição da atividade!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    id="categoria"
                                    name="categoria"
                                    type="text"
                                    required
                                    ref={categoria}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a categoria.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>





                        {/* inicio complemento atv 2 fullstack2
                        <Row className='m-3'>
                            <Col>
                            <CaixaSelecao enderecoFonteDados={localRecursos}  campoChave={}  funcaoSelecao={}>
                            <CaixaSelecao enderecoFonteDados={localRecursos}  campoChave="id"  campoExibicao="name" funcaoSeleca={setProdutoSelecionado}>


                            </CaixaSelecao>
                            </Col>


                        </Row>
 */}
                        {/* fim complemento atv 2 fullstack2 */}

                        {/* inicio complemento atv 1 fullstack2 */}
                        {/* <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Selecione o produto:</Form.Label>
                                    <BarraBusca placeHolder={'Informe o produto'}
                                        //antes de passar esses dados, fazer uma busca de dados de clientes no backend e passar para o campo busca

                                        dados={formValido}
                                        campoChave={"id"}
                                        campoBusca={"titulo"}
                                        // funcaoSelecao={()=>()}
                                        funcaoSelecao={setProdutoSelecionado}
                                        valor={""} />
                                </Form.Group>
                            </Col>
                        </Row> */}
                        {/* fim complemento atv 1 fullstack2 */}






                        <Button variant='primary' type="submit">Cadastrar</Button> { }
                        <Button variant='secondary' type="button" onClick={() => {
                            props.onTabela(true);
                        }}> Voltar </Button>
                    </Form>
                </Row>
            </Container>

        );
    }
    else if (status == STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível recuperar os dados de produtos. Entre em contato com o administrador do sistema" />
        );
    }
}