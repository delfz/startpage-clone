import { EventHandler } from 'react';

// https://stackoverflow.com/a/43467144
export const isValidHttpUrl = (str: string) => {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const isValidYoutubeUri = (uri: string) => {
  const re = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
  return re.exec(uri);
};
