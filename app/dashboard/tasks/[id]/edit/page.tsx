import Form from "@/app/ui/tasks/edit-form";
import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
import { fetchTaskById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Task",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [task] = await Promise.all([
    fetchTaskById(id),
    // fetchCustomers(),
  ]);

  if (!task) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/dashboard/tasks" },
          {
            label: "Edit task",
            href: `/dashboard/tasks/${task.task_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} />
    </main>
  );
}
