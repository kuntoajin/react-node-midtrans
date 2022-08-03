const express = require("express");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = 3001;

app.use(cors());

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-YpASTKAKNLC392kqirD-9BtY",
});

const parameter = (data) => {
  return {
    transaction_details: {
      order_id: "YOUR-ORDERID-123456" + Math.random(),
      gross_amount: data.gross,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/test", (req, res) => {
  console.log(req.body);
  snap.createTransaction(parameter(req.body)).then((transaction) => {
    // transaction token
    res.json(transaction);
    // console.log("transactionToken:", transactionToken);
  });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
