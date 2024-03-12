import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const user_id = "1832458a-f0d4-4439-91b3-5786d46db3da"; // Change this to your desired user ID
// Define the transaction categories
const categories = [
    "Basic Necessities",
    "Utilities",
    "Transportation",
    "Healthcare",
    "Education",
    "Entertainment",
    "Investments",
    "Savings",
    "Debt Repayment",
    "Charity/Donations",
    "Personal Care",
    "Home Expenses",
    "Technology",
    "Dining Out",
    "Pets",
    "Hobbies",
    "Gifts",
    "Legal Expenses",
    "Travel",
    "Insurance Premiums",
];


// Define the transaction types
enum TRANSACTION_TYPE {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

// Function to generate a random transaction date within the last 7 days
const getRandomDate = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return new Date(sevenDaysAgo.getTime() + Math.random() * (today.getTime() - sevenDaysAgo.getTime()));
};

// Generate 100 transaction records
const generateTransactions = async (): Promise<void> => {
  const transactions = [];
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  for (let i = 0; i < 100; i++) {
    const transactionDate = new Date(currentDate.getTime() - Math.floor(Math.random() * 7) * oneDay).toISOString().slice(0, 10);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = Math.floor(Math.random() * 1000) + 1;
    const transactionType = Math.random() > 0.5 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME;
    const sourceDestination = transactionType === TRANSACTION_TYPE.EXPENSE ? "Vendor" : "Customer";
    const transactionMethod = transactionType === TRANSACTION_TYPE.EXPENSE ? "Debit Card" : "Credit Card";
    const notes = transactionType === TRANSACTION_TYPE.EXPENSE ? "Payment for services" : "Received payment";
    const created_at = getRandomDate().toISOString();
    
    transactions.push({
      transaction_type: transactionType,
      source_destination: sourceDestination,
      category: category,
      transaction_method: transactionMethod,
      amount: amount,
      notes: notes,
      transaction_date: transactionDate,
      created_at: created_at,
      user_id: user_id,
    });
  }

  // Insert transactions into the database
  await prisma.transactions.createMany({
    data: transactions,
  });

  console.log("Transactions inserted successfully.");
};

// Call the function to generate transactions and insert into the database
generateTransactions()
  .catch((error) => {
    console.error("Error inserting transactions:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
