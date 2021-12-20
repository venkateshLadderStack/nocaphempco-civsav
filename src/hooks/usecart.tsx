import toast from 'react-hot-toast';
import { useSiteContext } from '@/context';

export default function useCart() {
  const { updateCartLength } = useSiteContext();

  const addToCart = (item: any) => {
    const temp = localStorage.getItem('c_product');

    if (temp === null) {
      localStorage.setItem('c_product', JSON.stringify([item]));
      toast.success('Item added to cart!');
      updateCartLength();
    } else {
      const arr = JSON.parse(temp);
      const index = arr.findIndex(
        (ob: any) => ob.product_id === item.product_id
      );
      if (index === -1) {
        arr.push(item);
        localStorage.setItem('c_product', JSON.stringify(arr));
        toast.success('Item added to cart!');
        updateCartLength();
      } else {
        arr[index] = item;
        localStorage.setItem('c_product', JSON.stringify(arr));
        toast.success('Item added to cart!');
        updateCartLength();
      }
    }
  };

  return {
    addToCart,
  };
}
