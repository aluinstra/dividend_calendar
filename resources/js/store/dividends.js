import { computed, ref } from "vue";
import axios from "axios";

const state = ref([]);

export const useDividendStore = () => {
    const getAllfromFile = async () => {
        try {
            const { data } = await axios.get("/api/dividends");
            state.value = data;
            console.log("getdividends", data);
        } catch (error) {
            console.error("Error retrieving dividend data:", error);
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
            const { data } = await axios.get(`/api/dividends/${id}`);
            return data;
        } catch (error) {
            console.error(`Error retrieving dividend with ID ${id}:`, error);
        }
    };

    const addToState = async (payload) => {
        try {
            console.log("payload", payload);
            const { data } = await axios.post("/api/dividends", payload);
            state.value.push(data);
        } catch (error) {
            console.error("Error adding dividend:", error);
        }
    };

    const update = async (dividend) => {
        try {
            const { data } = await axios.put(
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
        }
    };

    const deleteFromDB = async (id) => {
        try {
            await axios.delete(`/api/dividends/${id}`);
            const index = state.value.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        } catch (error) {
            console.error(`Error deleting dividend with ID ${id}:`, error);
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
