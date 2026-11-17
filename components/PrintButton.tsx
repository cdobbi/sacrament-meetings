"use client";

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent print:hidden"
        >
            Print program
        </button>
    );
}
