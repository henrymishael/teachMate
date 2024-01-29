export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "completed";
};

export type PendingTask = {
  task_id: string;
  title: string;
  due_date: string;
  status: "pending";
};

export type PendingTaskRaw = Omit<PendingTask, "description"> & {
  description: string;
};

export type TasksTable = {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "completed";
};

export type TasksTableType = {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "completed";
};

export type TaskForm = {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "completed";
};


