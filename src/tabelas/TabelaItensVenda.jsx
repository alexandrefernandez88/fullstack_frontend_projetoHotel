import { Table, Button, Container } from 'react-bootstrap';

export default function TabelaItensVenda(props) {
    var totalVendas = 0;
    return (
        <Container className='mb-3 border'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código do item</th>
                        <th>Descrição do produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaItens?.map((item, indice) => {
                            totalVendas += parseFloat(item.preco * item.qtd);
                            return <tr key={indice}>
                                <td>{item.codigo}</td>
                                <td>{item.descricao}</td>
                                <td>{item.preco}</td>
                                <td>{item.qtd}</td>
                                <td>{item.subTotal.toFixed(2)}</td>
                                <td>
                                    <Button onClick={() => {
                                        //remover item da lista
                                        const lista = props.listaItens.filter((prod) => prod.codigo != item.codigo);
                                        props.setVenda({...props.dadosVenda, listaProdutos:lista});
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash3-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>
            <p>Total da venda: {totalVendas} </p>
        </Container>
    );
}