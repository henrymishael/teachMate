import Form from "@/app/ui/tasks/create-form";
import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";
import { fetchFilteredTasks, fetchTaskById, fetchTasks } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Create Task",
};

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/dashboard/tasks" },
          {
            label: "Create Task",
            href: "/dashboard/tasks/create",
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}
