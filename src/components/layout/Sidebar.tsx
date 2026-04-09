'use client';

import Link from 'next/link';
import {
  SidebarHeader,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from '../ui/sidebar';
import Image from 'next/image';
import { getRoutes } from './routes';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useClientSettings } from '@/hooks/client';

export const Sidebar = () => {
  const { data } = useClientSettings();
  console.log('data', data);
  return (
    <ShadcnSidebar className="gap-4">
      <SidebarHeader>
        <Link href="#">
          <Image src="/images/logo.svg" alt="huumo" width={166} height={50} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {getRoutes().map(({ href, Icon, label, subRoutes }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton className="h-13" asChild>
                    <Link href={href}>
                      <div className="flex items-center gap-2">
                        <Icon width={20} height={20} />
                        <span>{label}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                  {subRoutes && (
                    <SidebarMenuSub>
                      {subRoutes.map(({ href, label }) => (
                        <SidebarMenuSubItem key={href}>
                          <SidebarMenuSubButton asChild>
                            <Link href={href}>{label}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="bg-[#EFF5F2] p-3 rounded-lg space-y-1 mb-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-foreground">
              PO Usage
            </span>
            <Button className="bg-[#516C6E] h-7 text-[12px]">Upgrade</Button>
          </div>
          <div className="space-y-1.5">
            <div className="text-[12px] text-secondary-foreground">
              {data?.data?.activePoCount} of {data?.data.maxPoLimit} used
            </div>
            <Progress
              value={data?.data?.activePoCount / 2}
              className="bg-[#EDFFF6] [&>div]:bg-[#20A665]"
            />
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};
