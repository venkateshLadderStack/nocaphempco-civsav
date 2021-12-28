import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import CryptoJS from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import { shipping } from '@/constant/shipping_key';

type Props = {
  children: ReactNode;
};

type contextType = {
  cartLength: number;
  total: number;
  list: any;
  free: number;
  shippingType: string;
  shippingClass: any;
  shippingObject: any;
  cartOption: boolean;
  tax: number;
  setTotalPrice: (args: number) => void;
  removeItem: (args: string) => void;
  updateCartLength: () => void;
  onChangeProductQuantity: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setShippingObject: (arg: any) => void;
  setShippingType: (arg: string) => void;
  setCartOption: (arg: boolean) => void;
};

const contextDefaultValues: contextType = {
  cartLength: 0,
  total: 0,
  list: [],
  free: 0,
  shippingType: '',
  shippingClass: {},
  shippingObject: {},
  cartOption: false,
  tax: 0,
  setTotalPrice: () => {
    return;
  },
  removeItem: () => {
    return;
  },
  updateCartLength: () => {
    return;
  },
  onChangeProductQuantity: () => {
    return;
  },
  setShippingObject: () => {
    return;
  },
  setShippingType: () => {
    return;
  },
  setCartOption: () => {
    return;
  },
};

const SiteContext = createContext<contextType>(contextDefaultValues);

export function useSiteContext() {
  return useContext(SiteContext);
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [cartLength, setCartLength] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [list, setList] = useState<any>([]);
  const [free, setFree] = useState<number>(0);
  const [cartOption, setCartOption] = useState<boolean>(false);
  const [shippingType, setShippingType] = useState<string>('ground');
  const [shippingClass, setShippingClass] = useState<any>({});
  const [shippingObject, setShippingObject] = useState<any>({
    country: null,
    state: null,
    city: '',
    zip: '',
    tax: null,
  });

  const _freeShapping = () => {
    if (total < 50) {
      const remain = 50 - total;
      setFree(remain);
    } else {
      setFree(total);
    }
  };

  const setTotalPrice = (price: number) => {
    setTotal(price);
  };

  const updateCartLength = () => {
    if (localStorage.getItem('key_product')) {
      const encrypt = localStorage.getItem('key_product')!;
      const bytes = CryptoJS.decrypt(
        encrypt,
        process.env.CART_SECRET_KEY || ''
      );
      const cart = JSON.parse(bytes.toString(CryptoENC));

      setCartLength(cart.length);
      const subTotal = cart.reduce((total: number, product: any) => {
        return total + product.price * +product.quantity;
      }, 0);

      setTotal(subTotal);
      setList(cart);
    } else {
      setList([]);
      setCartLength(0);
    }
  };

  useEffect(() => {
    updateCartLength();
    // if (localStorage.getItem('key_product')) {
    //   const cart = JSON.parse(localStorage.getItem('key_product')!);
    //   const subTotal = cart.reduce((total: number, product: any) => {
    //     return total + product.price * +product.quantity;
    //   }, 0);

    //   setTotal(subTotal);
    // }
  }, []);

  // Effect on total
  useEffect(() => {
    _freeShapping();
  }, [total]);

  // Effect on list
  useEffect(() => {
    const highestPrice = Math.max.apply(
      null,
      list.map((e: any) => e.price)
    );
    const item = list.find((e: any) => e.price === highestPrice.toString());

    if (item) {
      const shClass = shipping.find((sh: any) => sh.name === item.shipping);
      setShippingClass(shClass);
    }
  }, [list]);

  useEffect(() => {
    if (shippingObject.tax) {
      const totalTax = list.reduce((total: number, product: any) => {
        const t =
          parseFloat(product.price) *
          parseFloat(product.quantity) *
          parseFloat(shippingObject.tax.rate);
        return total + t / 100;
      }, 0);
      setTax(totalTax);
    }
  }, [list, shippingObject]);

  const onChangeProductQuantity = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts: any[] = [...list];

    if (value === '') {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }
    const encryptText = CryptoJS.encrypt(
      JSON.stringify(cloneProducts),
      process.env.CART_SECRET_KEY || ''
    ).toString();

    localStorage.setItem('key_product', encryptText);
    const subTotal = cloneProducts.reduce((total: number, product: any) => {
      return total + product.price * +product.quantity;
    }, 0);

    setTotal(subTotal);
    setList(cloneProducts);
  };

  const removeItem = (id: string) => {
    if (localStorage.getItem('key_product')) {
      // const cart = JSON.parse(localStorage.getItem('key_product')!);
      const encrypt = localStorage.getItem('key_product')!;
      const bytes = CryptoJS.decrypt(
        encrypt,
        process.env.CART_SECRET_KEY || ''
      );
      const cart = JSON.parse(bytes.toString(CryptoENC));

      const filter = cart.filter((i: any) => i.product_id !== id);
      // localStorage.setItem('key_product', JSON.stringify(filter));
      const encryptText = CryptoJS.encrypt(
        JSON.stringify(filter),
        process.env.CART_SECRET_KEY || ''
      ).toString();

      localStorage.setItem('key_product', encryptText);
      const subTotal = filter.reduce((total: number, product: any) => {
        return total + product.price * +product.quantity;
      }, 0);

      setTotal(subTotal);
      setCartLength(filter.length);
      setList(filter);
    }
  };

  const value = {
    cartLength,
    total,
    list,
    free,
    shippingType,
    shippingClass,
    shippingObject,
    cartOption,
    tax,
    setTotalPrice,
    removeItem,
    updateCartLength,
    onChangeProductQuantity,
    setShippingType,
    setShippingObject,
    setCartOption,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
