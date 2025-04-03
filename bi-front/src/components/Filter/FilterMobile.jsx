import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useCleanFilter, useQueryUpdate } from "../../utils/queryUpdate";
import { formatarString2 } from "../../utils/formatString";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";

const categorias = [
  "Eletrodomésticos e Móveis",
  "Utensílios Gerais",
  "Roupas e Calçados",
  "Saúde e Higiene",
  "Materiais Educativos e Culturais",
  "Itens de Inclusão e Mobilidade",
  "Eletrônicos",
  "Itens Pet",
  "Outros",
];

export default function Filter({ showUrgency = false }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const urgency = query.get("urgency");

  const updateQuery = useQueryUpdate();
  const cleanFilter = useCleanFilter();

  const [selectedUrgency, setSelectedUrgency] = useState(urgency);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectUrgency = (value) => {
    setSelectedUrgency(value);
    updateQuery("urgency", value);
  };
  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    updateQuery("category", value ? formatarString2(value) : null);
  };
  const handleCleanFilter = () => {
    setSelectedCategory(null);
    setSelectedUrgency(null);
    cleanFilter();
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // Alterna entre true e false
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.search]);

  return (
    <>
      <div className="flex flex-col rounded-sm border-2 border-[#9c9c9c]">
        <button
          className={`flex h-12 items-center justify-between ${isOpen && "border-b-2 border-[#9c9c9c]"} px-2`}
          onClick={() => handleToggle()}
        >
          Filtros{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-6 w-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`flex flex-col gap-2 ${showUrgency && "border-b-2"} border-[#ADADAD] p-4`}
          >
            <h3 className="text-[18px] font-bold opacity-95">Categorias</h3>
            <ul className="flex flex-col gap-2 opacity-80">
              <li
                className="cursor-pointer font-semibold"
                onClick={() => {
                  handleSelectCategory(null);
                }}
              >
                Todas as categorias
              </li>
              {categorias.map((c) => {
                return (
                  <li
                    className="cursor-pointer"
                    key={c}
                    onClick={() => {
                      handleSelectCategory(c);
                    }}
                  >
                    {c}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {isOpen && showUrgency && (
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-[18px] font-bold opacity-95">
              Urgência de solicitação
            </h3>
            <ul className="flex flex-col gap-1 opacity-80">
              <li
                className="cursor-pointer font-bold"
                onClick={() => {
                  setSelectedUrgency(null); // Reseta a seleção
                  updateQuery("urgency", null);
                }}
              >
                Todas as Solicitações
              </li>
              <li>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="HIGH"
                    className="form-radio text-red-500"
                    checked={selectedUrgency === "HIGH"}
                    onChange={() => handleSelectUrgency("HIGH")}
                  />
                  <span className="ml-2">Alta</span>
                </label>
              </li>
              <li>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="MEDIUM"
                    className="form-radio text-yellow-500"
                    checked={selectedUrgency === "MEDIUM"}
                    onChange={() => handleSelectUrgency("MEDIUM")}
                  />
                  <span className="ml-2">Média</span>
                </label>
              </li>
              <li>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="LOW"
                    className="form-radio text-green-500"
                    checked={selectedUrgency === "LOW"}
                    onChange={() => handleSelectUrgency("LOW")}
                  />
                  <span className="ml-2">Baixa</span>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      {
        <Button
          disabled={!selectedCategory && !selectedUrgency}
          addClassName="-mt-4 disabled:cursor-auto disabled:bg-[#6981cc] text-[14px]"
          onClick={() => handleCleanFilter()}
        >
          Limpar Filtros
        </Button>
      }
    </>
  );
}

Filter.propTypes = {
  showUrgency: PropTypes.bool.isRequired,
};
