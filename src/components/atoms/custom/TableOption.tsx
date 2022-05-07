import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

interface Option {
  text: string;
  display: boolean;
  sorting: boolean;
  value: string;
}

interface Props {
  options?: any;
  handlerOptions?: (any) => void,
  classes?: string;
  image?: string;
  direction?: string;
  icon?: ReactNode;
}

const TableOption = (props: Props) => {
  const {
    options,
    classes,
    image,
    direction,
    handlerOptions,
    icon,
  } = props;

  const element = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [shuffleId] = useState(Math.random().toString());
  const [defaultOptions, setDefaultOptions] = useState<Array<Option>>(options || []);
  const defaultDirection = {
    bottom: 'origin-top-right mt-2 right-0',
    top: 'origin-bottom-right mb-12 bottom-0',
    left: 'origin-bottom-right mr-28 bottom-0 top-0 right-0',
    right: 'origin-bottom-right ml-28 bottom-0 top-0 left-0',
  };
  const changeOptions = (index) => {
    const tempValue = defaultOptions;
    tempValue[index].display = !tempValue[index].display;
    setDefaultOptions([...tempValue]);
  };
  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current) {
        const classList = [...e.target.classList];
        if (!classList.includes('menu-option')) callback();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    });
  };
  useEffect(() => {
    if (handlerOptions) handlerOptions(defaultOptions);
  }, [defaultOptions]);

  useOutsideClick(element, () => setOpen(false));

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        ref={element}
        id={`${shuffleId}`}
        className={`${classes} flex flex-row text-mainColor items-center font-normal text-sm menu-option`}
      >
        {icon}
        Table Views
      </button>
      <div
        className={`
          ${defaultDirection[`${direction}`]}
          absolute w-56 h-96 rounded-md z-10 overflow-y-auto
          ring-opacity-5 focus:outline-none scroll-green
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
            defaultOptions.length > 0
              ? (
                defaultOptions.map((item, idx) => (
                  <div
                    key={item.value}
                    className={`
                      block px-4 py-2 text-sm cursor-pointer truncate hover:bg-gray-100 border flex flex-row justify-start items-center menu-option
                    `}
                    tabIndex={-1}
                    role="button"
                    onClick={() => { changeOptions(idx); }}
                    onKeyPress={() => { changeOptions(idx); }}
                    data-id={item.text}
                  >
                    <input
                      type="checkbox"
                      value={idx}
                      checked={item.display}
                      onClick={() => { changeOptions(idx); }}
                      onChange={(e) => { changeOptions(e.target.value); }}
                      className="checkbox menu-option mr-2"
                    />
                    <span className="my-auto menu-option">{item.text}</span>
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

TableOption.defaultProps = {
  handlerOptions: () => { },
  options: [],
  classes: '',
  image: '',
  icon: <i />,
  direction: 'bottom',
};

export default TableOption;
