import React from 'react';
// import MediaPlayer from '../MediaPlayer';
// import { useFetchMediaById } from '@/hooks/useHttp';
// import Container1240 from '../Layouts/Container1240';
import type { Article } from '@/interface/propsGlobal';
import { useFetchMediaById } from '@/Services/ClientServices/media';
import Container from '../Container/Container';
import VideoPlay from '../VideoPlay';

const ModelPopupVideo = ({
  closeModel,
  postMedia,
}: {
  closeModel: (e: any) => void;
  postMedia: any;
}) => {
  const { data: media } = useFetchMediaById(postMedia[0]?.file);

  return (
    <div className="fixed top-0 w-screen right-0 z-[999] h-screen overflow-hidden bg-[#0f0f0fde]">
      <Container className="w-full h-full flex items-center flex-col justify-center p-8">
        <button
          className="block text-white cursor-pointer w-full text-end"
          onClick={closeModel}
        >
          Đóng
        </button>
        {/* <div className=""> */}
        {media && <VideoPlay media={media} className="h-[95%]" />}
        {/* </div> */}
      </Container>
    </div>
  );
};

export default ModelPopupVideo;
