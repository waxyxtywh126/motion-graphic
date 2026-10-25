import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const App = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MyComposition}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
