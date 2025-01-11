"use client";
import { Bell, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { useRouter } from "next/navigation";
import { User, SlidersVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function MainNav() {
  const router = useRouter();
  const handleRoute = () => {
    router.push("dashboard/settings");
  };
  const handleAccount = () => {
    router.push("dashboard/account");
  };
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-full justify-start text-black"
            >
              <Button
                onClick={handleAccount}
                variant="ghost"
                className="text-black"
              >
                <User className="w-5 h-5 mr-3" />
                My Account
              </Button>
              <DropdownMenuSeparator />
              <Button
                onClick={handleRoute}
                variant="ghost"
                className="w-full justify-start text-black"
              >
                <SlidersVertical className="w-5 h-5 mr-3" />
                Settings
              </Button>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
