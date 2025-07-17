"use client";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export type CarouselData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

type Direction = "right" | "left";

type CarouselProps = {
  data: CarouselData[];
  autoPlay?: boolean;
  loop?: boolean;
};

const Carousel = (props: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleCurrentIndexChange = useCallback(
    (direction: Direction) => {
      if (direction === "left") {
        setCurrentIndex((p) =>
          p === 0 ? (props.loop ? props.data.length - 1 : p) : p - 1
        );
      } else if (direction === "right") {
        setCurrentIndex((p) =>
          p === props.data.length - 1 ? (props.loop ? 0 : p) : p + 1
        );
      }
    },
    [props.data, props.loop]
  );

  useEffect(() => {
    if (!props.autoPlay || isHovered) return;
    const timerId = setInterval(() => {
      setCurrentIndex((p) =>
        p === props.data.length - 1 ? (props.loop ? 0 : p) : p + 1
      );
    }, 2000);
    console.log("Starting Interval timerId:", timerId);

    return () => {
      console.log("Clearing Interval timerId:", timerId);
      clearInterval(timerId);
    };
  }, [props.data, props.autoPlay, props.loop, isHovered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();

        if (e.key === "ArrowLeft")
          setCurrentIndex((p) =>
            p === 0 ? (props.loop ? props.data.length - 1 : p) : p - 1
          );
        else if (e.key === "ArrowRight")
          setCurrentIndex((p) =>
            p === props.data.length - 1 ? (props.loop ? 0 : p) : p + 1
          );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.loop, props.data, isFocused]);

  console.log("Carousel re-render");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        alignContent: "center",
      }}
      role="region"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <LeftArrow
        disabled={currentIndex === 0}
        loop={props.loop}
        handleCurrentIndexChange={handleCurrentIndexChange}
      />
      <CarouselItem
        item={props.data[currentIndex]}
        currentIndex={currentIndex}
        handleCurrentIndexChange={handleCurrentIndexChange}
        setIsHovered={setIsHovered}
      />
      <RightArrow
        disabled={currentIndex === props.data.length - 1}
        loop={props.loop}
        handleCurrentIndexChange={handleCurrentIndexChange}
      />
    </div>
  );
};

const LeftArrow = memo(
  (props: {
    disabled: boolean;
    loop?: boolean;
    handleCurrentIndexChange: (_direction: Direction) => void;
  }) => {
    console.log("LeftArrow re-render");

    return (
      <button
        style={{
          backgroundColor: "black",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          cursor: "pointer",
          color: "white",
          ...(props.disabled && !props.loop
            ? {
                opacity: 0.5,
                pointerEvents: "none",
              }
            : {}),
        }}
        onClick={() => props.handleCurrentIndexChange("left")}
        role="button"
        aria-label="Previous Slide"
      >
        <span style={{ fontSize: "24px" }}>&lt;</span>
      </button>
    );
  }
);

const RightArrow = memo(
  (props: {
    disabled: boolean;
    loop?: boolean;
    handleCurrentIndexChange: (_direction: Direction) => void;
  }) => {
    console.log("RightArrow re-render");

    return (
      <button
        style={{
          backgroundColor: "black",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          cursor: "pointer",
          color: "white",
          ...(props.disabled && !props.loop
            ? {
                opacity: 0.5,
                pointerEvents: "none",
              }
            : {}),
        }}
        onClick={() => props.handleCurrentIndexChange("right")}
        role="button"
        aria-label="Next Slide"
      >
        <span style={{ fontSize: "24px" }}>&gt;</span>
      </button>
    );
  }
);

type CarouselItemProps = {
  item: CarouselData;
  currentIndex: number;
  handleCurrentIndexChange: (_direction: Direction) => void;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
};

const CarouselItem = (props: CarouselItemProps) => {
  console.log("CarouselItem re-render, item: ", props.currentIndex + 1);
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    const endX = e.changedTouches[0].clientX;

    if (startX === null) return;

    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) props.handleCurrentIndexChange("left");
      else props.handleCurrentIndexChange("right");
    }

    touchStartXRef.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => props.setIsHovered(true)}
      onMouseLeave={() => props.setIsHovered(false)}
      aria-label="Image Carousel"
      aria-live="polite"
    >
      <img
        src={props.item.imageUrl}
        alt={props.item.title}
        style={{ width: "200px", height: "200px" }}
      />
      <h3>{props.item.title}</h3>
      <p>{props.item.description}</p>
    </div>
  );
};

export default Carousel;
