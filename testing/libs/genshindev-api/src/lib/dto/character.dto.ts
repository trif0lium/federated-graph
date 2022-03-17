export interface Constellation {
  name: string
  unlock: string
  description: string
  type: string
}

export interface Character {
  name: string
  vision: string
  weapon: string
  nation: string
  affiliation: string
  rarity: number
  constellation: string
  birthday: string
  description: string
  constellations: Constellation[]
}
