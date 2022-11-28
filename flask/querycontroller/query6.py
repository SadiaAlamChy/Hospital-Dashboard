from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query6:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query6 = "SELECT s.store_key as store_key, i.item_name as item_name, sum(f.quantity) as quantity_sales_for_each_item " \
                 "FROM ecomdb_star_schema.fact_table as f " \
                 "JOIN ecomdb_star_schema.store_dim as s ON s.store_key = f.store_key " \
                 "JOIN ecomdb_star_schema.item_dim as i ON i.item_key = f.item_key " \
                 "GROUP BY CUBE(s.store_key, i.item_name)" \
                 "ORDER BY s.store_key, sum(f.quantity) desc"
        # cur.execute(query6)
        # top_three_products = pd.read_sql_query(query6, con)
        # top_three_products = top_three_products.groupby('store_key').head(3)
        # return top_three_products.to_dict(orient='records')

        cur.execute(query6)
        result = cur.fetchall()
        pd_data = pd.DataFrame(list(result), columns=['store_key', 'item_name', 'quantity_sales_for_each_item'])
        # pd_data['sales'] = pd_data['sales'].astype('float64')
        pd_data = pd_data.dropna()
        pd_data = pd_data.set_index('item_name').groupby("store_key")['quantity_sales_for_each_item'].nlargest(
            3).reset_index()
        # print(pd_data)
        # drop the quantity column
        pd_data.drop(columns='quantity_sales_for_each_item', axis=1, inplace=True)
        # organize the output
        pd_data = pd_data[:15]
        x = (pd_data.groupby(['store_key'])
             .apply(lambda x: x[['item_name']].to_dict('records'))
             .reset_index()
             .rename(columns={0: 'items'})
             .to_json(orient='records'))

        # return pd_data.to_dict(orient='records')
        return eval(x)


if __name__ == '__main__':
    q6 = Query6()
    data = q6.execute()
    print(data)
