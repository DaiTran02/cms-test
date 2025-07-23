import React from 'react';
import { FaHeart } from 'react-icons/fa';

interface Comment {
  id: number;
  name: string;
  avatarUrl: string;
  time: string;
  date: string;
  content: string;
  likes: number;
}

const comments: Comment[] = [];
//  [
//   {
//     id: 1,
//     name: 'Tên người dùng',
//     avatarUrl: '/images/person1.png',
//     time: '15:00',
//     date: '20/4/2023',
//     content:
//       'Tôi mong tinh thần này sẽ được lan tỏa sâu rộng trong toàn hệ thống giáo dục, đóng góp hiệu quả trong cuộc chiến chống dịch Covid-19 của đất nước.',
//     likes: 30,
//   },
//   {
//     id: 2,
//     name: 'Tên người dùng',
//     avatarUrl: '/images/person2.png',
//     time: '15:00',
//     date: '20/4/2023',
//     content:
//       'Tôi mong tinh thần này sẽ được lan tỏa sâu rộng trong toàn hệ thống giáo dục, đóng góp hiệu quả trong cuộc chiến chống dịch Covid-19 của đất nước.',
//     likes: 30,
//   },
// ];

const Comments = ({ className }: { className?: string }) => {
  return (
    <div id="comments" className={`pt-5 ${className}`}>
      <h2 className="heading-2">Bình luận</h2>
      <div className="flex gap-3 w-full py-5 items-center">
        {/* Avatar */}
        <div className="w-10 h-full">
          <img
            src="https://i.pravatar.cc/40?img=4"
            alt="avatar"
            className="w-full h-10 rounded-full object-cover"
          />
        </div>

        {/* Input + Emoji + Button */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Viết bình luận..."
            // value={comment}
            // onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-t-none border-x-none border-b border-gray-300 text-sm px-2 py-2
             focus:outline-none placeholder-gray-500 w-full"
          />

          {/* Icon trạng thái/emoji */}
          <div className="flex items-center justify-between mt-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mx-1">
              <span className="text-gray-400 text-xs p-1 bg-grey rounded-full ">
                😊
              </span>
            </div>
            {/* Nút gửi */}
            <button
              // onClick={handleSubmit}
              className="block bg-grey px-4 py-1 rounded-full text-black"
            >
              Bình luận
            </button>
          </div>
        </div>
      </div>
      {comments &&
        comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`${
              index % 2 !== 0
                ? 'ml-[40px] border-b-none '
                : 'border-b pb-4 mb-3 '
            }`}
          >
            <div className="flex items-start gap-3 ">
              <div className="w-10 h-10 flexs">
                <img
                  src={comment.avatarUrl}
                  alt={comment.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{comment.name}</div>
                <div className="text-sm text-gray-500">
                  {comment.time}, {comment.date}
                </div>
                <p className="mt-2 text-sm text-gray-800">{comment.content}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span>{comment.likes}</span>
                  </div>
                  <button className="text-sm  hover:text-black">
                    Phản hồi
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
