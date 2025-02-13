import Header from '../components/common/Header/header'; 
import { Link } from 'react-router-dom';

export default function MainPage() {
    return (
      <>
      <Header>
        <Link to="/">Logar como Ong</Link>
        
      </Header>
      <heroSection/>
      </>
    );
  }
  
