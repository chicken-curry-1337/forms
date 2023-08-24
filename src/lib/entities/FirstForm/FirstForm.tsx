import { useEffect, useRef, useState } from "react";
import { getFact } from "./getFact";
import { Input } from "../../shared/ui/Input.styled";
import { Form } from "../../shared/ui/Form.styled";
import { Column } from "../../shared/ui/Column.styled";
import { Button } from "../../shared/ui/Button.styled";
import { Title } from "../../shared/ui/Title.styled";

/*
    1. Дано: текстовое поле и кнопка.
    По нажатию на кнопку запрос к https://catfact.ninja/fact .
    Полученный факт нужно записать в текстовое поле и установить курсор после первого слова.
 */

export default function FirstForm() {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fact = await getFact();
    setInputValue(fact);
  }

  useEffect(() => {
    if (inputRef.current && inputValue !== null) {
      const selectionIndex = inputValue.split(" ")[0].length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(selectionIndex, selectionIndex);
    }
  }, [inputValue]);

  return (
    <>
      <Title>First form</Title>
      <Form onSubmit={handleSubmit}>
        <Column>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
        </Column>
        <Column>
          <Button type="submit">submit</Button>
        </Column>
      </Form>
    </>
  );
}
