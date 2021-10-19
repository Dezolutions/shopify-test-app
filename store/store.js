import create from "zustand";

const useStore = create((set) => ({
  email: "",
  ids: [],
  products: [],
  setProducts: (products) => set((state) => ({ products: products })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((item) => item.id != id),
    })),
  setIds: (ids) => set((state) => ({ ids: ids })),
  setEmail: (email) => set((state) => ({ email: email })),
}));

export default useStore;
