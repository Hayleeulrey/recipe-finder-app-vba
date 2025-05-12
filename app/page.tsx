"use client"

import { useState, useEffect } from "react"
import RecipeCard from "@/components/recipe-card"
import Header from "@/components/header"
import SearchFilters from "@/components/search-filters"
import { recipes as allRecipes } from "@/lib/recipe-data"

interface FilterState {
  mealType: string[]
  cookingTime: string | null
  difficulty: string | null
  savedOnly: boolean
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    mealType: [],
    cookingTime: null,
    difficulty: null,
    savedOnly: false,
  })
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes)
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])

  // Apply filters and search
  useEffect(() => {
    let results = [...allRecipes]

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply meal type filter
    if (activeFilters.mealType.length > 0) {
      results = results.filter((recipe) => recipe.tags.some((tag) => activeFilters.mealType.includes(tag)))
    }

    // Apply cooking time filter
    if (activeFilters.cookingTime) {
      const timeFilter = (recipe: (typeof allRecipes)[0]) => {
        const totalMinutes = Number.parseInt(recipe.time.split(" ")[0])

        switch (activeFilters.cookingTime) {
          case "Under 15 min":
            return totalMinutes < 15
          case "15-30 min":
            return totalMinutes >= 15 && totalMinutes <= 30
          case "30-60 min":
            return totalMinutes > 30 && totalMinutes <= 60
          case "Over 60 min":
            return totalMinutes > 60
          default:
            return true
        }
      }

      results = results.filter(timeFilter)
    }

    // Apply difficulty filter
    if (activeFilters.difficulty) {
      results = results.filter((recipe) => recipe.difficulty === activeFilters.difficulty)
    }

    // Apply saved only filter
    if (activeFilters.savedOnly) {
      results = results.filter((recipe) => savedRecipes.includes(recipe.id))
    }

    setFilteredRecipes(results)
  }, [searchQuery, activeFilters, savedRecipes])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters)
  }

  const handleSaveRecipe = (id: number, isSaved: boolean) => {
    if (isSaved) {
      setSavedRecipes((prev) => [...prev, id])
    } else {
      setSavedRecipes((prev) => prev.filter((recipeId) => recipeId !== id))
    }
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-orange-100 to-orange-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">Find your next favorite meal</h1>
          <p className="text-lg text-orange-800 mb-8">Discover delicious pescatarian recipes for every meal</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 -mt-8">
        <div className="container mx-auto max-w-5xl">
          <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-900">
              {activeFilters.savedOnly
                ? "Saved Recipes"
                : searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "All Recipes"}
            </h2>
            <p className="text-gray-600">{filteredRecipes.length} recipes found</p>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={{
                    ...recipe,
                    isSaved: savedRecipes.includes(recipe.id),
                  }}
                  onSaveToggle={(isSaved) => handleSaveRecipe(recipe.id, isSaved)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">No recipes found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
