"use client";

import { useFormState } from "react-dom";
// import { CustomerField } from "@/app/lib/definition";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { State, createTask } from "@/app/lib/action";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Customer Name */}
        <div className='mb-4'>
          <label htmlFor='title' className='mb-2 block text-sm font-medium'>
            Title
          </label>
          <div className='relative'>
            <input
              id='title'
              placeholder='Enter a title'
              className='peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='customer-error'
            ></input>
            <PencilIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          {/* <div id='customer-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div> */}
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
                placeholder='Enter a description'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 cursor-text'
                aria-describedby='amount-error'
              />
              <PencilIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
            <div id='amount-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

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
                type='date'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='amount-error'
              />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>
            Set the task status
          </legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='pending'
                  name='status'
                  type='radio'
                  value='pending'
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                  aria-describedby='status-error'
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
        <Button type='submit'>Create Task</Button>
      </div>
    </form>
  );
}
