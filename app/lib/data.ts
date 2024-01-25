import { sql } from '@vercel/postgres';
import {
    PendingTask,
    Task,
    TaskForm,
    TasksTable,
    TasksTableType,
} from './definition';

export async function fetchLatestInvoices() {
   
    try {
      const data = await sql<PendingTask>`
        SELECT tasks.title, tasks.date_created, tasks.due_date, task.task_id
        FROM tasks
        ORDER BY tasks.created_date DESC
        LIMIT 5`;
  
      const pendingTask = data.rows.map((task) => ({
        ...task,
       
      }));
      return pendingTask;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the pending Tasks.');
    }
  }