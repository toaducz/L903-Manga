import { atom } from 'recoil'

export const offsetState = atom<number>({
  key: 'offsetState',
  default: 0
})
