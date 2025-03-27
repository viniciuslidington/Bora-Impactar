import PropTypes from "prop-types";
import { useState } from "react";
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

  return (
    <>
      <div className="borde flex flex-col rounded-sm border-2 border-[#9c9c9c]">
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

        {showUrgency && (
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
