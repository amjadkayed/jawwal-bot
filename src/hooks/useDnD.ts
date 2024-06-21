import { useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";

interface useDnDProp {
  id: string | number;
  index: number;
  name: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  containerId: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
  containerId?: string;
}

export const useDnD = ({
  id,
  index,
  moveCard,
  name,
  containerId,
}: useDnDProp) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: name,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (containerId && item.containerId !== containerId) {
        return;
      }
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, draggingRef] = useDrag({
    type: name,
    item: () => {
      return { id, index, containerId };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return { ref, opacity, handlerId ,draggingRef,isDragging};
};
