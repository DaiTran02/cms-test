// import { forwardRef, memo, useEffect, useState } from 'react';
// import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';

// import { useAudioPlayerContext } from '@/context/AudioPlayerContext';
// import { calculateProgressBarTime } from '@/utils/Format';
// import Image from 'next/image';
// import Container from '../Container/Container';
// import styles from './PodcastAudioPlayer.module.css';

// const PodcastPopUp = ({
//   imgSrc,
//   cateName,
//   date,
//   title,
//   alias,
//   type,
//   mediaSrc,
//   className,
//   isPopUp,
// }: {
//   imgSrc?: string;
//   cateName?: string;
//   date?: number;
//   title?: string;
//   alias?: string;
//   type?: string;
//   mediaSrc?: string;
//   className?: string;
//   isPopUp?: boolean;
// }) => {
//   const {
//     audioRef,
//     progressBarRef,
//     volumeBarRef,
//     isPlaying,
//     duration,
//     currentTime,
//     onInitLoad,
//     onEnded,
//     togglePlaying,
//     convertAudioToPlayhead,
//     backFifteen,
//     forwardFifteen,
//     volume,
//     mute,
//     setMute,
//     convertVolumeToPlayhead,
//   } = useAudioPlayerContext();

//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleLoaded = () => {
//       setIsLoaded(true);
//       onInitLoad();
//     };

//     audio.addEventListener('loadedmetadata', handleLoaded);
//     return () => {
//       audio.removeEventListener('loadedmetadata', handleLoaded);
//     };
//   }, [audioRef]);

//   return (
//     <div
//       className={`bg-white w-full h-[120px] ${
//         isPopUp == true
//           ? ' fixed z-[50] bottom-0 opacity-[1] pointer-events-auto'
//           : 'fixed z-[50] pointer-events-none bottom-0 opacity-0'
//       }`}
//     >
//       <Container className="h-full">
//         <div
//           id="podcastAudioPlayer"
//           className={`${styles['podcast-popup']} flex items-center h-full w-full gap-7 p-2 ${className}`}
//         >
//           {/* image */}
//           <div className="image flex items-center  gap-4 max-w-[400px]">
//             <div className="h-full rounded-[10px] overflow-hidden">
//               {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
//                 <Image
//                   width={130}
//                   height={80}
//                   className="w-full object-cover"
//                   src={imgSrc || '/images/logo_vl_art.png'}
//                   alt="Anh minh hoa"
//                   style={{ aspectRatio: '1/1' }}
//                   loading="lazy"
//                 />
//               ) : (
//                 <img
//                   className="w-full object-cover"
//                   src={imgSrc || ''}
//                   alt="Anh minh hoa"
//                   style={{ aspectRatio: '1/1' }}
//                   loading="lazy"
//                 />
//               )}
//             </div>
//             {/* title */}
//             <div className="heading-4 opacity-[1] max-md:opacity-[0] max-md:hidden">
//               {title}
//             </div>
//           </div>
//           {/* player */}
//           <div className="flex-1 flex flex-col justify-center items-center">
//             <div
//               className="max-w-[140px] gap-5
//              flex items-center w-full justify-between
//               max-md:max-w-fit max-md:justify-between max-md:flex-col"
//             >
//               <div className="flex gap-2 items-center">
//                 <div
//                   className="flex flex-col items-center cursor-pointer"
//                   onClick={backFifteen}
//                 >
//                   <img className="w-6" srcSet="/images/icons/back.png 2x" />
//                   <div className="text-black text-[8px] font-medium">15s</div>
//                 </div>
//                 <button onClick={togglePlaying} disabled={!isLoaded}>
//                   {!isLoaded ? (
//                     <div className="w-[60px] h-[60px] flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-black" />
//                     </div>
//                   ) : !isPlaying ? (
//                     <IoPlayCircleOutline size="60px" color="#393939" />
//                   ) : (
//                     <IoPauseCircleOutline size="60px" color="#393939" />
//                   )}
//                 </button>
//                 <div
//                   className="flex flex-col items-center cursor-pointer"
//                   onClick={forwardFifteen}
//                 >
//                   <img className="w-6" srcSet="/images/icons/next.png 2x" />
//                   <div className="text-black text-[8px] font-medium">15s</div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full">
//               <div className="title-main hidden opacity-[0] mb-5 max-md:opacity-[1] max-md:block">
//                 {title}
//               </div>
//               <div className=" flex items-center gap-2 max-md:mb-[10px] ">
//                 <div className="text-black text-sm">
//                   {calculateProgressBarTime(currentTime)}
//                 </div>
//                 <audio
//                   ref={audioRef}
//                   src={mediaSrc}
//                   preload="metadata"
//                   onEnded={onEnded}
//                   muted={mute}
//                 />
//                 <input
//                   ref={progressBarRef}
//                   type="range"
//                   min="0"
//                   max="100"
//                   step="0.1"
//                   value={(currentTime / duration) * 100 || 0}
//                   className={`${styles['progress__bar']} w-full`}
//                   onChange={convertAudioToPlayhead}
//                   disabled={!isLoaded}
//                 />
//                 <div className="text-black text-sm">
//                   {duration && calculateProgressBarTime(duration)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default memo(forwardRef(PodcastPopUp));
