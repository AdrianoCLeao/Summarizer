import { useEffect, useState } from "react";

const useSummarize = (sourceText: string) => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const handleSummarize = async () => {
      try {
        const textToSend = `Summarize this text: ${sourceText}`;

        const response = await fetch("http://localhost:8080/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textToSend }),
        });

        if (!response.ok) {
          throw new Error("Erro ao chamar a API de resumo");
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error("Erro ao chamar a API de resumo:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleSummarize();
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText]);

  return summary;
};

export default useSummarize;
