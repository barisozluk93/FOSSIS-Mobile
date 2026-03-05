import { FPostListData } from '@/data';
import NPost, { modes } from '@/screens/NPost';

const FPost = () => {
  return <NPost mode={modes.thList} posts={FPostListData} />;
};

export default FPost;
