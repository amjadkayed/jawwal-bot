/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useDnD } from "../../hooks/useDnD";
import { MotionProps, motion } from "framer-motion";

type Props = {
  id: string | number;
  index: number;
  name: string;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  component?: React.ComponentType<MotionProps>;
  children?: React.ReactNode;
  containerId: string;
  [key: string]: any;
};

const DraggableItem: FC<Props> = (props) => {
  const { id, index, name, moveElement, component, containerId, ...rest } =
    props;
  const { ref, opacity, handlerId } = useDnD({
    id,
    index,
    name,
    moveCard: moveElement,
    containerId,
  });

  const Component = component ? component : motion.div;

  return (
    <>
      <Component
        ref={ref}
        style={{ opacity }}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        data-handler-id={handlerId}
        {...rest}
      >
        {props.children}
      </Component>
    </>
  );
};

export default DraggableItem;
