import { General } from './general';
import { DangerZone } from './danger-zone';
import { RecoveryMode } from './recovery-mode';

export function VirtanceSettings({ id }: { id: number }) {
  return (
    <div className="space-y-8">
      <General id={id} />
      <hr className="my-6 dark:border-neutral-800" />
      <RecoveryMode id={id} />
      <hr className="my-6 dark:border-neutral-800" />
      <DangerZone id={id} />
    </div>
  );
}
