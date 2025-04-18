import { ContentRating } from './enums'

export const contentRatingColors: Record<keyof typeof ContentRating, string> = {
  safe: 'bg-green-100 text-green-800',
  suggestive: 'bg-yellow-100 text-yellow-800',
  erotica: 'bg-orange-100 text-orange-800',
  pornographic: 'bg-red-100 text-red-800'
}
