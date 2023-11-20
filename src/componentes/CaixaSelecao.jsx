//depende de componentes estilizados pelo bootstrastrap
//enderecoFonteDados informa qual a url que a caixa de seleção usará para recuperar os dados
//campoChave : nos dados, qual campo é a chave primária
//campoExibicao: qual coluna deve ser exibida pela caixa de seleção
//funcaoSelecao: que á a função que receberá o objeto selecionado pelo usuario

import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";

export default function CaixaSelecao({
    enderecoFonteDados,
    campoChave,
    campoExibicao,
    funcaoSelecao
}) {
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]: "Não foi possível obter os dados do backend CaixaSelecao"
    });
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        try {
            fetch(enderecoFonteDados, { method: "GET" }).then((resposta) => {
                if (resposta.ok) { //código 200
                    return resposta.json();
                } else {
                    return ([{
                        [campoChave]: 0,
                        [campoExibicao]: "Não foi possível obter os dados do backend"

                    }]);
                }
            }).then((listaDados) => {
                setCarregandoDados(false);
                setDados(listaDados);
                //lembrar que minha caixa de seleção possui objetos selecionados
                if (listaDados.length > 0) {
                    setValorSelecionado(listaDados[0]);
                    funcaoSelecao(listaDados[0]);
                }
            });
        } catch (erro) {
            setCarregandoDados(false);
            setDados([{
                [campoChave]: 0,
                [campoExibicao]: "Não foi possível obter os dados do backend" + erro.message
            }
            ]);
        }
    }, []); //willMount

    return (
        <Container border>
            <Row>
                <Col md={11}>
                    {/* <Form.Select */}
                    <Form.Select 
                    // <Form.Select value={valorSelecionado[campoExibicao]}
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            //valor selecionado e funcao seleção esperam objetos da lista
                            //gerando uma lista de ids, cpfds, codigo etc
                            const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                            setValorSelecionado(dados[pos]);
                            funcaoSelecao(dados[pos]);

                        }}>
                        {
                            dados.map((item) => {
                                return <option key={item[campoChave]}
                                    value={item[campoChave]}
                                >
                                    {item[campoExibicao]}
                                </option>
                            })
                        }
                        <option value={""}>  Selecione um produto  </option>
                    </Form.Select>
                </Col>
                <Col md={1}>
                    {/* como se fosse uma variavel sendo o "carregandoDados" true or false */}
                    <Spinner className={carregandoDados ? "visible" : "invisible"}></Spinner>
                </Col>
            </Row>
        </Container>
    );
}