/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  TRow,
  UserName,
  Date,
  Id,
  PriceRoom,
  LinkList,
  PerNight,
} from "../styles/style";
import { CheckStatusRoom } from "../styles/style-buttons";
import { Image } from "../styles/style-image";

export const ListItem = ({
  item,
  index,
  moveListItem,
  handleRemove,
  number,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? { opacity: "0" } : { opacity: "1" };
  return (
    <TRow key={item._id} ref={dragDropRef} style={opacity}>
      <td
        style={{
          padding: "10px",
        }}
      >
        <Image src={item.photo} alt="" />
      </td>
      <Date>{item.room_number}</Date>

      <td>
        <LinkList to={`/rooms/${item._id}`}>
          <UserName>{item.room_type}</UserName>
          <Id>{item._id}</Id>
        </LinkList>
      </td>
      <td style={{ textOverflow: "", fontSize: '10px', padding: '3px' }}>{item.facilities}</td>

      <PriceRoom>
        <span> $</span>
        {item.price}

        <PerNight>/night </PerNight>
      </PriceRoom>

      <PriceRoom>
        <span> $</span>
        {item.offer_price}
        <PerNight>/night</PerNight>
      </PriceRoom>

      <td>
        <CheckStatusRoom status={item.status}>{item.status}</CheckStatusRoom>
      </td>
      <td>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleRemove(item._id);
          }}
        >
          🗑️
        </div>
      </td>
    </TRow>
  );
};
