import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm, FieldValues } from "react-hook-form"
import { ZodRawShape } from "zod"
import { IPostBody, postBodySchema } from "../../../schemas/posts"
import { NewPostInputProps } from "./types"

function NewPostInput<T extends FieldValues, F extends ZodRawShape>({ mutate, fieldsParser }: NewPostInputProps<T, F>) {
  const { register, handleSubmit, reset } = useForm<any>()

  const submitHandler: SubmitHandler<T> = (formData) => {
    const parsedFormData = fieldsParser.parse(formData) as T
    mutate(parsedFormData)
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      <textarea
        {...register("text")}
        placeholder="Fale um pouco sobre o que você está pensando..."
        className="h-32 resize-none p-3 rounded-lg border-2 border-black bg-gray-700 w-full"
      />
      <div className="flex flex-row justify-between">
        <div></div>
        <div>
          <button type="submit" className="self-end resize-none px-8 py-2 rounded-full bg-blue-600">Enviar</button>
        </div>
      </div>
    </form>
  )
}

export default NewPostInput
