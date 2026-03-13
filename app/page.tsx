import { CMS_CARS } from "@/lib/cars";
import CarSelector from "@/components/CarSelector";

export default function Home() {
  return <CarSelector cars={CMS_CARS} />;
}
