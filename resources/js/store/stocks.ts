import { computed, ComputedRef, ref, Ref } from "vue";
import axios from "axios";

export interface Stock {
    id: number;
    company: string;
    price: string;
    quantity: number;
    currency: string;
}

const state = ref<Stock[]>([]);

export const useStockstore = () => {
    const getAllfromFile = async () => {
        try {
            const { data } = await axios.get<Stock[]>("/api/stocks");
            state.value = data;
            console.log("getStocks", data);
        } catch (error) {
            console.error("Error retrieving stock data:", error);
        }
    };

    const getAllfromState = () => {
        console.log("state", state.value);
        return computed(() => {
            return state.value;
        });
    };

    const getByID = async (id: number) => {
        try {
            const { data } = await axios.get<Stock>(`/api/stocks/${id}`);
            return data;
        } catch (error) {
            console.error(`Error retrieving stock with ID ${id}:`, error);
        }
    };

    const addToState = async (stock: Stock) => {
        console.log("payload:", stock);
        const { data } = await axios.post<Stock>("/api/stocks", stock);
        state.value.push(data);
        console.log("addToState returning", data);
        return data;
    };

    const update = async (stock: Stock) => {
        try {
            const { data } = await axios.put<Stock>(
                `/api/stocks/${stock.id}`,
                stock
            );
            const index = state.value.findIndex((item) => item.id === stock.id);
            if (index !== -1) {
                state.value.splice(index, 1, data);
            }
        } catch (error) {
            console.error(`Error updating stock with ID ${stock.id}:`, error);
        }
    };

    const deleteFromDB = async (id: number) => {
        try {
            await axios.delete(`/api/stocks/${id}`);
            const index = state.value.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        } catch (error) {
            console.error(`Error deleting stock with ID ${id}:`, error);
        }
    };

    return {
        getAllfromFile,
        getAllfromState,
        getByID,
        addToState,
        update,
        deleteFromDB,
    };
};
