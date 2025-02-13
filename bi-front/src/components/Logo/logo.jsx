import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/LogoRecifePrefeitura.svg" alt="Logo" />
    </Link>
  );
}
