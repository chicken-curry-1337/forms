import { useEffect, useRef, useState } from "react";
import { useAge } from "./useAge";
import { Input } from "../../shared/ui/Input.styled";
import { Column, Form } from "../../shared/ui/Form.styled";
import { Button } from "../../shared/ui/Button.styled";
import { Title } from "../../shared/ui/Title.styled";
import { ErrorText } from "../../shared/ui/ErrorText.styled";

/*
  2. Дано: форма с текстовым полем и кнопка «Отправить».
  Пользователь вводит своё имя в текстовом поле.
  При отправке формы или после 3х секундной паузы после ввода имени должен отправляться
  Get запрос к https://api.agify.io/ передав параметр name имя введенное пользователем в текстовое поле.
  Ответом будет возраст человека, определенный по имени.
  Его нужно отобразить под текстовым полем.
  Необходимо предотвращать дублирующие запросы (не отправлять запрос с таким же именем) 
  и предусмотреть отправку следующего запроса до того, как текущий был обработан - прерывать запрос,
  чей ответ нам уже не нужен (Частый кейс при медленном интернете).
*/

export default function SecondForm() {
  const [inputValue, setInputValue] = useState<string>("");
  const { userAge, getAge, errorMessage } = useAge(inputValue);
  const timerRef = useRef<number>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const name = formData.get("name") as string;

    getAge(name);
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      getAge(inputValue);
    }, 3000);

    () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [getAge, inputValue]);

  return (
    <>
      <Title>Second form</Title>
      <Form onSubmit={handleSubmit}>
        <Column>
          <Input
            type="text"
            name="name"
            value={inputValue}
            onChange={onInputChange}
          />
        </Column>
        <Column>
          <Button type="submit">submit</Button>
        </Column>
        <Column>{userAge}</Column>
        {errorMessage !== null && (
          <Column>
            <ErrorText>{errorMessage}</ErrorText>
          </Column>
        )}
      </Form>
    </>
  );
}
