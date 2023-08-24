import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { PosItem } from "./PosItem";
import css from "./PosItems.module.scss";

export function PosItems() {
  const { data, isLoading } = api.menu.getMenuItems.useQuery();

  return (
    <div className={css.posItems}>
      <InputGroup className={css.search}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search menu items" />{" "}
      </InputGroup>

      {isLoading && <Spinner />}
      <ul className={css.items}>
        {data?.map((item) => (
          <PosItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}


