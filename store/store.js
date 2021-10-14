import create from 'zustand'

const useStore = create(set => ({
  email: '',
  setEmail: (email) => set(state => ({email: email}))
}))

export default useStore