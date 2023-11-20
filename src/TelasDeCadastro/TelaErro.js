//import Pagina from "../templates/Pagina";
import Alert from 'react-bootstrap/Alert';

export default function TelaErro(props) {
    return (
        <div className="text-center">
            <Alert variant={"danger"}>
                {props.mensagem}
            </Alert>
        </div>
    );
}