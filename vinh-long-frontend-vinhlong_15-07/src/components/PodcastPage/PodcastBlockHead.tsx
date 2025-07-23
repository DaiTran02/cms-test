import { forwardRef, memo, useEffect, useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { FiShare } from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi';
import {
  IoPauseCircleOutline,
  IoPlayCircleOutline,
  IoVolumeHighOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  IoVolumeMuteOutline,
  IoVolumeOffOutline,
} from 'react-icons/io5';

import { useAudioPlayerContext } from '@/context/AudioPlayerContext';
import {
  calculateProgressBarTime,
  formatPodcastArticleDate,
} from '@/utils/Format';
import Image from 'next/image';
import styles from './PodcastAudioPlayer.module.css';
import Container from '../Container/Container';

const PodcastBlockHead = ({
  imgSrc,
  cateName,
  date,
  title,
  alias,
  type,
  mediaSrc,
  className,
}: {
  imgSrc?: string;
  cateName?: string;
  date?: number;
  title?: string;
  alias?: string;
  type?: string;
  mediaSrc?: string;
  className?: string;
}) => {
  const {
    audioRef,
    progressBarRef,
    volumeBarRef,
    isPlaying,
    duration,
    currentTime,
    onInitLoad,
    onEnded,
    togglePlaying,
    convertAudioToPlayhead,
    backFifteen,
    forwardFifteen,
    volume,
    mute,
    setMute,
    convertVolumeToPlayhead,
    progressBarPopUpRef,
  } = useAudioPlayerContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [podcastScroll, setPodcastScroll] = useState(false);
  const handleHeaderScroll = () => {
    if (window.scrollY >= 500) {
      setPodcastScroll(true);
    } else {
      setPodcastScroll(false);
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      onInitLoad(); // nếu bạn đang dùng để setup gì đó
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    window.addEventListener('scroll', handleHeaderScroll);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, [audioRef]);

  return (
    <div>
      <div
        id="podcastAudioPlayer"
        className={`flex gap-[60px] w-full max-lg:flex-col max-lg:gap-5 ${
          isLoaded ? 'bg-grey' : 'bg-grey'
        }  p-5 rounded-[20px] ${className}`}
      >
        {/* image */}
        <div className="image w-[295px] flex-shrink-0 max-lg:w-full">
          <div>
            {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
              <Image
                width={259}
                height={166}
                className="w-full object-cover rounded-[20px]"
                src={imgSrc || '/images/logo_vl_art.png'}
                alt="Anh minh hoa"
                style={{ aspectRatio: '1/1' }}
                loading="lazy"
              />
            ) : (
              <img
                width={259}
                height={166}
                className="w-full object-cover rounded-[20px]"
                src={imgSrc || ''}
                alt="Anh minh hoa"
                style={{ aspectRatio: '1/1' }}
                loading="lazy"
              />
            )}
          </div>
        </div>
        {/* player */}
        <div className="flex-1 flex flex-col justify-center ">
          {/* subtitle */}
          <div className="flex items-center gap-3 mb-2">
            <div className="text-black text-sm font-medium uppercase">
              {cateName}
            </div>
            {date && cateName && (
              <div className="w-2 h-2 bg-[#ededed] rounded-full"></div>
            )}
            <div className="text-black text-[13px] font-normal">
              {date && formatPodcastArticleDate(date)}
            </div>
          </div>

          {/* title */}
          <div className="title-main opacity-[1] mb-5 max-md:opacity-[0] max-md:hidden">
            {title}
          </div>

          {/* audio player */}
          <div className="border-b-[0.5px] border-black pb-3 mb-3">
            <audio
              ref={audioRef}
              src={mediaSrc}
              preload="metadata"
              onEnded={onEnded}
              muted={mute}
            />
            <div className="flex items-center gap-5 max-md:items-end">
              <div
                className="max-w-[140px] gap-5
             flex items-center w-full justify-between 
              max-md:max-w-fit max-md:justify-between max-md:flex-col"
              >
                <button onClick={togglePlaying} disabled={!isLoaded}>
                  {!isLoaded ? (
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-black" />
                    </div>
                  ) : !isPlaying ? (
                    <IoPlayCircleOutline size="60px" color="#393939" />
                  ) : (
                    <IoPauseCircleOutline size="60px" color="#393939" />
                  )}
                </button>

                <div className="flex gap-2 items-center">
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={backFifteen}
                  >
                    <img className="w-6" srcSet="/images/icons/back.png 2x" />
                    <div className="text-black text-[8px] font-medium">15s</div>
                  </div>

                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={forwardFifteen}
                  >
                    <img className="w-6" srcSet="/images/icons/next.png 2x" />
                    <div className="text-black text-[8px] font-medium">15s</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="title-main hidden opacity-[0] mb-5 max-md:opacity-[1] max-md:block">
                  {title}
                </div>
                <div className=" flex items-center gap-2 max-md:mb-[10px]">
                  <div className="text-black text-sm">
                    {calculateProgressBarTime(currentTime)}
                  </div>
                  <input
                    ref={progressBarRef}
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={(currentTime / duration) * 100 || 0}
                    className={`${styles['progress__bar']} w-full`}
                    onChange={convertAudioToPlayhead}
                    disabled={!isLoaded}
                  />
                  <div className="text-black text-sm">
                    {duration && calculateProgressBarTime(duration)}
                  </div>
                </div>
                {/* progress bar */}
              </div>
            </div>
          </div>

          {/* bottom: volume and actions */}
          <div className="flex justify-between max-md:gap-2 max-md:flex-col max-md:items-center">
            <div className="flex items-center">
              <button className="flex items-center gap-1">
                <BiComment size="20px" color="#393939" />
                <span className="text-[8px] text-black font-medium uppercase">
                  Bình luận
                </span>
              </button>
              <button className="flex items-center gap-1 border-x border-x-black px-4 mx-4">
                <FiShare size="20px" color="#393939" />
                <span className="text-[8px] text-black font-medium uppercase">
                  Chia sẻ
                </span>
              </button>
              <button className="flex items-center gap-1">
                <HiOutlineBookmark size="20px" color="#393939" />
                <span className="text-[8px] text-black font-medium uppercase">
                  Lưu
                </span>
              </button>
            </div>

            {/* volume */}
            <div className="flex items-center gap-3">
              <button onClick={() => setMute(!mute)}>
                {mute ? (
                  <IoVolumeMuteOutline size="24px" color="#393939" />
                ) : volume >= 66 ? (
                  <IoVolumeHighOutline size="24px" color="#393939" />
                ) : volume >= 33 ? (
                  <IoVolumeMediumOutline size="24px" color="#393939" />
                ) : volume > 0 ? (
                  <IoVolumeLowOutline size="24px" color="#393939" />
                ) : (
                  <IoVolumeOffOutline size="24px" color="#393939" />
                )}
              </button>
              <input
                ref={volumeBarRef}
                type="range"
                min={0}
                max={100}
                value={volume}
                className={`${styles['volume__bar']} w-[150px] bg-black`}
                onChange={convertVolumeToPlayhead}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] w-full h-[120px] py-4 overflow-hidden left-0 fixed z-[50] bottom-0 transform transition-all duration-500 ease-in-out ${
          podcastScroll
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <Container className="h-full">
          <div
            id="podcastAudioPlayer"
            className={`${styles['podcast-popup']} flex items-center h-full w-full gap-7`}
          >
            {/* image */}
            <div className="flex items-center gap-4 max-w-[400px]">
              <div className="h-full max-w-[90px] rounded-[10px] overflow-hidden">
                {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
                  <Image
                    width={130}
                    height={130}
                    className="w-full object-cover"
                    src={imgSrc || '/images/logo_vl_art.png'}
                    alt="Anh minh hoa"
                    style={{ aspectRatio: '1/1' }}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="w-full object-cover"
                    src={imgSrc || ''}
                    alt="Anh minh hoa"
                    style={{ aspectRatio: '1/1' }}
                    loading="lazy"
                  />
                )}
              </div>
              {/* title */}
              <div className="heading-4 opacity-[1] max-md:opacity-[0] max-md:hidden">
                {title}
              </div>
            </div>
            {/* player */}
            <div className="flex-1 flex flex-col justify-center items-center">
              <div
                className="max-w-[140px] gap-5
             flex items-center w-full justify-between 
              max-md:max-w-fit max-md:justify-between max-md:flex-col"
              >
                <div className="flex gap-2 items-center">
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={backFifteen}
                  >
                    <img className="w-6" srcSet="/images/icons/back.png 2x" />
                    <div className="text-black text-[8px] font-medium">15s</div>
                  </div>
                  <button onClick={togglePlaying} disabled={!isLoaded}>
                    {!isLoaded ? (
                      <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-black" />
                      </div>
                    ) : !isPlaying ? (
                      <IoPlayCircleOutline size="60px" color="#393939" />
                    ) : (
                      <IoPauseCircleOutline size="60px" color="#393939" />
                    )}
                  </button>
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={forwardFifteen}
                  >
                    <img className="w-6" srcSet="/images/icons/next.png 2x" />
                    <div className="text-black text-[8px] font-medium">15s</div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="title-main hidden opacity-[0] mb-5 max-md:opacity-[1] max-md:block">
                  {title}
                </div>
                <div className=" flex items-center gap-2 max-md:mb-[10px] ">
                  <div className="text-black text-sm">
                    {calculateProgressBarTime(currentTime)}
                  </div>
                  <audio
                    ref={audioRef}
                    src={mediaSrc}
                    preload="auto"
                    onEnded={onEnded}
                    muted={mute}
                  />
                  <input
                    ref={progressBarPopUpRef}
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={(currentTime / duration) * 100 || 0}
                    className={`${styles['progress__bar']} w-full`}
                    onChange={convertAudioToPlayhead}
                    disabled={!isLoaded}
                  />
                  <div className="text-black text-sm">
                    {duration && calculateProgressBarTime(duration)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default memo(forwardRef(PodcastBlockHead));
