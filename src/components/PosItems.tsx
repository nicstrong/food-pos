import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { RouterOutputs, api } from "~/utils/api";
import css from "./PosItems.module.scss";


type MenuItem = RouterOutputs["menu"]["getMenuItems"][number];

export function PosItems() {
  const { data, isLoading  } = api.menu.getMenuItems.useQuery();

  return (
    <div className={css.posItems}>
      <InputGroup className={css.search}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search menu items" />{" "}
      </InputGroup>

      {isLoading && <div>Loading...</div>   }
      {data && data.map(item  => <PosItem key={item.id} item={item} />)}
    </div>
  );
}


function PosItem({ item }: { item: MenuItem }) {
    return <div>
        <div>{item.name ?? 'Blank'}</div>
    </div>
}