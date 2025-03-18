export interface IProductItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface IProductList {
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
  data: IProductItemProps[];
}

function ProductItem({ image, title, price }: IProductItemProps) {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full aspect-[3/3] object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">
          Price: <span className="font-bold text-green-600">${price}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
