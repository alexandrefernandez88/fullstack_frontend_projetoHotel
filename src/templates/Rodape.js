import { Container } from "react-bootstrap";
// import React from "react";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Rodape(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <footer class="text-center text-lg-start bg-white text-muted">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div class="me-5 d-none d-lg-block">
                    <span>Links Úteis</span>
                    </div>

                    <div>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <i class="fab fa-github"></i>
                    </a>
                    </div>
                </section>

                <section class="">
                    <div class="container text-center text-md-start mt-5">
                    <div class="row mt-3">
                        <div class="col-md-3 col-lg-4 col-xl-5 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3 text-secondary"></i>Dynamus Softwares
                        </h6>
                        <p>
                            Alexandre Fernandez - RA10482120706
                        </p>
                        </div>

                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                        <h6 class="text-uppercase fw-bold mb-4">Contato</h6>
                        <i class="fas fa-home me-3 text-secondary"></i>
                        <p>
                            Rod. Raposo Tavares, km 572 - Limoneiro <br/>
                            Presidente Prudente, SP 19067-175<br/>
                        </p>
                        <p>
                            <i class="fas fa-envelope me-3 text-secondary"></i>
                            unoeste@unoeste.br
                        </p>
                        <p><i class="fas fa-phone me-3 text-secondary"></i> + +55 18 3229-2000</p>
                        <Button variant="primary" onClick={handleShow}>
                     Entre em contato com o suporte!
                 </Button>
                 <Modal show={show} onHide={handleClose}>
                     <Modal.Header closeButton>
                     <Modal.Title>Portal de Ajuda</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                     <Form>
                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>Usuário</Form.Label>
                         <Form.Control
                             type="usuario"
                             placeholder="usuario@123"
                             autoFocus
                         />
                         </Form.Group>
                        <Form.Group
                         className="mb-3"
                         controlId="exampleForm.ControlTextarea1"
                         >
                         <Form.Label>Descreva a ocorrência</Form.Label>
                         <Form.Control as="textarea" rows={3} 
                         placeholder="Descreva um breve resumo para auxiliar no seu atendimento..."
                                                     />
                        </Form.Group>
                     </Form>
                     </Modal.Body>
                     <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                         Voltar
                     </Button>
                     <Button variant="primary" onClick={handleClose}>
                         Abrir chamado
                     </Button>
                     </Modal.Footer>
                 </Modal>
                        </div>
                    </div>
                    </div>
                </section>

        
            <h4>
                {props.titulo}
            </h4>
        </footer>
    );
}