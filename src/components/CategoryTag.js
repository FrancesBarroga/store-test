import "../styles/productTable.css";

function CategoryTag(category) {
  switch (category) {
    case `men's clothing`:
      return <div className="bg-pink tag">{category}</div>;
    case `jewelery`:
      return <div className="bg-yellow tag">{category}</div>;
    case `electronics`:
      return <div className="bg-purple tag">{category}</div>;
    default:
      return <div>{category}</div>;
  }
}

export default CategoryTag;
