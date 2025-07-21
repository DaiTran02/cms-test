const DAY_IN_SEC = 86399000;

export const getHeaderDate = () => {
  let dateInfo = new Date();

  let day;
  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();

  switch (dateInfo.getDay()) {
    case 0:
      day = 'Chủ Nhật';
      break;
    case 1:
      day = 'Thứ hai';
      break;
    case 2:
      day = 'Thứ ba';
      break;
    case 3:
      day = 'Thứ tư';
      break;
    case 4:
      day = 'Thứ năm';
      break;
    case 5:
      day = 'Thứ sáu';
      break;
    case 6:
      day = 'Thứ bảy';
  }

  return {
    day,
    date,
    month,
    year,
  };
};

export const formatArticleDate = (timestamp: number) => {
  let dateInfo = new Date(timestamp);

  // let hour = ('0' + dateInfo.getHours()).slice(-2);
  // let min = ('0' + dateInfo.getMinutes()).slice(-2);
  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();

  const formatDate = `${date}/${month}/${year}`;

  return formatDate;
};

export const formatPodcastArticleDate = (timestamp: number) => {
  let dateInfo = new Date(timestamp);

  let hour = ('0' + dateInfo.getHours()).slice(-2);
  let min = ('0' + dateInfo.getMinutes()).slice(-2);
  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();

  const formatDate = `${date}/${month}/${year} | ${hour}:${min}`;

  return formatDate;
};
//sáng / chiều / tối
export const getTimePeriod = (timeStr: string) => {
  const [hourStr, minuteStr = '0', secondStr = '0'] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const totalMinutes = hour * 60 + minute;

  if (totalMinutes >= 300 && totalMinutes < 720) {
    return 'Sáng'; // 05:00 - 11:59
  } else if (totalMinutes >= 720 && totalMinutes < 1080) {
    return 'Chiều'; // 12:00 - 17:59
  } else {
    return 'Tối'; // 18:00 - 04:59
  }
};
export const formatTapChiInArticleDate = (timestamp: number) => {
  let dateInfo = new Date(timestamp);

  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();

  const formatDate = `${date}/${month}/${year}`;

  return formatDate;
};

export const formatDetailArticleDate = (timestamp: number) => {
  let dateInfo = new Date(timestamp);

  let hour = ('0' + dateInfo.getHours()).slice(-2);
  let min = ('0' + dateInfo.getMinutes()).slice(-2);
  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();
  let offset = new Date().getTimezoneOffset() / -60;
  let offsetString = offset < 0 ? `GMT${offset}` : `GMT+${offset}`;

  const formatDate = `${date}/${month}/${year} ${hour}:${min} ${offsetString}`;

  return formatDate;
};

export const formatReadArticleDate = (timestamp: number) => {
  let currentTimeStamp = new Date().getTime();

  // handle today
  if (currentTimeStamp - timestamp <= DAY_IN_SEC) {
    return 'Hôm nay';
  }

  // handle yesterday
  if (
    currentTimeStamp - timestamp > DAY_IN_SEC &&
    currentTimeStamp - timestamp <= DAY_IN_SEC * 2 + 1000
  ) {
    return 'Hôm qua';
  }

  // handle specific day
  let dateInfo = new Date(timestamp);

  let day;
  let date = ('0' + dateInfo.getDate()).slice(-2);
  let month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
  let year = dateInfo.getFullYear();

  switch (dateInfo.getDay()) {
    case 0:
      day = 'Chủ Nhật';
      break;
    case 1:
      day = 'Thứ hai';
      break;
    case 2:
      day = 'Thứ ba';
      break;
    case 3:
      day = 'Thứ tư';
      break;
    case 4:
      day = 'Thứ năm';
      break;
    case 5:
      day = 'Thứ sáu';
      break;
    case 6:
      day = 'Thứ bảy';
  }

  return `${day}, ngày ${date}/${month}/${year}`;
};

export const calculateProgressBarTime = (secs: any) => {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
};
