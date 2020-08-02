interface Character {
  created: string;
  gender: string;
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
  type: string;
  url: string;
  episode: Episode;
  location: Location;
}

interface Episode {
  episode: string;
  name: string;
}

interface Location {
  dimension: string;
  name: string;
  type: string;
  url: string;
}

interface Characters {
  info: Info,
  results: object[]
}

interface Info {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export { Character, Characters };
