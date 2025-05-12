"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  BarChart,
  Coffee,
  UtensilsCrossed,
  Cake,
  Apple,
  BookmarkCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterState) => void
  className?: string
}

interface FilterState {
  mealType: string[]
  cookingTime: string | null
  difficulty: string | null
  savedOnly: boolean
}

export default function SearchFilters({ onSearch, onFilterChange, className }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    mealType: [],
    cookingTime: null,
    difficulty: null,
    savedOnly: false,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const toggleMealType = (type: string) => {
    const updatedMealTypes = filters.mealType.includes(type)
      ? filters.mealType.filter((t) => t !== type)
      : [...filters.mealType, type]

    const updatedFilters = {
      ...filters,
      mealType: updatedMealTypes,
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const setCookingTime = (time: string | null) => {
    const updatedFilters = {
      ...filters,
      cookingTime: filters.cookingTime === time ? null : time,
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const setDifficulty = (difficulty: string | null) => {
    const updatedFilters = {
      ...filters,
      difficulty: filters.difficulty === difficulty ? null : difficulty,
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const toggleSavedOnly = () => {
    const updatedFilters = {
      ...filters,
      savedOnly: !filters.savedOnly,
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      mealType: [],
      cookingTime: null,
      difficulty: null,
      savedOnly: false,
    }

    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.mealType.length > 0 || filters.cookingTime !== null || filters.difficulty !== null || filters.savedOnly

  return (
    <div className={cn("bg-white rounded-xl shadow-md p-4", className)}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center border-2 border-orange-500 rounded-full bg-white overflow-hidden">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-3 px-4 outline-none text-orange-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white p-3 transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>

      {/* Filter Toggle */}
      <div className="mt-4 flex justify-between items-center">
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-orange-900 font-medium">
          {showFilters ? (
            <>
              <ChevronUp className="h-5 w-5 mr-1" />
              Hide Filters
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5 mr-1" />
              Show Filters
            </>
          )}
        </button>

        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-sm text-orange-600 hover:text-orange-700">
            Clear all filters
          </button>
        )}
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mt-4 space-y-4">
          <Separator />

          {/* Meal Type Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Meal Type</h3>
            <div className="flex flex-wrap gap-2">
              <MealTypeButton
                type="Breakfast"
                icon={<Coffee className="h-4 w-4 mr-1" />}
                isActive={filters.mealType.includes("Breakfast")}
                onClick={() => toggleMealType("Breakfast")}
              />
              <MealTypeButton
                type="Lunch"
                icon={<UtensilsCrossed className="h-4 w-4 mr-1" />}
                isActive={filters.mealType.includes("Lunch")}
                onClick={() => toggleMealType("Lunch")}
              />
              <MealTypeButton
                type="Dinner"
                icon={<UtensilsCrossed className="h-4 w-4 mr-1" />}
                isActive={filters.mealType.includes("Dinner")}
                onClick={() => toggleMealType("Dinner")}
              />
              <MealTypeButton
                type="Dessert"
                icon={<Cake className="h-4 w-4 mr-1" />}
                isActive={filters.mealType.includes("Dessert")}
                onClick={() => toggleMealType("Dessert")}
              />
              <MealTypeButton
                type="Snack"
                icon={<Apple className="h-4 w-4 mr-1" />}
                isActive={filters.mealType.includes("Snack")}
                onClick={() => toggleMealType("Snack")}
              />
            </div>
          </div>

          <Separator />

          {/* Cooking Time Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Cooking Time</h3>
            <div className="flex flex-wrap gap-2">
              <FilterBadge
                label="Under 15 min"
                icon={<Clock className="h-3 w-3 mr-1" />}
                isActive={filters.cookingTime === "Under 15 min"}
                onClick={() => setCookingTime("Under 15 min")}
              />
              <FilterBadge
                label="15-30 min"
                icon={<Clock className="h-3 w-3 mr-1" />}
                isActive={filters.cookingTime === "15-30 min"}
                onClick={() => setCookingTime("15-30 min")}
              />
              <FilterBadge
                label="30-60 min"
                icon={<Clock className="h-3 w-3 mr-1" />}
                isActive={filters.cookingTime === "30-60 min"}
                onClick={() => setCookingTime("30-60 min")}
              />
              <FilterBadge
                label="Over 60 min"
                icon={<Clock className="h-3 w-3 mr-1" />}
                isActive={filters.cookingTime === "Over 60 min"}
                onClick={() => setCookingTime("Over 60 min")}
              />
            </div>
          </div>

          <Separator />

          {/* Difficulty Level Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              <FilterBadge
                label="Easy"
                icon={<BarChart className="h-3 w-3 mr-1" />}
                isActive={filters.difficulty === "Easy"}
                onClick={() => setDifficulty("Easy")}
              />
              <FilterBadge
                label="Medium"
                icon={<BarChart className="h-3 w-3 mr-1" />}
                isActive={filters.difficulty === "Medium"}
                onClick={() => setDifficulty("Medium")}
              />
              <FilterBadge
                label="Hard"
                icon={<BarChart className="h-3 w-3 mr-1" />}
                isActive={filters.difficulty === "Hard"}
                onClick={() => setDifficulty("Hard")}
              />
            </div>
          </div>

          <Separator />

          {/* Saved Recipes Toggle */}
          <div>
            <Button
              variant={filters.savedOnly ? "default" : "outline"}
              onClick={toggleSavedOnly}
              className={cn(
                "w-full",
                filters.savedOnly
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "border-orange-500 text-orange-600 hover:bg-orange-50",
              )}
            >
              <BookmarkCheck className="h-5 w-5 mr-2" />
              {filters.savedOnly ? "Showing Saved Recipes Only" : "Show Saved Recipes Only"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

interface MealTypeButtonProps {
  type: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

function MealTypeButton({ type, icon, isActive, onClick }: MealTypeButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        isActive
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "border-orange-500 text-orange-600 hover:bg-orange-50",
      )}
    >
      {icon}
      {type}
    </Button>
  )
}

interface FilterBadgeProps {
  label: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

function FilterBadge({ label, icon, isActive, onClick }: FilterBadgeProps) {
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={cn(
        "cursor-pointer px-3 py-1",
        isActive
          ? "bg-orange-500 hover:bg-orange-600 text-white border-transparent"
          : "bg-transparent hover:bg-orange-50 text-orange-700 border-orange-200",
      )}
      onClick={onClick}
    >
      <span className="flex items-center">
        {icon}
        {label}
      </span>
    </Badge>
  )
}
