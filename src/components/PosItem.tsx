import { AddIcon, Icon } from "@chakra-ui/icons";
import classNames from "classnames";
import { useAtom } from "jotai";
import { MdKebabDining } from "react-icons/md";
import { type MenuItem } from "~/model";
import { orderAtom } from "~/store/order";
import { useHover } from "~/utils/useHover";
import css from "./PosItem.module.scss";

export function PosItem({ item }: { item: MenuItem }) {
  const { hover, onMouseEnter, onMouseLeave } = useHover(50);
  const [order, setOrder] = useAtom(orderAtom);

  const handleClick = () => {
    setOrder((order) => [...order, { quantity: 1, item }]);
  };

  return (
    <li
      className={css.posItem}
      role="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div className={classNames(css.hoverOverlay, !hover && css.hidden)} />
      <div className={css.top}>
        <Icon className={css.icon} as={MdKebabDining} />
      </div>
      <div className={css.bottom}>{item.description ?? "Blank"}</div>

      <div className={css.itemType}>
        <AddIcon />
      </div>
    </li>
  );
}
