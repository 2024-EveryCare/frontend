import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
  return (
    <div className="p-4">
      <Skeleton height={60} width="80%" className="mb-5" />
      <Skeleton height={40} width="90%" className="mb-4" />
      <Skeleton height={40} width="90%" className="mb-4" />
      <Skeleton height={40} width="90%" className="mb-4" />
      <Skeleton height={40} width="90%" className="mb-4" />
      <Skeleton height={40} width="90%" className="mb-4" />
      <Skeleton height={600} width="100%" />
    </div>
  );
};

export default Loading;
