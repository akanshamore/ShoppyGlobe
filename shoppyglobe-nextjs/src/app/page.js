import Image from "next/image";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main style={{ marginTop: "64px" }}>
        <Products />
      </main>
    </div>
  );
}
