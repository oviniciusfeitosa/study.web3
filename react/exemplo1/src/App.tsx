// import React, { useState } from "react";
// import { ethers } from "ethers";
// import PessoaContract from "./PessoaContract.json";

// const App = () => {
//   const [nome, setNome] = useState("");
//   const [tipo, setTipo] = useState(0);
//   const [enderecoCarteira, setEnderecoCarteira] = useState("");
//   const [pessoa, setPessoa] = useState({
//     nome: "",
//     status: false,
//     tipo: 0,
//     dataCadastro: 0,
//     dataModificacao: 0,
//     numeroVersao: 0,
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (name === "nome") {
//       setNome(value);
//     } else if (name === "tipo") {
//       setTipo(Number(value));
//     }
//   };

//   const cadastrarPessoa = async () => {
//     const provider = new ethers.providers.Web3Provider(
//       (window as any).ethereum
//     );
//     const signer = provider.getSigner();
//     const contrato = new ethers.Contract(
//       PessoaContract.networks[1337].address,
//       PessoaContract.abi,
//       signer
//     );

//     try {
//       await contrato.cadastrar(nome, tipo);
//       alert("Pessoa cadastrada com sucesso!");
//     } catch (err) {
//       console.log(err);
//       alert("Ocorreu um erro ao cadastrar a pessoa.");
//     }
//   };

//   const consultarPessoa = async () => {
//     const provider = new ethers.providers.Web3Provider(
//       (window as any).ethereum
//     );
//     const contrato = new ethers.Contract(
//       PessoaContract.networks[1337].address,
//       PessoaContract.abi,
//       provider
//     );

//     try {
//       const retorno = await contrato.consultar({ from: enderecoCarteira });
//       setPessoa({
//         nome: retorno[0],
//         status: retorno[1],
//         tipo: retorno[2],
//         dataCadastro: retorno[3],
//         dataModificacao: retorno[4],
//         numeroVersao: retorno[5],
//       });
//     } catch (err) {
//       console.log(err);
//       alert("Ocorreu um erro ao consultar a pessoa.");
//     }
//   };

//   return (
//     <div className="App">
//       <div>
//         <h3>Cadastrar Pessoa</h3>
//         <div>
//           <label>Nome:</label>
//           <input
//             type="text"
//             name="nome"
//             value={nome}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Tipo:</label>
//           <select
//             name="tipo"
//             value={tipo}
//             onChange={(event) => {
//               setTipo(Number(event.target.value));
//             }}
//           >
//             <option value="1">Pessoa Física</option>
//             <option value="2">Pessoa Jurídica</option>
//           </select>
//         </div>
//         <button onClick={cadastrarPessoa}>Cadastrar</button>
//       </div>
//       <hr />
//       <div>
//         <h3>Consultar Pessoa</h3>
//         <button onClick={consultarPessoa}>Consultar</button>
//         {pessoa.nome !== "" && (
//           <div>
//             <h3>Dados da pessoa</h3>
//             <p>
//               <strong>Nome:</strong> {pessoa.nome}
//             </p>
//             <p>
//               <strong>Status:</strong> {pessoa.status ? "Ativa" : "Inativa"}
//             </p>
//             <p>
//               <strong>Tipo:</strong>{" "}
//               {pessoa.tipo === 1 ? "Pessoa Física" : "Pessoa Jurídica"}
//             </p>
//             <p>
//               <strong>Data de cadastro:</strong>{" "}
//               {new Date(pessoa.dataCadastro * 1000).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Data da última modificação:</strong>{" "}
//               {new Date(pessoa.dataModificacao * 1000).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Número da versão:</strong> {pessoa.numeroVersao}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// // Código gerado pelo Bing
// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import { Contract } from "web3-eth-contract";
// import { AbiItem } from "web3-utils";

// import PessoaContract from "./PessoaContractABI.json";

// const contratoEndereco = "0xeec918d74c746167564401103096D45BbD494B74"; // defina o endereço do seu contrato aqui

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Button, Input, Form } from "antd";

import abi from "./PessoaContractABI.json";

const contractAddress = "0xdE5491f774F0Cb009ABcEA7326342E105dbb1B2E"; // change this to the actual address

const App = () => {
  // Define the state variables
  const [web3, setWeb3] = useState<Web3 | null>(null); // web3 instance
  const [account, setAccount] = useState<string>(""); // user account
  const [contract, setContract] = useState<any>(null); // contract instance
  const [loading, setLoading] = useState<boolean>(false); // loading indicator
  const [pessoa, setPessoa] = useState({
    nome: "",
    status: false,
    tipo: 0,
    dataCadastro: 0,
    dataModificacao: 0,
    numeroVersao: 0,
  });

  // Define the useEffect hook that runs once when the component mounts
  useEffect(() => {
    // Define an async function that initializes web3 and contract
    const initWeb3 = async () => {
      // Check if Metamask is installed
      if ((window as any).ethereum) {
        // Create a new web3 instance using Metamask provider
        const web3 = new Web3((window as any).ethereum);
        // Request access to user accounts
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the first account
        const account = (await web3.eth.getAccounts())[0];
        // Create a new contract instance using web3, abi and address
        const contract = new web3.eth.Contract(
          abi as AbiItem[],
          contractAddress
        );
        // Set the state variables
        setWeb3(web3);
        setAccount(account);
        setContract(contract);
        
      } else {
        // Alert the user to install Metamask
        alert("Please install Metamask to use this app");
      }
    };

    // Call the initWeb3 function
    initWeb3();
  }, []);

  useEffect(() =>{
    handleConsultar()
  },[account])

  // Define a function that handles the form submission for cadastrar
  const handleCadastrar = async (values: any) => {
    // Get the values from the form
    const { nome, tipo } = values;
    // Set the loading indicator to true
    setLoading(true);
    try {
      await contract.methods.cadastrar(nome, tipo).send({ from: account });
      alert("Pessoa cadastrada com sucesso");
      form.resetFields();
    } catch (error) {
      alert((error as any).message);
    }
    setLoading(false);
  };

  const handleConsultar = async () => {
    setLoading(true);
    try {
      console.log("account", account);
      const retorno = await contract.methods
        .consultar()
        .call({ from: account });
      console.log(pessoa);

      // setPessoa(pessoa);
      setPessoa({
        nome: retorno[0],
        status: retorno[1],
        tipo: retorno[2],
        dataCadastro: retorno[3],
        dataModificacao: retorno[4],
        numeroVersao: retorno[5],
      });
    } catch (error) {
      // alert((error as any).message);
      console.log((error as any).message);
    }
    setLoading(false);
  };

  const handleInativar = async (values: any) => {
    setLoading(true);
    try {
      await contract.methods.inativar().send({ from: account });
      alert("Pessoa inativada com sucesso");
      form.resetFields();
      handleConsultar() 
    } catch (error) {
      alert((error as any).message);
    }
    setLoading(false);
  };

  const handleAtivar = async (values: any) => {
    setLoading(true);
    try {
      await contract.methods.ativar().send({ from: account });
      alert("Pessoa inativada com sucesso");
      form.resetFields();
      handleConsultar()
    } catch (error) {
      alert((error as any).message);
    }
    setLoading(false);
  };

  const [form] = Form.useForm();

  return (
    <div className="App">
      <h1>Pessoa Smart Contract</h1>
      <h2>Account: {account}</h2>
      {pessoa.nome === "" && (
      <Form form={form} onFinish={handleCadastrar}>
        <h3>Cadastrar Pessoa</h3>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tipo" label="Tipo" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
      )}
      {/* <Button type="primary" onClick={handleConsultar} loading={loading}>
        Consultar
      </Button> */}
      {pessoa.status === true ? (
        <Button type="primary" onClick={handleInativar} loading={loading}>
        Inativar
      </Button>
      ) : (
      <Button type="primary" onClick={handleAtivar} loading={loading}>
        Ativar
      </Button>
      )}
      <div>
        {pessoa.nome !== "" && (
          <div>
            <h3>Dados da pessoa</h3>
            <p>
              <strong>Nome:</strong> {pessoa.nome}
            </p>
            <p>
              <strong>Status:</strong> {pessoa.status ? "Ativa" : "Inativa"}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {pessoa.tipo === 1 ? "Pessoa Física" : "Pessoa Jurídica"}
            </p>
            <p>
              <strong>Data de cadastro:</strong>{" "}
              {new Date(pessoa.dataCadastro * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Data da última modificação:</strong>{" "}
              {new Date(pessoa.dataModificacao * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Número da versão:</strong> {pessoa.numeroVersao}
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default App;
