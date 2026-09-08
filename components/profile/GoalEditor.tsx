import { Textarea } from '@/components/ui/textarea';

export function GoalEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <Textarea value={value} onChange={(event) => onChange(event.target.value)} />;
}
