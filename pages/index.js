import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className=" flex justify-center w-full">
        <div className="bg-blue-600 w-3/4 p-4 text-white flex flex-col items-center gap-20">
          <h1>DEX</h1>
          <button className="h-10 flex items-center p-4 border-2 border-green-500 hover:bg-green-500 rounded-full">
            CREATE POOL
          </button>
        </div>
      </div>
    </>
  );
}
