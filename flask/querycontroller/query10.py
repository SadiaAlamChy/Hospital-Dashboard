
from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query10:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query10 = "SELECT s.store_key, tim.month, avg(ft.total_price) "\
                "FROM ecomdb_star_schema.fact_table ft "\
                "JOIN ecomdb_star_schema.store_dim s on s.store_key = ft.store_key "\
                "JOIN ecomdb_star_schema.time_dim tim on tim.time_key = ft.time_key "\
                "GROUP BY CUBE(s.store_key, tim.month) "\
                "ORDER BY s.store_key, tim.month "
        cur.execute(query10)
        avg = cur.fetchall()[:12]
        avgmon = pd.DataFrame(list(avg), columns=['store_id', 'month', 'average_sales'])
        print(avgmon)
        return avgmon.to_dict(orient='records')


if __name__ == '__main__':
    q10 = Query10()
    data = q10.execute()
    print(data)
