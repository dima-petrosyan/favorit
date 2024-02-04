import { Box, Stack } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useTypedSelector } from "./store";
import { Search } from "../shared/ui/search";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const searchValue = useTypedSelector((state) => state.goods.searchValue);

  const [value, setValue] = useState<string>(searchValue);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!value) return;
    navigate(`/search/${value}`);
  };

  useLayoutEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  return (
    <Stack mt="5%" mx="auto" alignItems="center" direction="column">
      <Box width="50%">
        <Search value={value} setValue={setValue} handleSearch={handleSearch} />
      </Box>
      <Box mt="50px" width="80%">
        {children}
      </Box>
    </Stack>
  );
};
