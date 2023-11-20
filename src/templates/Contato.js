import { Container } from "react-bootstrap";
import React from "react";


export default function Contato(props){
     return(
         <div>
         <h1>
                     {props.texto || "Contato"}
         </h1>
         </div>
         );
}