import { useState } from "react";
import textContent from "../../locales/en";

const Faqs = () => {
  const [openQuestion, setOpenQuestion] = useState<{ section: string; index: number } | null>(null);

  const toggleQuestion = (section: string, index: number) => {
    setOpenQuestion((prev) =>
      prev && prev.section === section && prev.index === index ? null : { section, index }
    );
  };

  const renderQuestions = (questions: any[], sectionTitle: string, sectionKey: string) => {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">{sectionTitle}</h2>
        {questions.map((qa, index) => (
          <div key={index} className="mb-2 border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(sectionKey, index)}
              className="flex justify-between w-full p-4 text-left focus:outline-none"
            >
              <h3 className="text-xl font-medium text-gray-800">{qa.question}</h3>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  openQuestion?.section === sectionKey && openQuestion?.index === index
                    ? "rotate-180"
                    : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openQuestion?.section === sectionKey && openQuestion?.index === index && (
              <div className="p-4 bg-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed">{qa.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{textContent.faqs_title}</h1>

      {renderQuestions(
        textContent.faqs_ordering_questions,
        textContent.faqs_ordering_title,
        "ordering"
      )}
      {renderQuestions(
        textContent.faqs_shipping_questions,
        textContent.faqs_shipping_title,
        "shipping"
      )}
      {renderQuestions(
        textContent.faqs_returns_questions,
        textContent.faqs_returns_title,
        "returns"
      )}
      {renderQuestions(
        textContent.faqs_other_questions,
        textContent.faqs_other_title,
        "other"
      )}
    </div>
  );
};

export default Faqs;
