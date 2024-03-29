import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  completed: UserGroupIcon,
  pending: ClockIcon,
  tasks: InboxIcon,
};

export default async function CardWrapper() {
  const { numberOfTasks, numberOfPendingTasks, numberOfCompletedTasks } =
    await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title='Completed' value={numberOfCompletedTasks} type='completed' />
      <Card title='Pending' value={numberOfPendingTasks} type='pending' />
      <Card title='Total Tasks' value={numberOfTasks} type='tasks' />
      {/* <Card
        title='Total Customers'
        value={numberOfCustomers}
        type='customers'
      /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "tasks" | "pending" | "completed";
}) {
  const Icon = iconMap[type];

  return (
    <div className='rounded-xl bg-primary p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-color' /> : null}
        <h3 className='ml-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-accent  px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
