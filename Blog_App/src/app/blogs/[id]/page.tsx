import Container from "@/components/Container";
import { IGetArtiches } from "../page";

interface IArticleProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}

async function Article(props: IArticleProps) {
  const { id } = await props.params;
  const result = await fetch(`http://localhost:3001/articles/${id}`);
  const data = (await result.json()) as IGetArtiches;

  return (
    <Container>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 transition-transform duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.title}</h2>
        <p className="text-gray-700 leading-relaxed">{data.description}</p>
      </div>
    </Container>
  );
}

export default Article;
