import create from "zustand";

const useStore = create((set) => ({
  email: "",
  ids: [],
  products: [],
  setProducts: (products) => set((state) => ({ products: products })),
  setProduct: (product) =>
    set((state) => ({
      products: state.products.map((item) => {
        return item.id == product.id
          ? { ...item, orderQuantity: product.orderQuantity }
          : item;
      }),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id != id),
    })),
  setIds: (ids) => set((state) => ({ ids: ids })),
  setEmail: (email) => set((state) => ({ email: email })),
}));

export default useStore;
