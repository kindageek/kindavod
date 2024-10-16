'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabSelect({
  tabs,
}: {
  tabs: { id: string; name: string }[];
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tab = searchParams.get('tab') || tabs[0].id;

  function onTabChange(tabId: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('tab', tabId);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
