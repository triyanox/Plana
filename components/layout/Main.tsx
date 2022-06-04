import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

type MainProps = {
  children: React.ReactNode;
};

export default function Main(props: MainProps) {
  return (
    <main className="w-full h-screen">
      <Navbar />
      {props.children}
      <Footer />
    </main>
  );
}
