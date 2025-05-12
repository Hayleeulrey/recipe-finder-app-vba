"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Users, BarChart, Bookmark, BookmarkCheck, ChefHat, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import { recipes } from "@/lib/recipe-data"

// Get recipe by ID from our recipe data
const getRecipeById = (id: string) => {
  const recipe = recipes.find((recipe) => recipe.id === Number.parseInt(id))

  if (!recipe) {
    throw new Error(`Recipe with ID ${id} not found`)
  }

  return recipe
}

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id)
  const [isSaved, setIsSaved] = useState(false)

  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-orange-100">
        <Image
          src={recipe.heroImage || recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // @ts-ignore - TypeScript doesn't know about currentTarget.onerror
            e.currentTarget.onerror = null // Prevent infinite loop
            e.currentTarget.src = "/placeholder.svg?height=800&width=1200&query=delicious food"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag, index) => (
                <Badge key={index} className="bg-orange-500/80 hover:bg-orange-600/80 text-white border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{recipe.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation and Save Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to recipes
            </Button>
          </Link>

          <Button
            onClick={toggleSave}
            variant={isSaved ? "default" : "outline"}
            className={
              isSaved
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "border-orange-500 text-orange-600 hover:bg-orange-50"
            }
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-5 w-5 mr-2" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-5 w-5 mr-2" />
                Save Recipe
              </>
            )}
          </Button>
        </div>

        {/* Recipe Description */}
        <p className="text-lg text-gray-700 mb-8">{recipe.description}</p>

        {/* Key Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
            <Timer className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500">Prep Time</span>
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
            <Clock className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500">Cook Time</span>
            <span className="font-medium">{recipe.cookTime}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
            <BarChart className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500">Difficulty</span>
            <span className="font-medium">{recipe.difficulty}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
            <Users className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500">Servings</span>
            <span className="font-medium">{recipe.servings}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">Ingredients</h2>
              </div>
              <Separator className="mb-4" />
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="min-w-4 h-4 rounded-full bg-orange-200 mt-1.5" />
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
              <Separator className="mb-6" />
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="text-gray-700">{step}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
