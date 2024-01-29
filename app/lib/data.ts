import { unstable_noStore as noStore } from "next/cache";

import { sql } from "@vercel/postgres";
import {
  PendingTask,
  Task,
  TaskForm,
  TasksTable,
  TasksTableType,
  User,
} from "./definition";
import { formatDateToLocal } from "./utils";

export async function fetchTasks() {
  try {
    const data = await sql<Task>`
      SELECT
        task_id,
        title
      FROM tasks
      ORDER BY title ASC
    `;

    const tasks = data.rows;
    return tasks;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all tasks.");
  }
}

export async function fetchPendingTasks() {
  noStore();
  try {
    const data = await sql<PendingTask>`
        SELECT tasks.title, tasks.due_date, tasks.task_id, tasks.status
        FROM tasks
        
        LIMIT 5`;

    const pendingTasks = data.rows.map((task) => ({
      ...task,
    }));
    return pendingTasks;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database Error:", error.message);
      console.error(error.stack);
    } else {
      console.error("Unknown Error:", error);
    }
    throw new Error(
      "Failed to fetch the latest Tasks. Check the logs for details."
    );
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;

    const taskStatusPromise = sql`SELECT
        COUNT(CASE WHEN status = 'completed' THEN 1 END) AS "completed",
    COUNT(CASE WHEN status = 'pending' THEN 1 END) AS "pending"
         FROM tasks`;

    const data = await Promise.all([taskCountPromise, taskStatusPromise]);
    console.log("Data from SQL queries:", data);
    const numberOfTasks = Number(data[0].rows[0].count ?? "0");
    const numberOfPendingTasks = Number(data[1].rows[0].pending ?? "0");
    const numberOfCompletedTasks = Number(data[1].rows[0].completed ?? "0");

    return {
      numberOfTasks,
      numberOfPendingTasks,
      numberOfCompletedTasks,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchTaskById(id: string) {
  noStore();
  try {
    const data = await sql<TaskForm>`
      SELECT
        tasks.task_id,
        tasks.title,
        tasks.description,
        tasks.due_date,
        tasks.status
      FROM tasks
      WHERE tasks.task_id = ${id};
    `;

    const task = data.rows.map((task) => ({
      ...task,
      due_date: formatDateToLocal(task.due_date),
    }));
    console.log(task);
    return task[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch task.");
  }
}

const ITEMS_PER_PAGE = 3;
export async function fetchFilteredTasks(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.task_id,
        tasks.title,
        tasks.description,
        tasks.due_date,
        tasks.status

      FROM tasks
     
      WHERE
          tasks.title::text ILIKE ${`%${query}%`} OR
          tasks.description::text ILIKE ${`%${query}%`} OR
          tasks.due_date::text ILIKE ${`%${query}%`} OR
          tasks.status ILIKE ${`%${query}%`}
     
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function fetchTasksPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tasks
    WHERE
      tasks.title ILIKE ${`%${query}%`} OR
      tasks.description ILIKE ${`%${query}%`} OR
      tasks.due_date::text ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of tasks.");
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
