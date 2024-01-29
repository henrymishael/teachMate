"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { formatDateToLocal } from "./utils";

const FormSchema = z.object({
  task_id: z.string(),
  title: z.string({
    invalid_type_error: "Please add a title.",
  }),
  description: z.string({
    invalid_type_error: "Please fill in a description of your task.",
  }),

  status: z.enum(["pending", "completed"], {
    invalid_type_error: "Please select a task status.",
  }),
  due_date: z.string(),
});

const CreateTask = FormSchema.omit({ task_id: true });

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    due_date?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }

  // Prepare data for insertion into the database
  const { title, description, due_date, status } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tasks (title, description, due_date, status)
      VALUES (${title}, ${description}, ${due_date}, ${status})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create Task.",
    };
  }
  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
}

const UpdateTask = FormSchema.omit({ task_id: true });

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Task.",
    };
  }

  const { title, description, due_date, status } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET title = ${title}, description = ${description}, due_date = ${due_date}, status = ${status}
      WHERE task_id = ${id}
    `;
  } catch (error) {
    // console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Update Task.",
    };
  }

  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
}

export async function deleteTask(id: string) {
  try {
    await sql`DELETE FROM tasks WHERE task_id = ${id}`;
    revalidatePath("/dashboard/tasks");
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Task.",
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
