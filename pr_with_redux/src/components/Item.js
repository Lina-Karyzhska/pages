function Item({ name, lastname, age, sex }) {
  return (
    <li className="list__item">
      <p>{name} {lastname}</p>
      <p>Возраст: {age}</p>
      <p>Пол: {sex === "m" ? "мужской" : "женский"}</p>
    </li>
  );
}

export default Item;