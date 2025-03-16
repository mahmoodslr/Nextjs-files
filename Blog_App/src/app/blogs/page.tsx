import Article from "@/components/Article";
import Container from "@/components/Container";
import Link from "next/link";

export interface IGetArtiches {
  id?: string;
  title?: string;
  description?: string;
}

async function Blogs() {
  const result = await fetch("http://localhost:3001/articles");
  const data = (await result.json()) as IGetArtiches[];

  return (
    <Container>
      <div className="grid grid-cols-4 gap-4 py-16">
        {data.map((item) => (
          <Link href={`/blogs/${item.id}`} key={item.id}>
            <Article {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Blogs;
