import { Container } from "react-bootstrap";
import TelaDeCadastroDeCliente from "./TelasDeCadastro/TelaDeCadastroDeCliente.js";
import TelaCadastroDeProduto from "./TelasDeCadastro/TelaDeCadastroDeProduto.js";
import TelaCadastroDeVenda from "./TelasDeCadastro/TelaDeCadastroDeVenda.js";
import TelaMenu from "./TelasDeCadastro/TelaMenu.js";
import Tela404 from "./TelasDeCadastro/Tela404.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Container w-100>
      <BrowserRouter>
        <Routes>
          <Route path="/cliente" element={<TelaDeCadastroDeCliente/>}/>
          <Route path="/produto" element={<TelaCadastroDeProduto/>}/>
          <Route path="/venda" element={<TelaCadastroDeVenda/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;


        // <div className="App">
        // <FormCadVenda/>
        // </div>
// import TelaDeCadastroDeTipoQuarto from "./TelasDeCadastro/TelaDeCadastroDeTipoQuarto.js";
// import TelaDeCadastroDeCamareiro from "./TelasDeCadastro/TelaDeCadastroDeCamareiro.js";
// import TelaDeCadastroDeAtvCamareiro from "./TelasDeCadastro/TelaDeCadastroDeAtvCamareiro.js";
// import TelaDeCadastroDeFuncionario from "./TelasDeCadastro/TelaDeCadastroDeFuncionario.js";
// import TelaCadastroDeTipoQuarto from "./TelasDeCadastro/TelaDeCadastroDeTipoQuarto.js";

          // {/* <Route path="/cadastroTiposQuarto" element={<TelaDeCadastroDeTipoQuarto/>}/>
          // <Route path="/cadastroCamareiro" element={<TelaDeCadastroDeCamareiro/>}/>
          // <Route path="/cadastroAtividadeCamareiro" element={<TelaDeCadastroDeAtvCamareiro/>}/>
          // <Route path="/funcionario" element={<TelaDeCadastroDeFuncionario/>}/> */}
          // {/* <Route path="/tipoquarto" element={<TelaCadastroDeTipoQuarto/>}/> */}
          // {/* <Route path="/" element={<FormCadVenda/>}/>           */}
