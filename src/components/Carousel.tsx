import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize, //  кількість зображень, що відображаються одночасно
  itemWidth, //розмір елемента
  step, // кількість зображень, що прокручуються за клік
  animationDuration, // час у мс для відображення нової порції зображень
  infinite, // для циклічного відображення каруселі
}) => {
  const gap = 20;
  const visibleImage = frameSize * itemWidth + (frameSize - 1) * gap;
  const howManySet = (gap + itemWidth) * step;
  const maxOffset = Math.min(
    0,
    -((itemWidth + gap) * images.length - visibleImage - gap),
  ); // найвіддаленіший зсув

  const [offset, setOffset] = useState(0);

  const handlNext = () =>
    setOffset(prev => {
      if (infinite && prev <= maxOffset) {
        return 0;
      }

      return Math.max(prev - howManySet, maxOffset);
    });

  const handlPrev = () =>
    setOffset(prev => {
      if (infinite && prev === 0) {
        return maxOffset;
      }

      return Math.min(0, prev + howManySet);
    });

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${frameSize * itemWidth + (frameSize - 1) * gap}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((e, i) => (
            <li
              key={e}
              style={{ width: `${itemWidth}px`, flex: `0 0 ${itemWidth}px` }}
            >
              <img className="Carousel__img" src={e} alt={String(i + 1)} />
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={!infinite && offset === 0}
        className={cn('Carousel__btn Carousel__btn--prev', {
          disabled: !infinite && offset === 0,
        })}
        type="button"
        onClick={handlPrev}
      >
        ←
      </button>
      <button
        disabled={!infinite && offset === maxOffset}
        data-cy="next"
        className={cn('Carousel__btn Carousel__btn--next', {
          disabled: !infinite && offset === maxOffset,
        })}
        type="button"
        onClick={handlNext}
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
