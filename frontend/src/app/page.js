import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Home</h1>
        <Image src="/assets/logo.jpeg" alt="logo" width={200} height={200} />
      </div>
    </>
  );
}
