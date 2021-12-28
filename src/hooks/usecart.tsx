import toast from 'react-hot-toast';
// import CryptoENC from 'crypto-js/enc-utf8';
import CryptoJS from 'crypto-js/aes';
import { useSiteContext } from '@/context';

export default function useCart() {
  const { updateCartLength, list } = useSiteContext();

  const addToCart = (item: any) => {
    // const temp = localStorage.getItem('key_product');

    if (list.length === 0) {
      const encryptText = CryptoJS.encrypt(
        JSON.stringify([item]),
        process.env.CART_SECRET_KEY || ''
      ).toString();

      localStorage.setItem('key_product', encryptText);
      // localStorage.setItem('key_product', JSON.stringify([item]));
      toast.success('Item added to cart!');
      updateCartLength();
    } else {
      // const arr = JSON.parse(temp);
      const arr = [...list];
      const index = arr.findIndex(
        (ob: any) => ob.product_id === item.product_id
      );
      if (index === -1) {
        arr.push(item);
        const encryptText = CryptoJS.encrypt(
          JSON.stringify(arr),
          process.env.CART_SECRET_KEY || ''
        ).toString();

        localStorage.setItem('key_product', encryptText);
        // localStorage.setItem('key_product', JSON.stringify(arr));
        toast.success('Item added to cart!');
        updateCartLength();
      } else {
        arr[index] = item;
        const encryptText = CryptoJS.encrypt(
          JSON.stringify(arr),
          process.env.CART_SECRET_KEY || ''
        ).toString();

        localStorage.setItem('key_product', encryptText);
        // localStorage.setItem('key_product', JSON.stringify(arr));
        toast.success('Item added to cart!');
        updateCartLength();
      }
    }
  };

  return {
    addToCart,
  };
}
