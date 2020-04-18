import { Optional } from "utility-types"
import { Ingredient, Recipe } from "./models"

/**
 * Ingredient list input data
 */
const ingredientData = {
  vodka: {},
  rum: {},
  whiskey: {},
  coke: {},
  tequila: {},
  grenadine: {},
  orangeJuice: { name: "orange juice" },
  soda: {},
  coffeeLiqueur: { name: "coffee liqueur" },
}

/**
 * Recipe list input data
 */
const recipeData: AllRecipeData = {
  rumAndCoke: {
    name: "rum & coke",
    items: {
      rum: {},
      coke: {},
    },
  },
  tequilaSunrise: {
    name: "tequila sunrise",
    items: {
      tequila: {},
      orangeJuice: {},
      grenadine: {},
    },
  },
}

type IngredientData = Omit<Ingredient, "id">

export type IngredientId = keyof typeof ingredientData
export type IngredientChecklist = {
  [key in IngredientId]?: boolean
}

// compile-time check for ingredientData, since annotating it would break our
// nice IngredientId definition above
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ingredientDataTypeCheck: Record<
  IngredientId,
  Optional<IngredientData, "name">
> = ingredientData

type AllRecipeData = {
  [id: string]: RecipeData
}

interface RecipeData {
  name: string
  items: {
    [ingredientId: string]: { parts?: number }
  }
}

export const ingredientMap: Map<IngredientId, Ingredient> = new Map(
  Object.entries(ingredientData).map(([id, data]) => {
    return [
      id as any,
      {
        name: id,
        ...data,
        id,
      },
    ]
  }),
)

export const recipeMap: Map<string, Recipe> = new Map(
  Object.entries(recipeData).map(([id, data]) => {
    return [
      id,
      {
        id,
        name: id,
        items: Object.entries(data.items).map(([id, data]) => {
          return {
            ingredientId: id,
            parts: (data as any).parts ?? 1, // TODO: fix shitty typing
          }
        }),
      },
    ]
  }),
)
