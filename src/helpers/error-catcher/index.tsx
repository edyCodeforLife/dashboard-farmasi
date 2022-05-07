import React from 'react';
import { GetStorage } from '../local-storage';

interface Error {
  status: number;
  message: string;
  data: {
    message: string;
  };
  config: {
    url: string;
  }
}

interface Props {
  type?: string;
  error?: Error;
  file: string;
  func: string;
}

const catcher = (props: Props) => {
  const {
    error,
    type,
    file,
    func,
  } = props;

  const httpError = (
    error?.data?.message?.includes('Something Wrong')
    || error?.message?.includes('Something Wrong')
  );

  let message = `\`${error?.data?.message || error?.message || error}\``;
  const email = GetStorage('email');

  if (error?.status === 404) message = `\`Data or Url Not Found | URL: ${error?.config?.url || '/'} \``;
  if (error?.status === 504) message = `\`Failed to load content | URL: ${error?.config?.url || '/'}\``;
  if (httpError) message = 'Failed to load content with status code 504 || 503 || CORS error';

  const payload = {
    text: `[*${type || 'ERR'}*][*FE-DP*][*_${process.env.REACT_APP_ENV}_*][*${file}*][*${func}*][*${message}*][*_User Email: ${email}_*]`,
  };

  fetch(`${process.env.REACT_APP_SLACK_WEBHOOK}`, {
    method: 'post',
    body: JSON.stringify(payload),
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err?.message || 'error webhook');
  });
};

catcher.defaultProps = {
  type: 'ERR',
  error: {},
};

export default catcher;
