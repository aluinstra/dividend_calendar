import { computed, ref } from "vue";
import axios from "axios";

const state = ref([]);

export const useStockstore = () => {
    const getAllfromFile = async () => {
        try {
            const { data } = await axios.get("/api/stocks");
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

    const getByID = async (id) => {
        try {
            const { data } = await axios.get(`/api/stocks/${id}`);
            return data;
        } catch (error) {
            console.error(`Error retrieving stock with ID ${id}:`, error);
        }
    };

    const addToState = async (payload) => {
        console.log("payload", payload);
        const { data } = await axios.post("/api/stocks", payload);
        state.value.push(data);
        console.log("addToState returning", data);
        return data;
    };

    const update = async (ticket) => {
        try {
            const { data } = await axios.put(
                `/api/stocks/${ticket.id}`,
                ticket
            );
            const index = state.value.findIndex(
                (item) => item.id === ticket.id
            );
            if (index !== -1) {
                state.value.splice(index, 1, data);
            }
        } catch (error) {
            console.error(`Error updating stock with ID ${ticket.id}:`, error);
        }
    };

    const deleteFromDB = async (id) => {
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
