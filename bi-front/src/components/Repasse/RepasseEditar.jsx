import Button from "../Button/Button";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  useDelRepasse,
  useEditRepasse,
} from "../../services/userRepasseService";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { ModalContext } from "../contexts/ModalContext";
import ModalEncerrar from "../ModalEncerrar/ModalEncerrar";
import ModalImage from "../ModalImage/ModalImage";
import ModalImageOnline from "../ModalImageOnline/ModalImageOnline";

export default function PostSelected({
  expiracaoFormatada,
  setSelectedId,
  post,
}) {
  const { mutate: salvar } = useEditRepasse();
  const { mutate: remover } = useDelRepasse();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const {
    setModalEncerrar,
    modalEncerrar,
    setModalImage,
    modalImage,
    setModalImageOnline,
    modalImageOnline,
  } = useContext(ModalContext);

  {
    /*Image ta recebendo ongimage como improviso, mas esta incorreto. Substituir quando existir campo de imagem  */
  }
  const initialValues = {
    title: post.title,
    category: post.category,
    description: post.description,
    image: post.ong_Imagem,
    ong_Phone: post.ong_Phone,
    ong_Email: post.ong_Email,
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    if (JSON.stringify(data) === JSON.stringify(initialValues)) {
      setSelectedId("");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("ong_Email", data.ong_Email);
    formData.append("ong_Phone", data.ong_Phone);
    formData.append("id", Number(post.id));
    // Se houver imagem no formulário
    if (data.image) {
      formData.append("image", data.image); // Acessa o arquivo corretamente
    }

    salvar(formData);
    setSelectedId(""); // Fechar form após salvar
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
      "image",
    ];

    const values = getValues();

    const missingFields = requiredFields.filter((field) => !values[field]);

    // Se algum campo obrigatório estiver faltando, exibe o toast
    if (missingFields.length > 0) {
      toast.error("Preencha todos os campos obrigatórios!");
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
    if (values.title.length < 5 || values.title.length > 100) {
      toast.error(
        values.title.length < 5
          ? "O título deve ter pelo menos 5 caracteres"
          : "O título não pode ter mais que 100 caracteres",
      );
    }

    return isValid;
  };

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

  return (
    <>
      <div className="relative z-11 flex w-full max-w-[1120px] items-start gap-6 rounded bg-white p-4">
        <span className="flex flex-col gap-1">
          <p className="text-[14px] opacity-60">Imagem</p>
          <div
            className={`relative flex h-[350px] w-[350px] cursor-pointer items-center justify-center rounded ${errors.image ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
            onClick={() => setModalImage(true)}
          >
            {post.post_Imagem && !preview && (
              <img
                src={post.post_Imagem}
                alt="Imagem original"
                className="h-full w-full rounded object-cover"
              />
            )}
            {preview && (
              <img
                src={preview}
                alt="Prévia da imagem"
                className="h-full w-full rounded object-cover"
              />
            )}
            {!preview && !post.post_Imagem && (
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
              {...register("image", { required: "imagem é obrigatório" })}
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </span>
        <div className="flex flex-wrap items-start gap-x-[30px] gap-y-[10px]">
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
                maxLength: {
                  value: 100,
                  message: "O título não pode ter mais que 100 caracteres",
                },
              })}
            />
          </span>
          <span className="flex flex-col gap-1">
            <p className="text-[14px] opacity-60">Categoria</p>
            <select
              className={`max-h-10 w-[163px] rounded border-2 p-1 ${errors.category ? "border-transparent bg-red-100 outline-2 outline-red-200" : "border-[#9c9c9c]"}`}
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
            <p className="text-[14px] opacity-60">{expiracaoFormatada}</p>
            <Button
              className="h-10 w-[163px] cursor-pointer rounded border-2 border-red-400 bg-red-400 text-white transition-all duration-100 hover:bg-red-300"
              onClick={() => setModalEncerrar(true)}
            >
              Encerrar
            </Button>
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
              className={`w-[196px] rounded p-2 ${errors.ong_Phone ? "bg-red-100 outline-2 outline-red-200" : "bg-[#eaeaea]"}`}
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

          <span className="absolute right-4 bottom-4 flex items-start gap-5">
            <Button
              className="h-12 w-[180px] cursor-pointer rounded border-2 border-red-400 text-red-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 hover:bg-red-100"
              onClick={() => setSelectedId("")}
            >
              Cancelar
            </Button>
            <Button
              addClassName="w-[180px]"
              onClick={async () => {
                const isValid = await validate();
                if (isValid) {
                  handleSubmit(onSubmit)();
                }
              }}
            >
              Salvar
            </Button>
          </span>
        </div>
      </div>
      {modalEncerrar && (
        <ModalEncerrar
          xIcon={true}
          placeholder={"Tem certeza que deseja encerrar publicação?"}
          content1="Cancelar"
          content2="Encerrar"
          onClick={() => {
            remover(post.id);
            setModalEncerrar(false);
            setSelectedId("");
          }}
        />
      )}
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

PostSelected.propTypes = {
  expiracaoFormatada: PropTypes.string.isRequired,
  setSelectedId: PropTypes.node.isRequired,
  post: PropTypes.object.isRequired,
  databaseState: PropTypes.array.isRequired,
  setDatabaseState: PropTypes.func.isRequired,
};
