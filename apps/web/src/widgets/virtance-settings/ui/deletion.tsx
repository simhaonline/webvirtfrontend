import { deleteVirtance } from '@/entities/virtance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'ui/components/alert-dialog';
import { Button } from 'ui/components/button';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

export function Deletion({ id }: { id: number }) {
  const [isDeleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  async function onDelete() {
    try {
      setDeleting(true);
      await deleteVirtance(Number(id));
      navigate('/virtances');
    } catch (error) {
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="relative flex items-end justify-between overflow-hidden p-6 dark:border-neutral-700">
      <div className="absolute inset-0 -z-10 [background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#f9f9f9_20px,#f9f9f9_40px)] dark:[background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#1c1c1c_20px,#1c1c1c_40px)]"></div>
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border dark:border-neutral-700">
          <TrashIcon className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Delete virtance</h2>
          <p className="text-neutral-500">
            Note that deleting is irreversible action. You cannot restore any data.
          </p>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isDeleting} variant="destructive">
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your virtance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild onClick={onDelete}>
              <Button>Delete virtance</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
