from dbconnection.dbcon import PostgresConnection
import pandas as pd
class Query4:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query4 = """SELECT bill_info.DAY,COUNT(bill_info.APPOINT_NO) AS patient_count
FROM hospitals.bill_info 
GROUP BY (bill_info.DAY)
ORDER BY patient_count DESC
"""
        cur.execute(query4)
        result = cur.fetchall()
        pd_data = pd.DataFrame(list(result), columns=['day', 'no_of_appointment'])
       # pd_data['total_sale_price'] = pd_data['total_sale_price'].astype('float64')
        pd_data = pd_data.dropna()
        # print(pd_data)
        return pd_data.to_dict(orient='records')

if __name__ == '__main__':
    q4 = Query4()
    data = q4.execute()
    print(data)