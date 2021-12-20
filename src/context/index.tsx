import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type Props = {
  children: ReactNode;
};

type contextType = {
  cartLength: number;
  total: number;
  list: any;
  setTotalPrice: (args: number) => void;
  removeItem: (args: string) => void;
  updateCartLength: () => void;
  onChangeProductQuantity: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const contextDefaultValues: contextType = {
  cartLength: 0,
  total: 0,
  list: [],
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
};

const SiteContext = createContext<contextType>(contextDefaultValues);

export function useSiteContext() {
  return useContext(SiteContext);
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [cartLength, setCartLength] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<any>([]);

  const setTotalPrice = (price: number) => {
    setTotal(price);
  };

  const updateCartLength = () => {
    if (localStorage.getItem('c_product')) {
      const cart = JSON.parse(localStorage.getItem('c_product')!);
      setCartLength(cart.length);
      const subTotal = cart.reduce((total: number, product: any) => {
        return total + product.price * +product.quantity;
      }, 0);

      setTotal(subTotal);
      setList(cart);
    }
  };

  useEffect(() => {
    updateCartLength();
    if (localStorage.getItem('c_product')) {
      const cart = JSON.parse(localStorage.getItem('c_product')!);
      const subTotal = cart.reduce((total: number, product: any) => {
        return total + product.price * +product.quantity;
      }, 0);

      setTotal(subTotal);
    }
  }, []);

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
    localStorage.setItem('c_product', JSON.stringify(cloneProducts));
    const subTotal = cloneProducts.reduce((total: number, product: any) => {
      return total + product.price * +product.quantity;
    }, 0);

    setTotal(subTotal);
    setList(cloneProducts);
  };

  const removeItem = (id: string) => {
    if (localStorage.getItem('c_product')) {
      const cart = JSON.parse(localStorage.getItem('c_product')!);
      const filter = cart.filter((i: any) => i.product_id !== id);
      localStorage.setItem('c_product', JSON.stringify(filter));
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
    setTotalPrice,
    removeItem,
    updateCartLength,
    onChangeProductQuantity,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
