/** Adds a key prop to every element, useful for SVGs */
export const addKeys = (elements: JSX.Element[]): JSX.Element[] =>
  elements.map((element, index) => ({ ...element, key: index.toString() }));
