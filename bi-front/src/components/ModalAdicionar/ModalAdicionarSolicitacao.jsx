import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import { useAddSolicitacoes } from "../../services/userSolicitacoesService";
import { useUserData } from "../../services/authService";
import { useForm } from "react-hook-form";

export default function ModaAdicionar() {
  const { mutate: adicionar } = useAddSolicitacoes();
  const { data } = useUserData();
  const { setModalAdicionarSolicitacao } = useContext(ModalContext);
  const modalOverlay = useRef();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  // Quando o usuário seleciona uma imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file); // Atualiza o React Hook Form
      setPreview(URL.createObjectURL(file)); // Cria uma prévia da imagem
    }
  };

  const handlePublicar = (dataForm) => {
    adicionar({
      title: dataForm.title,
      category: dataForm.category,
      urgency: dataForm.urgency,
      description: dataForm.description,
      ong_Id: data?.userData.ngo.id,
      ong_Nome: data?.userData.ngo.name,
      ong_Email: dataForm.ong_Email,
      ong_Phone: dataForm.ong_Phone,
      expirationDuration: dataForm.expirationDuration,
    });
    setModalAdicionarSolicitacao(false);
  };

  const validate = async () => {
    const isValid = await trigger();
    // Verifica se algum campo obrigatório não está preenchido
    const requiredFields = [
      "title",
      "category",
      "urgency",
      "description",
      "ong_Email",
      "ong_Phone",
      "expirationDuration",
    ];

    const values = getValues();

    const missingFields = requiredFields.filter((field) => !values[field]);

    // Se algum campo obrigatório estiver faltando, exibe o toast
    if (missingFields.length > 0) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    // Validação da descrição
    if (values.description.length < 50) {
      toast.error("A descrição deve ter pelo menos 5 a 15 palavras");
    }
    // Validação do telefone (acessando o valor diretamente)
    if (!/^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/.test(values.ong_Phone)) {
      toast.error("Telefone inválido! Exemplo: (99) 99999-9999");
    }
    // Verifica se o e-mail é válido
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.ong_Email)) {
      toast.error("E-mail inválido!");
    }

    // Validação do nome
    if (values.title.length < 5) {
      toast.error("O título deve ter pelo menos 5 caracteres");
    }

    return isValid;
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target &&
          setModalAdicionarSolicitacao(false);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-11 flex w-full max-w-[1120px] items-start gap-6 rounded bg-white p-8">
        <span className="flex flex-col gap-1">
          <p className="text-[14px] opacity-60">Imagem</p>
          <div
            className={`relative flex h-[350px] w-[350px] cursor-pointer items-center justify-center rounded ${errors.image ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
            onClick={() => fileInputRef.current.click()}
          >
            {preview && (
              <img
                src={preview}
                alt="Prévia da imagem"
                className="h-full w-full rounded object-cover"
              />
            )}
            {!preview && (
              <p className="px-4 text-center text-[#8c8a8a]">
                Adicione uma imagem relacionada à sua publicação
              </p>
            )}
            <img
              src="/edit.svg"
              alt="adicionar"
              className="absolute right-2 bottom-2 h-10 w-10 overflow-visible rounded-full bg-[#ababab] p-2 opacity-80"
            />
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Imagem é obrigatório",
              })}
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-[10px]">
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Titulo</p>
            <input
              type="text"
              placeholder="Informe um título breve e claro..."
              className={`w-[269px] rounded bg-[#eaeaea] p-2 ${errors.title ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
              {...register("title", {
                required: "Título é obrigatório",
                minLength: {
                  value: 5, // Mínimo de 5 caracteres
                  message: "O título deve ter pelo menos 5 caracteres",
                },
              })}
            />
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Categoria</p>
            <select
              className={`h-10 w-[163px] rounded border-2 p-1 ${errors.category ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
              {...register("category", { required: "Categoria é obrigatório" })}
            >
              <option value="" disabled={true} selected={true}>
                Selecionar
              </option>
              <option value="ELETRODOMESTICOS_E_MOVEIS">
                Eletrodomésticos e Móveis
              </option>
              <option value="UTENSILIOS_GERAIS">Utensílios Gerais</option>
              <option value="ROUPAS_E_CALCADOS">Roupas e Calçados</option>
              <option value="SAUDE_E_HIGIENE">Saúde e Higiene</option>
              <option value="MATERIAIS_EDUCATIVOS_E_CULTURAIS">
                Materiais Educativos e Culturais
              </option>
              <option value="ITENS_DE_INCLUSAO_E_MOBILIDADE">
                Itens de Inclusão e Mobilidade
              </option>
              <option value="ELETRONICOS">Eletrônicos</option>
              <option value="ITENS_PET">Itens para Pets</option>
              <option value="OUTROS">Outros</option>
            </select>
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Urgência</p>
            <select
              className={`h-10 w-[163px] rounded border-2 p-1 ${errors.urgency ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
              {...register("urgency", { required: true })}
            >
              <option value="" disabled={true} selected={true}>
                Selecionar
              </option>
              <option value="HIGH">Alta</option>
              <option value="MEDIUM">Média</option>
              <option value="LOW">Baixa</option>
            </select>
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">E-mail para contato</p>
            <input
              type="text"
              placeholder="exemplo@email.com"
              className={`w-[269px] rounded p-2 ${errors.ong_Email ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
              {...register("ong_Email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "E-mail inválido",
                },
              })}
            />
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Número para contato</p>
            <input
              type="tel"
              placeholder="99 99999-9999"
              className={`w-[163px] rounded p-2 ${errors.ong_Phone ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
              {...register("ong_Phone", {
                required: "Número de telefone é obrigatório",
                pattern: {
                  value: /^\d{2} \d{4,5}-\d{4}$/,
                  message: "Número de telefone inválido",
                },
              })}
            />
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Tempo de publicação</p>
            <select
              className={`h-10 w-[163px] rounded border-2 p-1 ${errors.expirationDuration ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
              {...register("expirationDuration", { required: true })}
            >
              <option value="" disabled={true} selected={true}>
                Selecionar
              </option>
              <option value="7 dias">7 dias</option>
              <option value="2 semanas">14 dias</option>
              <option value="4 semanas">30 dias</option>
              <option value="12 semanas">90 dias</option>
            </select>
          </span>
          <span className="flex w-full flex-col gap-1">
            <p className="text-[14px] opacity-60">Descrição</p>
            <textarea
              rows="5"
              type="text"
              placeholder="Informe uma descrição completa e clara..."
              className={`w-full resize-none rounded p-2 ${errors.description ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
              {...register("description", {
                required: "Descrição é obrigatória",
                minLength: {
                  value: 50, // Mínimo de 50 caracteres
                  message: "A descrição deve ter pelo menos 5 a 15 palavras",
                },
              })}
            />
          </span>
          <span className="absolute right-8 bottom-8 flex items-start gap-5">
            <Button
              className="h-12 w-[180px] cursor-pointer rounded border-2 border-red-400 text-red-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 hover:bg-red-100"
              onClick={() => setModalAdicionarSolicitacao(false)}
            >
              Cancelar
            </Button>
            <Button
              addClassName="w-[180px]"
              onClick={async () => {
                const isValid = await validate();
                if (isValid) {
                  handleSubmit(handlePublicar)();
                }
              }}
            >
              Publicar
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
