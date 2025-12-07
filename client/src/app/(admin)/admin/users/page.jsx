"use client";
import { USERTEST } from "@/data/user";
import { UsersProvider } from "./components/users-provider";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersTable } from "./components/users-table";
import { useRouter, useSearchParams } from "next/navigation";

const users = USERTEST;

export default function User() {
  const search = useSearchParams();
  const router = useRouter();

  return (
    <>
      <UsersProvider>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

          <UsersTable data={users} search={search} navigate={router} />
        <UsersDialogs />
      </UsersProvider>
    </>
  );
}
