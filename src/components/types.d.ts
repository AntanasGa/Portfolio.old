export interface LocalizedItem<T = string> {
  [locale: string]: T
}

export interface IProject {
  cover: string
  title: LocalizedItem
  summary?: LocalizedItem
  technologies?: string[]
  git?: string
  demo?: string
}
