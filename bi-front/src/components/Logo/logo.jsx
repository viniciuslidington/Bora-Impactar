import { Link } from "react-router-dom";

/* export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/LogoRecifePrefeitura.svg" alt="Logo" />
    </Link>
  );
} */

export default function Logo({ className }) {
  return (
    <Link to={"/"}>
      <img src="/LogoRecifePrefeitura.svg" alt="Logo" className={className} />
    </Link>
  );
}
