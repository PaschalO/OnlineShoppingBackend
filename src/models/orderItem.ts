// import Client from "../database";
// import {OrderProduct} from "../dataTypes/types";
//
// export class OrderItemStore {
//

//
//     async updateOrderByQuantity(
//         id: number,
//         quantity: string
//     ): Promise<OrderItems | null> {
//         try {
//             const connection = await Client.connect();
//             const sql =
//                 "UPDATE order_items SET order_quantity = ($2) WHERE order_id=($1) RETURNING *";
//             const result = await connection.query(sql, [id, quantity]);
//             connection.release();
//
//             if (result.rows.length > 0) return result.rows[0];
//
//             return null;
//         } catch (error) {
//             throw new Error(`Could not update the order quantity: ${error}`);
//         }
//     }
// }
