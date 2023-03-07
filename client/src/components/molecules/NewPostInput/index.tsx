import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { ZodRawShape } from "zod"
import { NewPostInputProps } from "./types"

function NewPostInput<T extends FieldValues, F extends ZodRawShape>({
  mutate,
  fieldsParser,
  className,
  ...rest
}: NewPostInputProps<T, F>) {
  const { register, handleSubmit, reset } = useForm<any>()

  const submitHandler: SubmitHandler<T> = (formData) => {
    const parsedFormData = fieldsParser.parse(formData) as T
    mutate(parsedFormData)
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={"flex flex-row rounded-xl overflow-hidden border-4 border-black " + className ?? ''}
      {...rest}
    >
      <textarea
        {...register("text")}
        placeholder="Fale um pouco sobre o que você está pensando..."
        className="block h-32 w-full resize-none  bg-gray-700 p-3 custom-scroll"
      />
      <button
        type="submit"
        className="block  bg-indigo-600 px-8 py-2"
      >
        Enviar
      </button>
    </form>
  )
}

export default NewPostInput
