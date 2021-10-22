import create from "zustand";

const useStore = create((set) => ({
  email: "",
  ids: [],
  setIds: (ids) => set((state) => ({ ids: ids })),
  setEmail: (email) => set((state) => ({ email: email })),
}));

export default useStore;
