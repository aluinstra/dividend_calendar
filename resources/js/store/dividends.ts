import { computed, ComputedRef, ref, Ref } from "vue";
import axios, { AxiosResponse } from "axios";

export interface Dividend {
    id: number;
    stock_id: number;
    dividendYield: number;
    paymentDates: string; // Date format: 'YYYY-MM-DD'
    declarationDates: string; // Date format: 'YYYY-MM-DD'
    created_at: string; // Date format: 'YYYY-MM-DD HH:MM:SS'
    updated_at: string; // Date format: 'YYYY-MM-DD HH:MM:SS'
}

const state = ref<Dividend[]>([]);

export const useDividendStore = () => {
    const getAllfromFile = async () => {
        try {
            const { data } = await axios.get<Dividend[]>("/api/dividends");
            state.value = data;
            // console.log("getdividends", data);
        } catch (error) {
            console.error("Error retrieving dividend data:", error);
        }
    };

    const getAllfromState = () => {
        // console.log("state", state.value);
        return computed(() => {
            return state.value;
        });
    };

    const getByID = async (id: number) => {
        try {
            const { data } = await axios.get<Dividend>(`/api/dividends/${id}`);
            return data;
        } catch (error) {
            console.error(`Error retrieving dividend with ID ${id}:`, error);
            throw error;
        }
    };

    const getByStockId = async (stockId: number) => {
        try {
            const { data } = await axios.get<Dividend[]>(
                `/api/dividends/${stockId}`
            );
            return data;
        } catch (error) {
            console.error(
                `Error retrieving dividends for stock with ID ${stockId}:`,
                error
            );
            throw error;
        }
    };

    // const addToState = async (payload: any) => {
    //     try {
    //         console.log("payload", payload);
    //         const { data } = await axios.post<Dividend>(
    //             "/api/dividends",
    //             payload
    //         );
    //         state.value.push(data);
    //     } catch (error) {
    //         console.error("Error adding dividend:", error);
    //     }
    // };

    const update = async (dividend: Dividend) => {
        try {
            const { data } = await axios.put<Dividend>(
                `/api/dividends/${dividend.id}`,
                dividend
            );
            const index = state.value.findIndex(
                (item) => item.id === dividend.id
            );
            if (index !== -1) {
                state.value.splice(index, 1, data);
            }
        } catch (error) {
            console.error(
                `Error updating dividend with ID ${dividend.id}:`,
                error
            );
            throw error;
        }
    };

    const deleteFromDB = async (id: number) => {
        try {
            await axios.delete(`/api/dividends/${id}`);
            const index = state.value.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        } catch (error) {
            console.error(`Error deleting dividend with ID ${id}:`, error);
            throw error;
        }
    };

    return {
        getAllfromFile,
        getAllfromState,
        getByID,
        // addToState,
        update,
        deleteFromDB,
        getByStockId,
    };
};
