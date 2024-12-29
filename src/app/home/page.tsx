import Banner from '../../components/Banner/Banner';
import Navbarin from '../../components/Navbar/index'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import Calendar from "@/components/Calender";
export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Home = () => {
  return (
    <main>
    <Navbarin />  
    <Banner />
    </main>
  );
};

export default Home;