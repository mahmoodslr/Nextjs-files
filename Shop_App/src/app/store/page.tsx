import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ProductItem, { IProductList } from "@/components/ProductItem";
import Search from "@/components/Search";
import Link from "next/link";

interface IStoreProps {
  params: Promise<{}>;
  searchParams: Promise<{ page: string; per_page: string; title: string }>;
}

async function Store({ searchParams }: IStoreProps) {
  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "5";
  const title = (await searchParams).title ?? "";
  const result = await fetch(
    `http://localhost:3004/products?_page=${page}&_per_page=${per_page}&title=${title}`
  );
  const data = (await result.json()) as IProductList;

  return (
    <Container>
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Store</h1>
        <Search />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((item) => (
          <Link key={item.id} href={`/store/${item.id}`} className="block">
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Pagination pageCount={data.pages} />
      </div>
    </Container>
  );
}

export default Store;
