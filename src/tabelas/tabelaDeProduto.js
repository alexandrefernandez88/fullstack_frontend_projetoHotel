import { Button, Container, Row, Table, Col, InputGroup } from "react-bootstrap";
import { IconeEditar, IconeExcluir, IconePesquisar } from "../Icones/Icones";
import Form from 'react-bootstrap/Form';
import { useRef } from "react";


export default function TabelaDeProduto(props) {

    const idp = useRef("");

    function validarID() {
        const produto = {
            idp: idp.current.value
        }

        if (idp) {
            props.pesquisarID(produto.idp);
        }
        else {
            props.buscarProdutos();
        }
    }

    return (
        <Container>
            <Row className="mt-3 mb-3 border d-flex text-center">
                <h2>Cadastro de Produtos</h2>
            </Row>
            <Row md="3">
                <Col as={Col} md="8">
                    <Button onClick={() => {
                        props.editarProduto({}, false);
                        props.onTabela(false);
                    }}>Novo Produto</Button>
                </Col>
                <Col as={Col} md="3">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar por ID"
                            ref={idp}
                        />
                    </InputGroup>
                </Col>
                <Col as={Col} md="1">
                    <Button onClick={() => { validarID() }}><IconePesquisar />Pesquisar</Button>
                </Col>
            </Row>
            <Row className="p-2 border">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((produto) => {
                                return <tr key={produto.idp}>
                                    <td>{produto.idp}</td>
                                    <td>{produto.titulo}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.categoria}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarProduto(produto, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirProduto(produto) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}