import AddToCart from "@/components/AddToCart";
import Container from "@/components/Container";
import { IProductItemProps } from "@/components/ProductItem";

interface IProductProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}

async function Product({ params }: IProductProps) {
  const { id } = await params;
  const result = await fetch(`http://localhost:3004/products/${id}`);
  const data = (await result.json()) as IProductItemProps;

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="md:col-span-7 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
          <p className="text-gray-700 mt-4">{data.description}</p>
          <p className="text-xl font-bold text-green-600 mt-4">
            Price: <span>${data.price}</span>
          </p>
          <div className="mt-6">
            <AddToCart id={id} />
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-full max-w-sm object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </Container>
  );
}

export default Product;
