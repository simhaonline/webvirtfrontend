import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'ui/components/skeleton';
import { State } from '@/shared/ui/state';
import {
  FirewallDeleteAlertDialog,
  useFirewall,
  deleteFirewall,
} from '@/entities/firewall';
import { Button } from 'ui/components/button';
import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import { useState } from 'react';
import { useToast } from 'ui/components/toast';
import { cx } from 'ui/lib';

export function FirewallLayout() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { uuid } = useParams();
  const { firewall, isBusy, error } = useFirewall(uuid!);
  const { toast } = useToast();
  const navigate = useNavigate();

  function openDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  async function onDelete() {
    firewall && (await deleteFirewall(firewall.uuid));

    toast({ title: 'Success', variant: 'default', description: 'Firewall was deleted' });

    navigate('/firewalls');
  }

  const links = [
    { label: 'Rules', to: ``, end: true },
    { label: 'Virtances', to: `virtances`, end: false },
  ] as const;

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display firewall at this time for some reason."
      />
    );
  }
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-4">
        {firewall ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{firewall.name}</h1>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {firewall.inbound_rules.length + firewall.outbound_rules.length} rules /{' '}
                  {firewall.virtance_ids.length} virtances
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={openDeleteDialog}
                disabled={isBusy}
                className="w-8 p-0"
                variant="secondary"
              >
                <TrashIcon className="mx-auto h-4 w-4 text-red-500" />
              </Button>
              <FirewallDeleteAlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onDelete={onDelete}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 shrink-0" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-32 shrink-0" />
                </div>
                <Skeleton className="h-2 w-64 shrink-0" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 shrink-0" />
              <Skeleton className="h-8 w-8 shrink-0" />
              <Skeleton className="h-8 w-8 shrink-0" />
            </div>
          </div>
        )}
      </header>
      <div className="mb-6 flex items-center gap-4 border-b dark:border-neutral-800">
        {links.map((link) => (
          <NavLink
            to={link.to}
            end={link.end}
            key={link.label}
            className={({ isActive }) =>
              cx(
                'px-2 py-4 font-medium',
                isActive
                  ? 'border-b border-black dark:border-white dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
