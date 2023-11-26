export function toCamelCase(input: string): string {
  const words = input.split(" ");

  // Convert the first word to lowercase
  const firstWord = words[0].toLowerCase();

  // Join the words and return the result
  return firstWord + words.slice(1).join("");
}

// input: "First Name", returns: "firstName"
// input: "Date Of Birth", returns: "dateOfBirth"
// input: "Address", returns: "address".

// input: "First Name", returns: "Firstname"
// input: "Date Of Birth", returns: "DateOfBirth"
// input: "Address", returns: "Address".
