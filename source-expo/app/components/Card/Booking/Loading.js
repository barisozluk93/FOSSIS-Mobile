import { Placeholder, PlaceholderLine } from '@/components/Placeholder';

const Loading = () => {
  return (
    <Placeholder style={{ marginVertical: 4 }}>
      <PlaceholderLine width={40} noMargin />
    </Placeholder>
  );
};

export default Loading;
