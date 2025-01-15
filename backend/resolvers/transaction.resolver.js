import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if(!context.getUser()) throw new Error("Unauthorized.");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({user: userId});
        return transactions;
      } catch (error) {
        console.error('Error in transactions resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    transaction: async (_, {transactionId, }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error('Error in transaction resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    }
  },
  Mutation: {
    createTransaction: async (_, {input}, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id
        })
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.log('Error in createTransaction resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    updateTransaction: async (parent, { input }, context) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
        return updateTransaction;
      } catch (error) {
        console.log('Error in updateTransaction resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    },
    deleteTransaction: async (parent, {transactionId}, context) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error) {
        console.log('Error in deleteTransaction resolver: ', error);
        throw new Error(error.message || "An error occurred. Please try again.");
      }
    }
  }
};

export default transactionResolver;