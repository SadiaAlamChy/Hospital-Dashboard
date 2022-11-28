from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query3:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query3 = """SELECT bill_info.DAY as "day of week",sum(bill_info.CONSULT_FEE) as "total income"
FROM hospitals.bill_info 
GROUP BY (bill_info.DAY)
ORDER BY bill_info.DAY """
        cur.execute(query3)
        result = cur.fetchall()
        pd_data = pd.DataFrame(list(result), columns=['day', 'total_sales'])
        pd_data['total_sales'] = pd_data['total_sales'].astype('float64')
        pd_data = pd_data.dropna()
        # print(pd_data)
        return pd_data.to_dict(orient='records')


if __name__ == '__main__':
    q3 = Query3()
    data = q3.execute()
    print(data)
