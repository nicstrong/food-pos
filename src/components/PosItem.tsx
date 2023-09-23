import classNames from "classnames";
import { useSetAtom } from "jotai";
import { type IconType } from "react-icons";
import { MdAdd, MdKebabDining, MdOutlineLocalDrink } from "react-icons/md";
import { type MenuItem } from "~/model";
import { orderItemsAtom } from "~/store/order";
import { useHover } from "~/utils/useHover";
import css from "./PosItem.module.scss";

export function PosItem({ item }: { item: MenuItem }) {
  const { hover, onMouseEnter, onMouseLeave } = useHover(50);
  const setOrder = useSetAtom(orderItemsAtom);

  const handleClick = () => {
    setOrder((order) => {
      const existingIndex = order.findIndex((i) => i.item.id === item.id);
      if (existingIndex > -1) {
        return order.map((i, index) => {
          if (index === existingIndex) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        });
      }
      return [...order, { quantity: 1, item }];
    });
  };

  const drink = item.description === "Coke";
  const Icon: IconType = drink ? MdOutlineLocalDrink : MdKebabDining;

  return (
    <li
      className={css.posItem}
      role="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div className={classNames(css.hoverOverlay, !hover && css.hidden)} />
      <div className={classNames(css.top, drink && css.drink)}>
        <Icon />
      </div>
      <div className={css.bottom}>{item.description ?? "Blank"}</div>

      <div className={css.itemType}>
          <MdAdd />
      </div>
    </li>
  );
}
