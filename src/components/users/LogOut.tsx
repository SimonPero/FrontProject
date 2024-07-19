import { doLogout } from "@/app/actions";
import { Button } from "../ui/button";

export function LogOut() {
  return (
    <form action={doLogout}>
      <Button
        type="submit"
        name="action"
        className="mx-auto my-4 flex w-full items-center justify-evenly"
      >
        Log Out
      </Button>
    </form>
  );
}
