import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import '../styles/style.css';


export default function Menu(props){
    return(
    <Navbar bg="light" expand="lg">
      <Container>
                <div class="Menu">
                  <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Home
                      </a>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                      {/* <NavLink exact to="/cadastroAtividadeCamareiro" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="columns">Atividade Camareiro</CDBSidebarMenuItem>
                        </NavLink>
                        
                        <NavLink exact to="/cadastroCamareiro" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="columns">Camareiro</CDBSidebarMenuItem>
                        </NavLink> */}
                        
                        <NavLink exact to="/cliente" activeClassName="activeClicked" text="Cliente">
                          <CDBSidebarMenuItem icon="user">Cliente</CDBSidebarMenuItem>
                        </NavLink>
                        
                        {/* <NavLink exact to="/funcionario" activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="user">Funcionário</CDBSidebarMenuItem>
                        </NavLink> */}
                        
                        <NavLink exact to="/produto" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="columns">Produto</CDBSidebarMenuItem>
                        </NavLink>

                        {/* <NavLink exact to="/tipoquarto" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="columns">Tipo de Quarto</CDBSidebarMenuItem>
                        </NavLink> */}

                        <NavLink exact to="/venda" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="columns">Venda</CDBSidebarMenuItem>
                        </NavLink>

                        {/* <NavLink to="" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="far fa-calendar-alt">Realizar Reserva</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="far fa-clock">Check In e Checkout</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="" disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="credit-card">Financeiro</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/" Disabled activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="chart-line">Relatórios</CDBSidebarMenuItem>
                        </NavLink> */}
                      </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          padding: '20px 5px',
                        }}
                      >
                        <strong>SGH Sistemas</strong>
                      </div>
                    </CDBSidebarFooter>
                  </CDBSidebar>
                </div>
        </Container>
    </Navbar>
    );
}