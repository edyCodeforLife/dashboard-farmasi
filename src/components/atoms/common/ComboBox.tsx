import React, { useState, useEffect, useRef } from 'react';
import Icon from '@mui/material/Icon';

interface Option {
  value: string;
  label: string;
}

interface Props {
  direction?: string;
  placeholder?: string;
  searchable?: boolean;
  option?: Option | null;
  options?: Array<Option>;
  searchHandler?: (event: any) => void;
  selectHandler?: (opt: Option) => void;
}

const ComboBox = (props: Props) => {
  const {
    option,
    options,
    direction,
    searchable,
    placeholder,
    searchHandler,
    selectHandler,
  } = props;

  const element = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [shuffleId] = useState(Math.random().toString());
  const [inputValue, setInputValue] = useState<string>('');
  const [defaultOptions, setDefaultOptions] = useState<Array<Option>>(options || []);

  useEffect(() => {
    const newOptions = options?.filter((item) => item?.label?.includes(inputValue)) || [];
    setDefaultOptions(inputValue !== '' ? newOptions : options || []);
  }, [inputValue, options]);

  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current) {
        const classList = [...e.target.classList];
        if (e.target.id !== shuffleId) callback();
        if (!classList.includes('menu-option')) callback();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    });
  };

  useOutsideClick(element, () => setOpen(false));
  useEffect(() => { if (!open) setInputValue(''); }, [open]);

  useEffect(() => () => {
    setOpen(false);
    setInputValue('');
    setDefaultOptions(options || []);
  }, []);

  const defaultDirection = {
    bottom: 'origin-top-right mt-2 right-0',
    top: 'origin-bottom-right mb-12 bottom-0',
    left: 'origin-bottom-right mr-28 bottom-0 top-0 right-0',
    right: 'origin-bottom-right ml-28 bottom-0 top-0 left-0',
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        ref={element}
        id={`${shuffleId}`}
        className={`
          menu-option
          focus:outline-none menu-option
          inline-flex justify-center w-full
          rounded-md border border-gray-300
          shadow-sm px-4 pt-2 bg-white text-sm
          font-medium text-gray-700 hover:bg-gray-50
        `}
      >
        {!option ? placeholder : option?.label}
        <i className="text-gray-500"><Icon>arrow_drop_down_icon</Icon></i>
      </button>
      <div
        className={`
          ${defaultDirection[`${direction}`]}
          absolute w-56 rounded-md z-10
          ring-opacity-5 focus:outline-none
          shadow-lg bg-white ring-1 ring-black
          ${!open && 'hidden'}
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {
            searchable && (
              <input
                type="text"
                onChange={(event) => {
                  if (searchHandler) searchHandler(event);
                  setInputValue(event.target.value);
                }}
                value={inputValue}
                className="focus:outline-none px-2 py-2 w-full"
                placeholder="Cari disini..."
              />
            )
          }
          {
            defaultOptions.length > 0
              ? (
                defaultOptions.map((item) => (
                  <div
                    key={item.value}
                    className={`
                      block px-4 py-2 text-sm cursor-pointer truncate hover:bg-gray-100 menu-option
                      ${option?.value === item?.value ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-700'}
                    `}
                    tabIndex={-1}
                    role="button"
                    onClick={() => { if (selectHandler) selectHandler(item); }}
                    onKeyPress={() => { if (selectHandler) selectHandler(item); }}
                    data-id={item.value}
                  >
                    {item.label}
                  </div>
                ))
              ) : (
                <div className="block bg-white px-4 py-2 text-sm cursor-pointer text-gray-700">
                  Tidak ada data
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};

ComboBox.defaultProps = {
  options: [],
  option: null,
  searchable: false,
  placeholder: 'Silahkan Pilih',
  searchHandler: () => { },
  selectHandler: () => { },
  direction: 'bottom',
};

export default ComboBox;
