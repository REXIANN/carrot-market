import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col space-y-5 p-5">
      <details className={"select-none open:bg-indigo-400 open:text-white"}>
        <summary className={"cursor-pointer select-none"}>
          Title for detail
        </summary>
        <span className={""}>kimchi</span>
      </details>
      <ul className={"list-decimal marker:text-teal-500"}>
        <li>123</li>
        <li>234</li>
        <li>234</li>
      </ul>
      <input
        type={"file"}
        className={
          "file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-400 file:px-5 file:text-white file:transition-colors" +
          "file:hover:text-purple-300 file:hover:bg-white file:hover:border-purple-100 file:hover:border-2"
        }
      />
      <p className={"first-letter:text-7xl first-letter:hover:text-purple-400"}>Lorem ipsum</p>
    </div>
  );
};

export default Home;
