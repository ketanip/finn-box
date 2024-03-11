import { PrismaClient, TRANSACTION_TYPE } from '@prisma/client';

const prisma = new PrismaClient();

async function generateTransactions() {
    const userId = "ad00eb96-ca6a-41e6-bff6-a240f474c834"; // Change this to your desired user ID

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

    const transactionMethods = ["UPI", "UPI Lite", "Debit Card", "Cash", "Credit Card", "Bank Transfer"];

    for (let i = 0; i < 100; i++) {
        const transactionType =
            Math.random() < 0.5 ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE;
        const sourceDestination = "Some Source/Destination";
        const category = categories[Math.floor(Math.random() * categories.length)];
        const transactionMethod =
            transactionMethods[Math.floor(Math.random() * transactionMethods.length)];
        const amount = Math.floor(Math.random() * 1000) + 1; // Generating a random amount between 1 and 1000
        const notes = "Some notes";
        const createdAt = new Date();
        const updatedAt = new Date();
        const transactionDate = `${Math.floor(Math.random() * 30) + 1}-${Math.floor(Math.random() * 12) + 1}-2024`; // Random date in dd-mm-yyyy format

        await prisma.transactions.create({
            data: {
                transaction_type: transactionType,
                source_destination: sourceDestination,
                category: category,
                transaction_method: transactionMethod,
                amount: amount,
                notes: notes,
                created_at: createdAt,
                updated_at: updatedAt,
                user_id: userId,
                transaction_date: transactionDate
            },
        });
    }

    console.log("Transactions generated successfully!");
}

generateTransactions()
    .catch((error) => {
        console.error("Error generating transactions:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
