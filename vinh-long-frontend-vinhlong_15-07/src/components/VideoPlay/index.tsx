import type { MediaType } from '@/interface/mediaType';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import { memo } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlay = ({
  media,
  className,
  file,
}: {
  media: MediaType;
  className?: string;
  file?: string;
}) => {
  const { data: mediaUrl } = useFetchMediaById(file || '');
  return (
    <div id="VideoPlay" className={`${className} w-full`}>
      {media?.type === 'Youtube' && (
        <ReactPlayer
          style={{ aspectRatio: '16/9' }}
          url={media?.uri || mediaUrl?.uri}
          width="100%"
          height="100%"
          controls
        />
      )}

      {media?.type === 'Video' && (
        <ReactPlayer
          style={{ aspectRatio: '16/9' }}
          url={media?.videoHls?.uri || media?.uri || mediaUrl?.uri}
          width="100%"
          height="100%"
          controls
        />
      )}
    </div>
  );
};

export default memo(VideoPlay);
