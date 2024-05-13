export const parseData = (
  recipeString: string,
  setRecipeName: React.Dispatch<React.SetStateAction<string>>,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,
  setIngredient: React.Dispatch<React.SetStateAction<string[]>>,
  setCook: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const recipeNameRegex = /레시피 이름: (.*)\n/;
  const recipeName = recipeString.match(recipeNameRegex)![1];

  const ingredientsRegex = /재료: (.*)\n조리방법:/;
  const ingredients = recipeString.match(ingredientsRegex)![1].split(", ");

  const instructionsRegex = /조리방법: ((?:\d+\. .*?\n))/;
  const instructions = recipeString
    .match(instructionsRegex)![1]
    .split(". ")
    .filter((e) => e.length > 1);

  const englishNameRegex = /레시피 영어이름: (.*)/;
  const englishName = recipeString.match(englishNameRegex)![1];

  setRecipeName(recipeName);
  setKeyword(englishName);
  setIngredient(ingredients);
  setCook(instructions);
};
