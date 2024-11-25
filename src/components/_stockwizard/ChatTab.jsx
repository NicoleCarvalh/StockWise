import { useState, useEffect, useRef, useContext, Fragment } from "react";
import { SendHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthContext } from "@/auth/AuthProvider";

function ChatTab() {
  const { credentials } = useContext(AuthContext);

  const [message, setMessage] = useState(""); // Armazenar pergunta
  const [chatMessages, setChatMessages] = useState([]); // Armazenar mensagens
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const companyId = credentials?.companyData?.id;

  const renderFormattedMessage = (text) => {
    if (typeof text !== "string") {
      // Se for um objeto, processe as propriedades
      if (typeof text === "object" && text !== null) {
        // Aqui você pode tratar a renderização de objetos com as propriedades title, link, snippet
        return (
          <>
            {text.title && <h3>{text.title}</h3>}
            {text.link && (
              <a
                href={text.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-words"
              >
                {text.link}
              </a>
            )}
            {text.snippet && <p>{text.snippet}</p>}
            </>
        );
      }
  
      // Se o tipo for outro objeto que você não espera, pode renderizar um erro ou nada
      return <p>Formato de mensagem desconhecido</p>;
    }
  
    // Caso seja uma string, trate como antes
    const urlRegex = /(https?:\/\/[^\s:]+[^\s.])/;
    const parts = text.split(urlRegex);
  
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        const trimmedLink = part.slice(0, -1);
  
        return (
          <a
            key={index}
            href={trimmedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-words"
          >
            {trimmedLink}
          </a>
        );
      }
  
      return part;
    });
  };

  // Atalho
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "w") {
        setIsChatOpen((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Carregar mensagens anteriores (GET)
  const loadMessages = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?company_id=${companyId}`
      );
      const data = await response.json();

      // Ordenar
      const sortedMessages = data.responses.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      // Formatar
      const formattedMessages = sortedMessages.flatMap((response) => [
        { text: response.question, isUser: true },
        { text: response.answer, isUser: false },
      ]);

      setChatMessages(formattedMessages);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  // Envio da pergunta (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentMessage = message;
  
    // Adicionar pergunta do usuário localmente
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: currentMessage, isUser: true },
    ]);
    setMessage("");
  
    setLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentMessage,
          company_id: companyId,
        }),
      });
  
      const data = await response.json();
  
      // Lógica para mensagens de "pesquise"
      const isSearchRequest = currentMessage.toLowerCase().includes("pesquise");
      let formattedResponse;
  
      if (isSearchRequest && Array.isArray(data.response)) {
        // Supondo que a API retorna um array de resultados de pesquisa
        formattedResponse = data.response.map((item) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        }));
      } else {
        // Resposta comum
        formattedResponse = data.response;
      }
  
      // Adicionar resposta localmente
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: formattedResponse, isUser: false },
      ]);
    } catch (error) {
      console.error("Erro ao enviar a pergunta:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: "Erro ao obter resposta. Tente novamente mais tarde.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar  mensagens
  useEffect(() => {
    loadMessages();
  }, []);

  // Scroll automático
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  return (
    <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
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

        {/* {chatMessages.length === 0 && !loading && (
          <div className="text-center text-gray-400">
            Nenhuma conversa ainda. Comece enviando uma pergunta!
          </div>
        )} */}

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
        >
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`font-medium p-3 rounded-lg text-sm ${
                msg.isUser
                  ? "bg-green-200 text-gray-800 w-[92%] justify-self-end"
                  : "bg-gray-200 text-gray-800 max-w-[92%] text-pretty"
              }`}
            >
              {renderFormattedMessage(msg.text)}
            </div>
          ))}
          {loading && (
            <div className="text-center">
              <span className="loader animate-spin inline-block h-4 w-4 border-2 border-gray-300 border-t-green-600 rounded-full"></span>
              <p className="text-gray-500">Carregando...</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-100 border-t">
          <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
