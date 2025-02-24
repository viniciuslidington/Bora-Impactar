import styles from "./Card.module.css";
import PropTypes from "prop-types";

function Cards({ cardData }) {
  return (
    <div className={styles.cardsContainer}>
      {cardData.map((card, index) => (
        <div key={index} className={styles.card}>
          <h2 className={styles.cardTitle}>{card.title}</h2>

          <img
            src={card.imageUrl}
            alt={`Imagem do card ${card.title}`}
            className={styles.cardImage}
          />

          {/* Lista de ONGs */}
          <div className={styles.cardOngs}>
            {card.ongs.map((ong, idx) => (
              <div key={idx} className={styles.ongItem}>
                <p>{ong}</p>
                {/* Adiciona a bolinha se não for o último item */}
                {idx < card.ongs.length - 1 && (
                  <span className={styles.dot}></span>
                )}
              </div>
            ))}
          </div>

          {/* Botão */}
          <button className={styles.cardButton}>Ver todas</button>
        </div>
      ))}
    </div>
  );
}
Cards.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      ongs: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default Cards;
