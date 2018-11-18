
export const swapTurn = () => {
    return {
        type: "swapTurn"
    };
};

export const selectBox = (id, selected) => {
    return {
        type: "selectBox",
        id: id,
        selected: selected
    };
};