function MiniCharacterCard({ character, identities }) {
  const { name, image } = character;
  return (
    <div className="mini-character-card-container">
      <img src={image} alt={name} className="mini-character-card-img" />
      <p className="mini-character-card-name">{name}</p>
    </div>
  );
}

export default MiniCharacterCard;
