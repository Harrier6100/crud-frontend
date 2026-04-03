export const useArray = (data = []) => {
    const items = ref([...data]);

    const add = (item) => {
        items.value.push(JSON.parse(JSON.stringify(item)));
    };

    const push = (index, item) => {
        items.value.splice(index + 1, 0, JSON.parse(JSON.stringify(item)));
    };

    const moveUp = (index) => {
        if (index > 0 && index < items.value.length) {
            const [item] = items.value.splice(index, 1);
            items.value.splice(index - 1, 0, item);
        }
    };

    const moveDown = (index) => {
        if (index > 0 && index < items.value.length - 1) {
            const [item] = items.value.splice(index, 1);
            items.value.splice(index + 1, 0, item);
        }
    };

    const remove = (index) => {
        items.value.splice(index, 1);
    };

    return {
        items,
        add,
        push,
        moveUp,
        moveDown,
        remove,
    };
};
