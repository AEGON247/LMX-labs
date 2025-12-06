import Hero from "@/components/Hero";
import MenuCards from "@/components/MenuCards";
import StorySection from "@/components/StorySection";
import WorkCarousel from "@/components/WorkCarousel";
import Footer from "@/components/Footer";
import PizzaProcessSection from "@/components/PizzaProcessSection";
import ProcessSteps from "@/components/ProcessSteps";

export default function Home() {
  return (
    <main className="bg-eggplant min-h-screen w-full overflow-x-hidden">
      <div data-theme="dark"><Hero /></div>
      <div data-theme="dark"><MenuCards /></div>
      <div data-theme="light"><StorySection /></div>
      <div data-theme="dark"><WorkCarousel /></div>
      <div data-theme="light"><ProcessSteps /></div>
      <div data-theme="light"><Footer /></div>
    </main>
  );
}
