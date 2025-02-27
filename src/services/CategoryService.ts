export const triviaCategories = [
  { "id": 9, "name": "general-knowledge" },
  { "id": 10, "name": "books" },
  { "id": 11, "name": "film" },
  { "id": 12, "name": "music" },
  { "id": 13, "name": "musicals&theatres" },
  { "id": 14, "name": "television" },
  { "id": 15, "name": "video-games" },
  { "id": 16, "name": "board-games" },
  { "id": 17, "name": "science&nature" },
  { "id": 18, "name": "computers" },
  { "id": 19, "name": "mathematics" },
  { "id": 20, "name": "mythology" },
  { "id": 21, "name": "sports" },
  { "id": 22, "name": "geography" },
  { "id": 23, "name": "history" },
  { "id": 24, "name": "politics" },
  { "id": 25, "name": "art" },
  { "id": 26, "name": "celebrities" },
  { "id": 27, "name": "animals" },
  { "id": 28, "name": "vehicles" },
  { "id": 29, "name": "comics" },
  { "id": 30, "name": "gadgets" },
  { "id": 31, "name": "japanese-anime&manga" },
  { "id": 32, "name": "cartoon&animations" }
];

export function getCategoryIdByName(name: string | undefined) {
  const category = getCategoryByName(name)
  return category.id
}

export function getCategoryByName(name: string | undefined) {
  const category = triviaCategories.find(
    category => category.name.toLowerCase() === name?.toLowerCase())
  if (!category) throw Error('No category with such name')
  return category
}