# Tasks App Database Queries

This repository contains the database queries used in the Tasks app. The queries are written in SQL and use the `sql` package from `@vercel/postgres`.

## Getting Started

To use these queries, you will need to have a PostgreSQL database set up and running. You will also need to install the `@vercel/postgres` package.

Once you have done this, you can import the queries into your code by using the following syntax:

```typescript
import { sql } from "@vercel/postgres";
```

## Queries

The following queries are available:

### Fetch All Tasks

This query fetches all tasks from the database, ordered by title in ascending order.

```typescript
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
```

### Fetch Pending Tasks

This query fetches the latest 5 pending tasks from the database.

```typescript
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
```

### Fetch Card Data

This query fetches data for the card component on the dashboard. It fetches the total number of tasks, the number of pending tasks, and the number of completed tasks.

```typescript
export async function fetchCardData() {

Generated by [BlackboxAI](https://www.blackbox.ai)
```