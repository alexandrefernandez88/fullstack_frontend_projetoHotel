import { Container } from "react-bootstrap";
import React from "react";
import '../styles/style.css';


export default function Cabecalho(props){
    return(
        <div class="Cabecalho">
            <h1 class="cabtitle">
                {props.titulo || "Sistema de Gerenciamento do Hotel"}
            </h1>
        </div>
    );
}