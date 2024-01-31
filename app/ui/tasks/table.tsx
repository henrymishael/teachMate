import Image from "next/image";
import { UpdateTask, DeleteTask } from "@/app/ui/tasks/buttons";
import TaskStatus from "@/app/ui/tasks/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredTasks } from "@/app/lib/data";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-primary p-2 md:pt-0'>
          <div className='md:hidden'>
            {tasks?.map((task) => (
              <div
                key={task.task_id}
                className='mb-2 w-full rounded-md bg-accent p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <div className='mb-2 flex items-center'>
                      {/* <Image
                        src={invoice.image_url}
                        className='mr-2 rounded-full'
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{task.title}</p>
                    </div>
                    {/* <p className='text-sm text-gray-500'>{invoice.email}</p> */}
                  </div>
                  <TaskStatus status={task.status} />
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {/* {formatDateToLocal(task.date_created)} */}
                    </p>
                    <p>{formatDateToLocal(task.due_date)}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <UpdateTask id={task.task_id} />
                    <DeleteTask id={task.task_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  Title
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Description
                </th>
                {/* <th scope='col' className='px-3 py-5 font-medium'>
                  Start Date
                </th> */}
                <th scope='col' className='px-3 py-5 font-medium'>
                  Due Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Status
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {tasks?.map((task) => (
                <tr
                  key={task.task_id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex items-center gap-3'>
                      {/* <Image
                        src={invoice.image_url}
                        className='rounded-full'
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{task.title}</p>
                    </div>
                  </td>
                  <td className='px-3 py-3'>{task.description}</td>
                  {/* <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(task.due_date)}
                  </td> */}
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(task.due_date)}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <TaskStatus status={task.status} />
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <UpdateTask id={task.task_id} />
                      <DeleteTask id={task.task_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
