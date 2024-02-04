import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props extends InputBaseProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
}

export const Search: React.FC<Props> = (props) => {
  const { value, setValue, handleSearch, ...restProps } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for goods"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        {...restProps}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        disabled={!value}
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
