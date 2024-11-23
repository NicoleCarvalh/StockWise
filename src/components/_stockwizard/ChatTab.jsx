import { useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

function ChatTab() {
  const [message, setMessage] = useState(""); // Para armazenar a pergunta do usuário
  const [chatMessages, setChatMessages] = useState([]); // Para armazenar as mensagens no chat
  const [loading, setLoading] = useState(false); // Para controlar o carregamento da resposta
  const companyId = "123"; // Substitua com o ID da sua empresa ou obtenha dinamicamente

  // Função para carregar as mensagens anteriores (GET)
  const loadMessages = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?company_id=${companyId}`
      );
      const data = await response.json();

      // Armazenar as mensagens recebidas
      setChatMessages(
        data.responses
          .map((response) => ({
            text: response.question, // Pergunta
            isUser: true, // Mensagem do usuário
          }))
          .concat(
            data.responses.map((response) => ({
              text: response.answer, // Resposta
              isUser: false, // Resposta da API
            }))
          )
      );
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  // Função para lidar com o envio da pergunta (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adicionar a pergunta do usuário ao chat (do lado do usuário)
    setChatMessages([...chatMessages, { text: message, isUser: true }]);
    setLoading(true);

    try {
      // Enviar a pergunta para a API (substitua pela sua URL de API real)
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message, company_id: companyId }),
      });

      const data = await response.json();

      // Adicionar a resposta da API ao chat
      setChatMessages([
        ...chatMessages,
        { text: message, isUser: true }, // Mensagem do usuário
        { text: data.responses[0].answer, isUser: false }, // Resposta da API
      ]);
    } catch (error) {
      console.error("Erro ao enviar a pergunta:", error);
    } finally {
      setLoading(false); // Parar de carregar
      setMessage(""); // Limpar o campo de input
    }
  };

  // Carregar as mensagens ao montar o componente
  useEffect(() => {
    loadMessages(); // Chama a função para carregar mensagens anteriores
  }, []); // Executa uma vez ao carregar o componente

  return (
    <Sheet>
      <SheetTrigger
        className="fixed flex items-center gap-2 bottom-4 right-[2rem] text-[1rem] font-bold p-1 bg-black rounded-[5px] overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          width: "4rem",
          height: "3rem",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.width = "12rem")}
        onMouseLeave={(e) => (e.currentTarget.style.width = "4rem")}
      >
        <img
          src="/stockwizard_icon.svg"
          alt="StockWizard Chatbot"
          className="w-[4rem] h-[4rem]"
        />
        <span className="text-wise-hyper_white whitespace-nowrap transition-opacity duration-300">
          StockWizard
        </span>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-[100vh] montserrat font-bold bg-white shadow-lg rounded-md w-[600px]">
        <SheetHeader className="p-3 bg-wise-hyper_black border-b rounded-md">
          <h2 className="text-xl text-center font-bold text-wise-hyper_white">
            StockWizard
          </h2>
          <p className="text-center text-wise-hyper_white font-bold text-[13px] md:text-md lg:text-lg">
            O🧙‍♂️assistente que você precisa
          </p>
        </SheetHeader>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`font-medium p-3 rounded-lg text-sm ${
                msg.isUser
                  ? "bg-green-200 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500">Carregando...</div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-100 border-t">
          <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Atualiza o estado com o valor do input
              placeholder="Dica: use 'pesquise...' para resultados da web"
              className="flex-1 p-2 text-sm border font-medium rounded-lg outline-none focus:ring-2 focus:ring-wise-hyper_light_green"
            />
            <button
              type="submit"
              className="p-2 bg-wise-dark_green text-white rounded-lg hover:bg-wise-hyper_light_green transition"
            >
              <SendHorizontal />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ChatTab };
