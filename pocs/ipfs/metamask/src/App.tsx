import React, { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

function App() {
  // Cria uma referência para o elemento da tela
  const screenRef = useRef<HTMLDivElement>(null);

  // Cria um estado para armazenar o buffer
  const [buffer, setBuffer] = useState<ArrayBuffer>();

  // Cria um efeito para atualizar o buffer quando a tela mudar
  useEffect(() => {
    // Verifica se a referência é válida
    if (screenRef.current) {
      // Obtém o conteúdo HTML da tela
      const html = screenRef.current.innerHTML;

      // Converte o HTML para um ArrayBuffer usando um Blob
      const blob = new Blob([html], { type: "text/html" });
      const reader = new FileReader();
      reader.onload = () => {
        // Obtém o ArrayBuffer do Blob
        const buffer = reader.result as ArrayBuffer;

        // Atualiza o estado com o novo buffer
        setBuffer(buffer);
      };
      reader.readAsArrayBuffer(blob);
    }
  }, [screenRef.current]);

  // Cria uma função para copiar o conteúdo da tela para o PDF
  const copyToPDF = () => {
    // Verifica se o buffer é válido
    if (buffer) {
      // Cria um elemento <a> para baixar o PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(
        new Blob([buffer], { type: "application/pdf" })
      );
      link.download = "screen.pdf";
      link.click();
    }
  };

  return (
    <div className="App">
      <div ref={screenRef}>
        <h1>Olá, mundo!</h1>
        <p>Este é um exemplo de React + TypeScript.</p>
      </div>
      <button onClick={copyToPDF}>Copiar</button>
      <Document file={buffer}>
        <Page>
          <h1>Olá, mundo!</h1>
          <p>Este é um exemplo de React + TypeScript.</p>
        </Page>
      </Document>
    </div>
  );
}

export default App;
