function SearchedCard({ character, identities }) {
  return (
    <div className="searched-card-ctr">
      <img
        src={character.image}
        alt={character.name}
        className="searched-card-img"
      />
      <p className="searched-card-name">{character.name}</p>
      {/* {identities.map((identity, index) => (
        <>
          <img src={identity.image} alt="" />
          <div key={index}>{identity.name}</div>
        </>
      ))} */}
    </div>
  );
}

export default SearchedCard;
