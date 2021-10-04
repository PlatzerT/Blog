import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-3">
        <div className="text-4xl font-bold">Welcome</div>
        <Link href="/blog">
          <button className="px-10 border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2.5 text-white bg-blue-600">
            Blog
          </button>
        </Link>
      </div>
    </div>
  );
}
