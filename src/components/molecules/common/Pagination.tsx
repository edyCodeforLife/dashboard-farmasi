import React, { ReactElement } from 'react';
import Icon from '@mui/material/Icon';

import Button from '@atoms/common/Button';

interface ButtonParams {
  text: string;
  active: boolean;
  handler: any;
  disabled: boolean;
}

const ButtonPagination = (pages: ButtonParams) => {
  const {
    text,
    active,
    handler,
    disabled,
  } = pages;

  return (
    <Button
      text={text}
      disabled={disabled}
      handler={() => handler()}
      classes={`w-6 h-6 rounded-full ${active && 'bg-mainColor text-white'} mx-1 text-xs flex justify-center items-center`}
    />
  );
};

interface Props {
  totalData?: number;
  setRows?: any;
  listRange?: Array<any>;
  handler?: any;
  total: number;
  active: number;
  disabled?: boolean;
  maxPage?: number;
}

const Pagination = (props: Props) => {
  const {
    totalData,
    setRows,
    listRange,
    active,
    total,
    handler,
    disabled,
    maxPage,
  } = props;

  const optionComponent = () => {
    const pageComponent: ReactElement[] = [];
    listRange?.forEach((item) => {
      pageComponent.push(
        <option value={item}>{item}</option>,
      );
    });
    return pageComponent;
  };

  const componentButtonPagination = (index: number, activeParams: number) => (
    <div key={index} className="inline-block">
      <ButtonPagination
        text={`${index}`}
        disabled={disabled || false}
        active={activeParams === index}
        handler={() => handler(index)}
      />
    </div>
  );
  const loop = (activeParams: number) => {
    const pageComponent: ReactElement[] = [];
    const tempTotal = maxPage ? maxPage * maxPage : total;
    if (total <= tempTotal) {
      // ini function aslinya
      for (let i = 1; i <= total; i += 1) {
        pageComponent.push(componentButtonPagination(i, activeParams));
      }
    } else {
      const limit = activeParams - (maxPage || 0);
      if (limit <= 0) {
        for (let i = 1; i <= tempTotal + 1; i += 1) {
          pageComponent.push(componentButtonPagination(i, activeParams));
        }
      } else if (activeParams >= total - (maxPage || 0)) {
        for (let i = activeParams - (maxPage || 0); i <= total; i += 1) {
          pageComponent.push(componentButtonPagination(i, activeParams));
        }
      } else {
        const loop1 = activeParams - (maxPage || 0);
        const loop2 = activeParams + (maxPage || 0);
        if (maxPage) {
          for (let i = loop1; i <= activeParams; i += 1) {
            pageComponent.push(componentButtonPagination(i, activeParams));
          }
          for (let i = activeParams + 1; i <= loop2; i += 1) {
            pageComponent.push(componentButtonPagination(i, activeParams));
          }
        }
      }
    }

    return pageComponent;
  };

  return (
    <div className="inline-block flex justify-center items-center">
      {
        listRange
          && listRange.length > 0
          ? (
            <div className="mr-8 font-normal text-sm">
              <span className="mr-3">Rows per page: </span>
              <select name="range border-2" value={totalData} onChange={(e) => setRows(e.target.value)}>
                {optionComponent()}
              </select>
            </div>
          ) : <div />
      }
      <Button
        classes="px-2 pt-1"
        disabled={active === 1}
        handler={() => handler(1)}
        icon={(
          <i className={active < 2 ? 'text-gray-300' : ''}>
            <Icon fontSize="inherit">keyboard_double_arrow_left</Icon>
          </i>
        )}
      />
      <Button
        classes="px-2 pt-1"
        disabled={active < 2}
        handler={() => handler(active - 1)}
        icon={(
          <i className={active < 2 ? 'text-gray-300' : ''}>
            <Icon fontSize="inherit">arrow_back_ios_icon</Icon>
          </i>
        )}
      />
      { loop(active)}
      <Button
        classes="px-2 pt-1"
        disabled={active >= total}
        handler={() => handler(active + 1)}
        icon={(
          <i className={active >= total ? 'text-gray-300' : ''}>
            <Icon fontSize="inherit">arrow_forward_ios_icon</Icon>
          </i>
        )}
      />
      <Button
        classes="px-2 pt-1"
        disabled={active >= total}
        handler={() => handler(total)}
        icon={(
          <i className={active >= total ? 'text-gray-300' : ''}>
            <Icon fontSize="inherit">keyboard_double_arrow_right</Icon>
          </i>
        )}
      />
    </div>
  );
};

Pagination.defaultProps = {
  handler: () => { },
  disabled: false,
  listRange: [],
  setRows: () => { },
  totalData: 0,
  maxPage: null,
};

export default Pagination;
