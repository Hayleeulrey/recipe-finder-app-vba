"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, BarChart, Bookmark, BookmarkCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: {
    id: number
    title: string
    image: string
    time: string
    difficulty: string
    servings: number
    description: string
    tags: string[]
    isSaved?: boolean
  }
  className?: string
  onSaveToggle?: (isSaved: boolean) => void
}

export default function RecipeCard({ recipe, className, onSaveToggle }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false)

  // Update internal state if prop changes
  useEffect(() => {
    setIsSaved(recipe.isSaved || false)
  }, [recipe.isSaved])

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the save button
    e.stopPropagation() // Prevent event bubbling

    const newSavedState = !isSaved
    setIsSaved(newSavedState)

    if (onSaveToggle) {
      onSaveToggle(newSavedState)
    }
  }

  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full">
      <div
        className={cn(
          "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full",
          className,
        )}
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-orange-100">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              // @ts-ignore - TypeScript doesn't know about currentTarget.onerror
              e.currentTarget.onerror = null // Prevent infinite loop
              e.currentTarget.src = "/placeholder.svg?height=400&width=600&query=delicious food"
            }}
          />

          {/* Save button */}
          <Button
            onClick={toggleSave}
            variant="secondary"
            size="icon"
            className={cn(
              "absolute top-3 right-3 rounded-full w-9 h-9 shadow-md transition-colors",
              isSaved ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-white/90 hover:bg-white",
            )}
          >
            {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            <span className="sr-only">{isSaved ? "Unsave recipe" : "Save recipe"}</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>

          {/* Quick info */}
          <div className="flex items-center justify-between mb-4 text-gray-700">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-orange-500" />
              <span className="text-sm">{recipe.time}</span>
            </div>

            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-orange-500" />
              <span className="text-sm">{recipe.servings}</span>
            </div>

            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-1 text-orange-500" />
              <span className="text-sm">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
            {recipe.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Save button (full width) */}
          <Button
            onClick={toggleSave}
            variant={isSaved ? "default" : "outline"}
            className={cn(
              "w-full mt-auto",
              isSaved
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "border-orange-500 text-orange-600 hover:bg-orange-50",
            )}
          >
            <span className="flex items-center gap-2">
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Save Recipe
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </Link>
  )
}
