import { useParams } from "react-router-dom";

export default function Category() {
  const { category } = useParams();
  return <h1 className="text-2xl font-bold">Categoria: {category}</h1>;
}
