import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { fetchPendingTasks } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
export default async function LatestTasks() {
  const pendingTasks = await fetchPendingTasks();
  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Tasks
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-primary p-4'>
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className='background-color px-6'>
          {pendingTasks.map((task, i) => {
            // Assuming task.due_date is expected to be a string or undefined
            const dueDate = formatDateToLocal(task.due_date);

            return (
              <div
                key={task.task_id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className='flex items-center'>
                  {/* <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className='mr-4 rounded-full'
                    width={32}
                    height={32}
                  /> */}
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold md:text-base text-color'>
                      {task.title}
                    </p>
                    <p className='hidden text-sm text-gray-500 sm:block'>
                      {dueDate}
                    </p>
                  </div>
                </div>
                <p
                  className={`${
                    lusitana.className
                  } indicator truncate text-sm font-medium md:text-base ${
                    task.status === "pending" ? "Pending" : "Completed"
                  } `}
                >
                  {task.status}
                </p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <ArrowPathIcon className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500 '>Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
