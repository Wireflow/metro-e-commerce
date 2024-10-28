import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

function SidebarSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-[120px]" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation Skeleton */}
        <SidebarGroup>
          <SidebarMenu>
            {Array.from({ length: 4 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Projects Skeleton */}
        <SidebarGroup>
          <div className="px-4 py-2">
            <Skeleton className="h-4 w-20" />
          </div>
          <SidebarMenu>
            {Array.from({ length: 3 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default SidebarSkeleton;
