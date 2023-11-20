import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho.js";
import Menu from "./Menu.js";
import Rodape from "./Rodape.js";

export default function Pagina(props) {
    return (
        <Container>
            <div>
                <Cabecalho titulo="SISTEMA DE GERENCIAMENTO DE HOTEL" />
                <div>
                    <Menu />
                    {props.children}
                    <Rodape texto="OBRIGADO POR UTILIZAR NOSSO SISTEMA." />
                </div>
            </div>
        </Container>
    )
}