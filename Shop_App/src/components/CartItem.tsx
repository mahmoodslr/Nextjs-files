import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItemProps } from "./ProductItem";
import AddToCart from "./AddToCart";
import { formatNumber } from "@/utils/number";

interface ICartItemProps {
  id: number;
  qty: number;
}

function CartItem({ id, qty }: ICartItemProps) {
  const [data, setData] = useState({} as IProductItemProps);
  useEffect(() => {
    axios(`http://localhost:3004/products/${id}`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-10 bg-slate-100 mb-4">
      <div className="col-span-8 p-4">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p>
          Product Quantity <span>{qty}</span>
        </p>
        <p>
          Product Price <span>{formatNumber(data.price ?? 0)}$</span>
        </p>
        <AddToCart id={id.toString()} />
      </div>
      <img className="col-span-2" src={data.image} alt={data.title} />
    </div>
  );
}

export default CartItem;
