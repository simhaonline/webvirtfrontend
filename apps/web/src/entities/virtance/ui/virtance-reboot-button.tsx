import ArrowPathIcon from '@heroicons/react/20/solid/ArrowPathIcon';
import { Button } from 'ui/components/button';
import { cx } from 'ui/lib';
import { type MouseEvent } from 'react';
import type { ActionType, VirtanceStatus } from '../types';

interface Props {
  id: number;
  status: VirtanceStatus;
  onToggle: (payload: ActionType) => void;
}

export function VirtanceRebootButton({ id, status, onToggle }: Props) {
  function handleClick(e: MouseEvent) {
    e.preventDefault();
    onToggle({ id, action: 'reboot' });
  }

  return (
    <Button
      disabled={status === 'pending' || status === 'inactive'}
      variant="secondary"
      className="w-8 p-0"
      onClick={handleClick}
    >
      <ArrowPathIcon className={cx('mx-auto h-4 w-4')} />
    </Button>
  );
}
