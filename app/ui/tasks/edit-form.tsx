"use client";
import { State, updateTask } from "@/app/lib/action";

import { Task, TaskForm } from "@/app/lib/definition";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useFormState } from "react-dom";
import { formatDateToLocal } from "@/app/lib/utils";

export default function EditTaskForm({ task }: { task: TaskForm }) {
  const initialState: State = { message: null, errors: {} };

  const updateTaskWithId = updateTask.bind(null, task.task_id);
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-primary p-4 md:p-6'>
        {/* Customer Name */}
        <div className='mb-4'>
          <label htmlFor='title' className='mb-2 block text-sm font-medium'>
            Title
          </label>
          <div className='relative'>
            {/* <select
              id='customer'
              name='customerId'
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              defaultValue={task.title}
            >
              <option value='' disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' /> */}
            <input
              id='title'
              name='title'
              type='text'
              defaultValue={task.title}
              placeholder='Enter a title'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-accent'
            />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='mb-2 block text-sm font-medium'
          >
            Description
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='description'
                name='description'
                type='text'
                defaultValue={task.description}
                placeholder='Enter a description'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-accent'
              />
              <PencilIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-color' />
            </div>
          </div>
        </div>

        {/* Task Date
        <div className='mb-4'>
          <label htmlFor='end' className='mb-2 block text-sm font-medium'>
            Start Date
          </label>

          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='end'
                name='end'
                type='text'
                value={task?.date}
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='amount-error'
              />
            </div>
          </div>
        </div> */}

        {/* end date */}
        <div className='mb-4'>
          <label htmlFor='end' className='mb-2 block text-sm font-medium'>
            Due Date
          </label>

          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='end'
                name='end'
                type='text'
                defaultValue={formatDateToLocal(task.due_date)}
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-color bg-accent'
                aria-describedby='amount-error'
              />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>
            Set the invoice status
          </legend>
          <div className='rounded-md border border-gray-200 bg-accent px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='pending'
                  name='status'
                  type='radio'
                  value='pending'
                  defaultChecked={task.status === "pending"}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor='pending'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                >
                  Pending <ClockIcon className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='completed'
                  name='status'
                  type='radio'
                  value='completed'
                  defaultChecked={task.status === "completed"}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor='paid'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Completed <CheckIcon className='h-4 w-4' />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/tasks'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Edit Task</Button>
      </div>
    </form>
  );
}
