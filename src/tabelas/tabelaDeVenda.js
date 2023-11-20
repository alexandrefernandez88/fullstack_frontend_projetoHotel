import { Button, Container, Row, Table, Col, InputGroup } from "react-bootstrap";
import { IconeExcluir, IconePesquisar } from "../Icones/Icones";
import Form from 'react-bootstrap/Form';
import { useRef } from "react";


export default function TabelaDeVenda(props) {
    const id = useRef("");
    function validarID() {
        const venda = {
            id: id.current.value
        }
        if (id) {
            props.pesquisarID(venda.id);
        }
        else {
            props.buscarVendas();
        }
    }

    return (
        <Container>
            <Row className="mt-3 mb-3 border d-flex text-center">
                <h2>Cadastro de Vendas</h2>
            </Row>
            <Row md="3">
                <Col as={Col} md="8">
                    <Button onClick={() => {
                        props.editarVenda({}, false);
                        props.onTabela(false);
                    }}>Nova Venda</Button>
                </Col>
                <Col as={Col} md="3">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar por ID"
                            ref={id}
                        />
                    </InputGroup>
                </Col>
                <Col as={Col} md="1">
                    <Button onClick={() => { validarID(id) }}><IconePesquisar />Pesquisar</Button>
                </Col>
            </Row>
            <Row className="p-2 border">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data Venda</th>
                            {/* <th>Desconto</th> */}
                            {/* <th>Valor Total Tributos</th> */}
                            <th>Cliente</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((venda) => {
                                return <tr key={venda.id}>
                                    <td>{venda.id}</td>
                                    <td>{venda.dataVenda}</td>
                                    {/* <td>{venda.desconto}</td> */}
                                    {/* <td>{venda.valorTotalTributos}</td> */}
                                    <td>{venda.cliente.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        {/* <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarVenda(venda, true) }}>
                                            <IconeEditar />
                                        </Button> */}
                                        <Button variant="outline-danger" onClick={() => { props.excluirVenda(venda) }}>
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