export type AgeByName = { count: number; name: string; age: number } & (
  | { age: number }
  | { error: string }
);

export async function getAgeByName(
  name: string,
  signal: AbortSignal
): Promise<number> {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`, {
      signal,
    });
    const data: AgeByName = await response.json();

    if (data.age === null) throw new Error("cannot calculate user age");
    return data.age;
  } catch (e) {
    console.error(e);
    throw new Error((e as Error).message);
  }
}
