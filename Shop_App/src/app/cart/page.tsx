"use client";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { IProductItemProps } from "@/components/ProductItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumber } from "@/utils/number";
import axios from "axios";
import { useEffect, useState } from "react";

interface IDiscountData {
  id: number;
  code: string;
  percentage: number;
}

function Cart() {
  const { cartItems } = useShoppingCartContext();
  const [discountCode, setDiscountCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const [data, setData] = useState<IProductItemProps[]>([]);
  useEffect(() => {
    axios(`http://localhost:3004/products`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  let totalPrice = cartItems.reduce((total, item) => {
    let selectedProduct = data.find(
      (product) => product.id == item.id.toString()
    );
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:3004/discounts?code=${discountCode}`).then(
      (result) => {
        const data = result.data as IDiscountData;
        let discountedPrice = (totalPrice * data[0].percentage) / 100;
        let finalPrice = totalPrice - discountedPrice;
        setDiscountedPrice(discountedPrice);
        setFinalPrice(finalPrice);
      }
    );
  };

  return (
    <Container>
      <h1 className="my-4">Cart</h1>
      <div className="">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className="border shadow-md p-4">
          <h3>
            Total Price:
            <span>{formatNumber(totalPrice)}$</span>
          </h3>
          <h3>
            Discount: <span>{formatNumber(discountedPrice)}$</span>
          </h3>
          <h3>
            Final Price: <span>{formatNumber(finalPrice)}$</span>
          </h3>
          <div>
            <button
              onClick={handleSubmitDiscount}
              className="bg-sky-600 text-white px-4 py-1 rounded-md mr-3"
            >
              Apply
            </button>
            <input
              placeholder="Discount Code"
              type="text"
              className="border rounded-md"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
