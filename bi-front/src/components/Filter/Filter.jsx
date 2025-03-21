import { useState } from "react";
import { useQueryUpdate } from "../../utils/queryUpdate";
import { formatarString2 } from "../../utils/formatString";

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

export default function Filter() {
  const updateQuery = useQueryUpdate();
  const [selectedUrgency, setSelectedUrgency] = useState(null);

  const handleSelect = (value) => {
    setSelectedUrgency(value);
    updateQuery("urgency", value);
  };

  return (
    <div className="borde flex flex-col rounded-sm border-2 border-[#9c9c9c]">
      <div className="flex flex-col gap-2 border-b-2 border-[#ADADAD] p-4">
        <h3 className="text-[18px] font-bold opacity-95">Categorias</h3>
        <ul className="flex flex-col gap-2 opacity-80">
          <li
            className="cursor-pointer font-semibold"
            onClick={() => updateQuery("category")}
          >
            Todas as categorias
          </li>
          {categorias.map((c) => {
            return (
              <li
                className="cursor-pointer"
                key={c}
                onClick={() => updateQuery("category", formatarString2(c))}
              >
                {c}
              </li>
            );
          })}
        </ul>
      </div>
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
                onChange={() => handleSelect("HIGH")}
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
                onChange={() => handleSelect("MEDIUM")}
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
                onChange={() => handleSelect("LOW")}
              />
              <span className="ml-2">Baixa</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
