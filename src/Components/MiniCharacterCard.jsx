function MiniCharacterCard({ character, identities }) {
  return (
    // < className="mini-character-card-container">
    <>
      <img
        src={character.image}
        alt={character.name}
        className="mini-character-card-img"
      />
      <p className="mini-character-card-name">{character.name}</p>
    </>
  );
}

export default MiniCharacterCard;
