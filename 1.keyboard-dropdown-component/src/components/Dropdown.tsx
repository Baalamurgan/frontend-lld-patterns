"use client";
import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";

type OptionType = string | number;

type Option = {
  label: string;
  value: OptionType;
};

type Props = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

const Dropdown = (props: Props) => {
  console.log("re-render");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [selectedOptionValue, setSelectedOptionValue] =
    useState<OptionType | null>(null);

  const containRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return props.options.find((o) => o.value === selectedOptionValue);
  }, [selectedOptionValue, props.options]);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        containRef.current &&
        !containRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (isOpen && highlightedIndex !== null) {
        setSelectedOptionValue(props.options[highlightedIndex].value);
        setIsOpen(false);
        // e.preventDefault();
        return;
      }
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === null || prev === props.options.length - 1 ? 0 : prev + 1
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null || prev === 0 ? props.options.length - 1 : prev - 1
      );
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(null);
    }
  };

  return (
    <div
      className="dropdown-container"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={0}
      ref={containRef}
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        width: "200px",
        height: "50px",
        backgroundColor: "red",
        border: "2px solid blue",
        ...(props.disabled
          ? {
              opacity: 0.5,
              pointerEvents: "none",
            }
          : {}),
      }}
      onClick={() =>
        setIsOpen((p) => {
          if (!p) setHighlightedIndex(null);
          return !p;
        })
      }
    >
      <div className="dropdown-box">
        {selectedOption ? (
          <p>{selectedOption.label}</p>
        ) : (
          <p>{props.placeholder}</p>
        )}
      </div>
      {isOpen && (
        <OptionsBox
          options={props.options}
          selectedOptionValue={selectedOptionValue}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          setSelectedOptionValue={setSelectedOptionValue}
        />
      )}
    </div>
  );
};

type OptionsBoxProps = {
  options: Option[];
  highlightedIndex: number | null;
  selectedOptionValue: OptionType | null;
  setHighlightedIndex: Dispatch<SetStateAction<number | null>>;
  setSelectedOptionValue: Dispatch<SetStateAction<OptionType | null>>;
};

const OptionsBox = (props: OptionsBoxProps) => {
  console.log("Options re-render");
  return (
    <div
      className="options-container"
      role="listbox"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        marginTop: "52px",
        border: "1px solid grey",
        borderRadius: "8px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {props.options.map((option, index) => {
        return (
          <OptionItem
            key={option.value}
            index={index}
            option={option}
            selectedOptionValue={props.selectedOptionValue}
            isHighlighted={props.highlightedIndex === index}
            setHighlightedIndex={props.setHighlightedIndex}
            setSelectedOptionValue={props.setSelectedOptionValue}
          />
        );
      })}
    </div>
  );
};

type OptionItemProps = {
  index: number;
  option: Option;
  selectedOptionValue: OptionType | null;
  //   highlightedIndex: number | null;
  isHighlighted: boolean;
  setHighlightedIndex: Dispatch<SetStateAction<number | null>>;
  setSelectedOptionValue: Dispatch<SetStateAction<OptionType | null>>;
};

const OptionItem = memo((props: OptionItemProps) => {
  console.log("Option Item re-render", props.option.label);
  return (
    <div
      role="option"
      aria-selected={props.selectedOptionValue === props.option.value}
      onClick={() => props.setSelectedOptionValue(props.option.value)}
      onMouseEnter={() => props.setHighlightedIndex(props.index)}
      style={{
        backgroundColor: props.isHighlighted ? "#007BFF" : "white",
        color: props.isHighlighted ? "white" : "black",
        cursor: "pointer",
        padding: "8px 12px",
        ...(props.isHighlighted
          ? {
              backgroundColor: "grey",
              opacity: 0.9,
            }
          : {}),
      }}
    >
      {props.option.label}
    </div>
  );
});

export default Dropdown;
