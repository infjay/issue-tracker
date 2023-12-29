"use client";
import {
  Button,
  Callout,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitted(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitted(false);
            setError("An unexpected Error happened");
          }
        })}
      >
        <TextFieldRoot>
          <TextFieldInput placeholder="Title" {...register("title")} />
        </TextFieldRoot>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message} </ErrorMessage>

        <Button disabled={submitted}>Submit New Issue {submitted && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
