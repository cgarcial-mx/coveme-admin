"use client"

import { Star, StarHalf } from 'lucide-react'

export function RatingStars({
  rating = 0,
  outOf = 5,
  size = 16,
  className = "",
}: {
  rating?: number
  outOf?: number
  size?: number
  className?: string
}) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = outOf - full - (half ? 1 : 0)

  return (
    <div className={`inline-flex items-center ${className}`} aria-label={`${rating} out of ${outOf} stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="text-amber-500" size={size} fill="currentColor" />
      ))}
      {half && <StarHalf className="text-amber-500" size={size} fill="currentColor" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className="text-muted-foreground" size={size} />
      ))}
    </div>
  )
}
