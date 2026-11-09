"use client";

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="mb-4 rounded bg-accent px-4 py-2 font-semibold text-background hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent print:hidden"
        >
            Print program
        </button>
    );
}
