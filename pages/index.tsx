import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Status } from "@prisma/client";

type todo = {
  text: string;
  status: Status;
};

const Home: NextPage = () => {
  const [data, setData] = useState<todo>({
    // name: "",
    text: "",
    status: Status.OPEN,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: data.name,
        text: data.text,
        status: data.status,
      }),
    });
    const result = await response.json();
    console.log(result);
  };
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <form
        className="w-full flex-col flex justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        {/* <input
          onChange={(event) => {
            setData({ ...data, name: event.target.value });
          }}
          className="w-2/3 px-8 py-3  bg-zinc-700 text-white rounded-lg"
          type="name"
          placeholder="Name"
          value={data.name}
        /> */}
        <input
          onChange={(event) => {
            setData({ ...data, text: event.target.value });
          }}
          className="w-2/3 px-8 py-3  bg-zinc-700 text-white rounded-lg"
          type="text"
          placeholder="text"
          value={data.text}
        />
        {/* <input
          onChange={(event) => {
            setData({ ...data, password: event.target.value });
          }}
          className="w-2/3 px-8 py-3  bg-zinc-700 text-white rounded-lg"
          type="password"
          placeholder="Password"
          value={data.password}
        /> */}
        <button
          className="w-2/3 px-8 py-3  bg-zinc-800 text-white rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
