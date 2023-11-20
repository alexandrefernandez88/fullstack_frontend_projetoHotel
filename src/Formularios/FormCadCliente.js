import { useState, useRef, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento.js';
import TelaErro from '../TelasDeCadastro/TelaErro.js';
import STATUS from '../Utilitarios/Util';
// import BarraBusca from '../componentes/BarraBusca.jsx';
// import CaixaSelecao from '../componentes/CaixaSelecao.jsx';

export default function FormCadCliente(props) {
    const localRecursos = "http://localhost:4000/cliente";
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    //inicio complemento atv 1 fullstack2
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [formValido, setFormValido] = useState(false);
    //fim complemento atv 1 fullstack2

    const cpf = useRef("");
    const nome = useRef("");
    const sobrenome = useRef("");
    const usuario = useRef("");
    const cidade = useRef("");
    const uf = useRef("");
    const cep = useRef("");
    const endereco = useRef("");
    const numero = useRef("");
    const bairro = useRef("");
    const telefone = useRef("");
    const email = useRef("");


    //inicio complemento atv 1 fullstack2
    function buscarCliente() {
        fetch('http://localhost:4000/cliente', { method: "GET" })
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

    function cadastrarCliente(cliente) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarClientes.push(cliente);
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarClientes();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function prepararTela(cliente) {
        if (props.modoEdicao) {
            cpf.current.value = formatarCPF(cliente.cpf);
            nome.current.value = cliente.nome;
            sobrenome.current.value = cliente.sobrenome;
            usuario.current.value = cliente.usuario;
            cidade.current.value = cliente.cidade;
            uf.current.value = cliente.uf;
            cep.current.value = cliente.cep;
            endereco.current.value = cliente.endereco;
            numero.current.value = cliente.numero;
            bairro.current.value = cliente.bairro;
            telefone.current.value = cliente.telefone;
            email.current.value = cliente.email;
        }
    }

    function formatarCPF(cpf) {
        var _cpf = cpf
        while (_cpf.includes(".") || _cpf.includes("-")) {
            _cpf = _cpf.replace(".", "");
            _cpf = _cpf.replace("-", "");
        }

        return _cpf;
    }

    function validarDados() {
        const cliente = {
            cpf: formatarCPF(cpf.current.value),
            nome: nome.current.value,
            sobrenome: sobrenome.current.value,
            usuario: usuario.current.value,
            cidade: cidade.current.value,
            uf: uf.current.value,
            cep: cep.current.value,
            endereco: endereco.current.value,
            numero: numero.current.value,
            bairro: bairro.current.value,
            telefone: telefone.current.value,
            email: email.current.value
        }
        if (cliente.cpf && cliente.nome && cliente.sobrenome && cliente.usuario && cliente.cidade && cliente.uf && cliente.cep && cliente.endereco && cliente.numero && cliente.bairro && cliente.telefone && cliente.email)
            return cliente;
        else
            return undefined;
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const cliente = validarDados();
            if (cliente) {
                setStatus(STATUS.ocioso);
                cadastrarCliente(cliente);
                setStatus(STATUS.sucesso);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    useEffect(() => {
        prepararTela(props.cliente);
        buscarCliente();
    }, []);

    if (status == STATUS.sucesso) {
        return (
            <Container>
                <Row className="mt-3 mb-3 border d-flex text-center">
                    <h2>Cadastro de Cliente</h2>
                </Row>
                <Row className="mt-3 p-2 border">
                    <Row>
                        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        id="cpf"
                                        name="cpf"
                                        disabled={(props.modoEdicao) ? "disabled" : ""}
                                        required
                                        type="text"
                                        placeHolder="CPF sem pontos e traços"
                                        ref={cpf}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe o CPF!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Primeiro nome</Form.Label>
                                    <Form.Control
                                        id="nome"
                                        name="nome"
                                        required
                                        type="text"
                                        placeHolder="Primeiro nome"
                                        ref={nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe o nome do cliente!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Sobrenome</Form.Label>
                                    <Form.Control
                                        id="sobrenome"
                                        name="sobrenome"
                                        required
                                        type="text"
                                        placeHolder="Sobrenome"
                                        ref={sobrenome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe  sobrenome!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Usuário</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">USER</InputGroup.Text>
                                        <Form.Control
                                            id="usuario"
                                            name="usuario"
                                            type="text"
                                            placeHolder="Usuário"
                                            required
                                            ref={usuario}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, informe o usuário.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control
                                        id="cidade"
                                        name="cidade"
                                        type="text"
                                        placeHolder="Cidade"
                                        required
                                        ref={cidade}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe a cidade.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="uf"
                                        name="uf"
                                        placeHolder="UF"
                                        required
                                        ref={uf}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe a unidade federativa.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="cep"
                                        name="cep"
                                        placeHolder="CEP"
                                        required
                                        ref={cep}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe CEP válido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="endereco"
                                        name="endereco"
                                        placeHolder="Endereço"
                                        required
                                        ref={endereco}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe o endereço.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Nº</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        placeHolder="Número"
                                        required
                                        ref={numero}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe número válido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>BAIRRO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        placeHolder="Bairro"
                                        required
                                        ref={bairro}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe um Bairro válido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="telefone"
                                        name="telefone"
                                        placeHolder="Telefone"
                                        required
                                        ref={telefone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe um número de telefone válido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeHolder="E-mail"
                                        required
                                        ref={email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe um endereço de e-mail.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    label="Aceito os termos e condições"
                                    feedback="Você deve aceitar as termos e condições."
                                    feedbackType="Inválido"
                                />
                            </Form.Group>
                        













                            {/* inicio complemento atv 1 fullstack2 */}
                            {/* <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>selecione o cliente:</Form.Label>
                                        <BarraBusca placeHolder={'Informe o nome do cliente'}
                                            //antes de passar esses dados, fazer uma busca de dados de clientes no backend e passar para o campo busca

                                            dados={formValido}
                                            campoChave={"cpf"}
                                            campoBusca={"nome"}
                                            // funcaoSelecao={()=>()}
                                            funcaoSelecao={setClienteSelecionado}
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
            <TelaErro mensagem="Não foi possível recuperar os dados dos clientes. Entre em contato com o administrador do sistema" />
        );
    }
}