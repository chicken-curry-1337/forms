type Fact = {
  fact: string;
};

export async function getFact() {
  const response = await fetch("https://catfact.ninja/fact");
  const data: Fact = await response.json();
  return data.fact;
}
