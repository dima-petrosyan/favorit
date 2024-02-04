import { Typography } from "@mui/material";
import { Layout } from "../../app/Layout";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { BasicTable } from "../../shared/ui/table";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { analoguesDisplayData } from "../../services/analogues.selector";
import { getAnaloguesForGood } from "../../services/goods.slice";

export const AnaloguesPage = () => {
  const analogues = useTypedSelector(analoguesDisplayData);
  const { searchAnalogueValue, items } = useTypedSelector(
    (state) => state.goods
  );

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    if (id === searchAnalogueValue) return;
    dispatch(getAnaloguesForGood(id));
  }, [id, dispatch, searchAnalogueValue]);

  return (
    <Layout>
      {analogues.length > 0 ? (
        <>
          <BasicTable
            rows={items
              .filter((item) => item.goodsID === id)
              .map((item) => ({
                id: item.goodsID,
                brand: item.brand,
                number: item.number,
                name: item.name,
                count: item.count,
                price:
                  item.warehouses.length > 0 ? item.warehouses[0].price : "-",
              }))}
          />
          <BasicTable rows={analogues} sx={{ mt: "20px" }} />
        </>
      ) : (
        <Typography textAlign="center">Nothing was found</Typography>
      )}
    </Layout>
  );
};
