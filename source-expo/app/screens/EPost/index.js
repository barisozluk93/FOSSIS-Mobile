import { EPostProductData } from '@/data';
import NPost, { modes } from '@/screens/NPost';

const EPost = () => {
  return <NPost mode={modes.bars} posts={EPostProductData} />;
};

export default EPost;
