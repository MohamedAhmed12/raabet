import AnimatedBar from './components/AnimatedBar/page';
import { CentralizePresence } from './components/CentralizePresence';
import { GroubBlock } from './components/GroubBlock';
import { TryNow } from './components/TryNow';
import { WhyUs } from './components/WhyUs';

export default function Home() {
  return (
    <div className=''>
      <CentralizePresence />
      <AnimatedBar />
      <WhyUs />
      <GroubBlock />
      <TryNow />
    </div>
  );
}
