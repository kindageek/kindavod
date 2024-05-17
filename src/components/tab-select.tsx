'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TabSelect({
  tabs,
  tabId,
  onTabChange,
}: {
  tabs: { id: string; name: string }[];
  tabId: string;
  onTabChange: (tabId: string) => void;
}) {
  return (
    <>
      <Tabs
        value={tabId}
        onValueChange={onTabChange}
        className='hidden sm:flex'
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className='flex justify-end w-full sm:hidden'>
        <Select value={tabId} onValueChange={onTabChange}>
          <SelectTrigger className='w-40'>
            <SelectValue aria-label={tabId}>
              {tabs.find((t) => t.id === tabId)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.id} value={tab.id}>
                {tab.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
