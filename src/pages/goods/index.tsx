import { Typography } from "@mui/material";
import { Layout } from "../../app/Layout";
import { goodsDisplayData } from "../../services/goods.selectors";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { BasicTable } from "../../shared/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getGoodsByFilter, setSearchValue } from "../../services/goods.slice";
import { constants } from "../../shared/constants/constants";

export const GoodsPage = () => {
  const dispatch = useAppDispatch();
  const goods = useTypedSelector(goodsDisplayData);
  const searchValue = useTypedSelector((state) => state.goods.searchValue);

  const { number } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!number) return;
    if (number === searchValue) return;

    dispatch(
      getGoodsByFilter({
        key: constants.user.key,
        number,
      })
    );
    dispatch(setSearchValue(number));
  }, [dispatch, number, searchValue]);

  const handleToAnalogue = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <Layout>
      {goods.length > 0 ? (
        <BasicTable rows={goods} onClick={handleToAnalogue} />
      ) : (
        <Typography textAlign="center">Nothing was found</Typography>
      )}
    </Layout>
  );
};
