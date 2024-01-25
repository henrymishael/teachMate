"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: "Please add a title.",
  }),
  description: z.string({
    invalid_type_error: "Please fill in a description of your task.",
  }),

  //   amount: z.coerce
  //     .number()
  //     .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "completed"], {
    invalid_type_error: "Please select a task status status.",
  }),
  date_created: z.string(),
  due_date: z.string(),
});

const CreateTask = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    status?: string[];
    date_created?: string[];
    due_date?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    date_created: formData.get("date_created"),
    due_date: formData.get("due_date"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Tasks.",
    };
  }

  // Prepare data for insertion into the database
  const { title, description, status, date_created, due_date } =
    validatedFields.data;
  //   const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  //   const due_date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
            INSERT INTO tasks (title, description, status, created_date, due_date)
            VALUES (${title}, ${description}, ${status}, ${date}, ${date})  
        `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Task.",
    };
  }
  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
}

const UpdateTask = FormSchema.omit({ id: true, date: true });

// ...

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Task.",
    };
  }

  const { title, description, status } = validatedFields.data;
  //   const amountInCents = amount * 100;
  try {
    await sql`
    UPDATE invoices
    SET task_id= ${id}, title = ${title}, description = ${description}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Task.",
    };
  }
  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/tasks");
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Task.",
    };
  }
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }
