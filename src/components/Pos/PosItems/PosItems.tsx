import { Loader, TextInput } from "@mantine/core";
import { MdOutlineSearch } from "react-icons/md";
import { api } from "~/utils/api";
import { PosItem } from "./PosItem";
import css from "./PosItems.module.scss";

export function PosItems() {
  const { data, isLoading } = api.menu.getMenuItems.useQuery();

  return (
    <div className={css.posItems}>
      <TextInput
        leftSection={<MdOutlineSearch />}
        variant="filled"
        placeholder="Search menu items"
      />

      {isLoading && <Loader />}
      <ul className={css.items}>
        {data?.map((item) => (
          <PosItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
