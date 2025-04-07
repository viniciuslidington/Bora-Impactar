import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import { useUserData } from "../../services/authService";
import { useForm } from "react-hook-form";
import { useAddRepasse } from "../../services/userRepasseService";
import ModalImage from "../ModalImage/ModalImage";
import ModalImageOnline from "../ModalImageOnline/ModalImageOnline";

export default function ModaAdicionar() {
  const { mutate: adicionar } = useAddRepasse();
  const { data } = useUserData();
  const {
    setModalAdicionarRepasse,
    setModalImage,
    modalImage,
    setModalImageOnline,
    modalImageOnline,
  } = useContext(ModalContext);
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
    setModalImage(false);
    setModalImageOnline(false);
  };

  const handlePublicar = (dataForm) => {
    const formData = new FormData();
    formData.append("title", dataForm.title);
    formData.append("category", dataForm.category);
    formData.append("description", dataForm.description);
    formData.append("ong_Id", data?.userData.ngo.id);
    formData.append("ong_Nome", data?.userData.ngo.name);
    formData.append("ong_Imagem", data?.userData.ngo.gallery_images_url[0]);
    formData.append("ong_Email", dataForm.ong_Email);
    formData.append("ong_Phone", dataForm.ong_Phone);
    formData.append("expirationDuration", dataForm.expirationDuration);

    // Se houver imagem no formulário
    if (dataForm.image) {
      formData.append("image", dataForm.image); // Acessa o arquivo corretamente
    }

    adicionar(formData);
    setModalAdicionarRepasse(false);
  };

  const validate = async () => {
    const isValid = await trigger();
    // Verifica se algum campo obrigatório não está preenchido
    const requiredFields = [
      "title",
      "category",
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
    if (values.description.length < 15) {
      toast.error("A descrição deve ter pelo menos 5 palavras");
    }
    // Validação do telefone (acessando o valor diretamente)
    if (!/^\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}$/.test(values.ong_Phone)) {
      toast.error("Telefone inválido! Exemplo: (99) 99999-9999");
    }
    // Verifica se o e-mail é válido
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.ong_Email)) {
      toast.error("E-mail inválido!");
    }
    // Validação do nome
    if (values.title.length < 5 || values.title.length > 90) {
      toast.error(
        values.title.length < 5
          ? "O título deve ter pelo menos 5 caracteres"
          : "O título não pode ter mais que 90 caracteres",
      );
    }

    return isValid;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
        onClick={(e) => {
          modalOverlay.current === e.target && setModalAdicionarRepasse(false);
        }}
        ref={modalOverlay}
      >
        <div className="relative z-11 flex max-h-[100vh] w-full max-w-[1120px] flex-col items-start gap-6 overflow-y-auto rounded bg-white p-8 lg:flex-row">
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Imagem</p>
            <div
              className={`relative flex aspect-square w-full cursor-pointer items-center justify-center rounded lg:h-[350px] lg:w-[350px] ${errors.image ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
              onClick={() => setModalImage(true)}
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
          <div className="flex flex-wrap gap-x-4 gap-y-[10px] lg:gap-x-6">
            <span className="flex w-full flex-col gap-1">
              <p className="text-[14px] opacity-60">Titulo</p>
              <input
                type="text"
                placeholder="Informe um título breve e claro..."
                className={`w-full rounded bg-[#eaeaea] p-2 lg:w-[269px] ${errors.title ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
                {...register("title", {
                  required: "Título é obrigatório",
                  minLength: {
                    value: 5, // Mínimo de 5 caracteres
                    message: "O título deve ter pelo menos 5 caracteres",
                  },
                  maxLength: {
                    value: 90,
                    message: "O título não pode ter mais que 90 caracteres",
                  },
                })}
              />
            </span>
            <span className="flex w-[calc(50%-8px)] flex-col gap-1 lg:w-auto">
              <p className="text-[14px] opacity-60">Categoria</p>
              <select
                className={`h-10 w-full rounded border-2 p-1 lg:w-[163px] ${errors.category ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
                {...register("category", {
                  required: "Categoria é obrigatório",
                })}
                defaultValue=""
              >
                <option value="" disabled={true}>
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
            <span className="flex w-[calc(50%-8px)] flex-col gap-1 lg:w-auto">
              <p className="text-[14px] opacity-60">Tempo de publicação</p>
              <select
                className={`h-10 w-full rounded border-2 p-1 lg:w-[163px] ${errors.expirationDuration ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
                {...register("expirationDuration", { required: true })}
                defaultValue=""
              >
                <option value="" disabled={true}>
                  Selecionar
                </option>
                <option value="7 dias">7 dias</option>
                <option value="2 semanas">14 dias</option>
                <option value="4 semanas">30 dias</option>
                <option value="12 semanas">90 dias</option>
              </select>
            </span>
            <span className="flex w-full flex-col gap-1 lg:w-auto">
              <p className="text-[14px] opacity-60">E-mail para contato</p>
              <input
                type="text"
                placeholder="exemplo@email.com"
                className={`w-full rounded p-2 lg:w-[269px] ${errors.ong_Email ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
                {...register("ong_Email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "E-mail inválido",
                  },
                })}
              />
            </span>
            <span className="flex w-[calc(50%-8px)] flex-col gap-1 lg:w-auto">
              <p className="text-[14px] opacity-60">Número para contato</p>
              <input
                type="tel"
                placeholder="99 99999-9999"
                className={`w-full rounded p-2 lg:w-[163px] ${errors.ong_Phone ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
                {...register("ong_Phone", {
                  required: "Número de telefone é obrigatório",
                  pattern: {
                    value: /^\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}$/,
                    message: "Número de telefone inválido",
                  },
                })}
              />
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
                    value: 15, // Mínimo de 15 caracteres
                    message: "A descrição deve ter pelo menos 5 palavras",
                  },
                })}
              />
            </span>
            <span className="mt-2 flex w-full items-start gap-5 lg:absolute lg:right-8 lg:bottom-8 lg:mt-0 lg:w-auto">
              <Button
                className="h-12 w-[calc(50%-8px)] cursor-pointer rounded border-2 border-red-400 text-red-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 hover:bg-red-100 lg:w-[180px]"
                onClick={() => setModalAdicionarRepasse(false)}
              >
                Cancelar
              </Button>
              <Button
                addClassName="w-[calc(50%-8px)] lg:w-[180px]"
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
      {modalImage && (
        <ModalImage
          xIcon={true}
          placeholder={"Adicione uma imagem relacionada à sua publicação."}
          content1="Buscar Online"
          content2="Adicionar Imagem"
          onClick1={() => setModalImageOnline(true)}
          onClick2={() => fileInputRef.current.click()}
        />
      )}
      {modalImageOnline && (
        <ModalImageOnline handleImageChange={handleImageChange} />
      )}
    </>
  );
}
