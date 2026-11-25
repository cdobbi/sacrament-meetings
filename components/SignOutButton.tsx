import { signOut } from "@/auth";

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}
        >
            <button
                type="submit"
                className="font-semibold underline-offset-4 hover:underline"
            >
                Sign Out
            </button>
        </form>
    );
}
