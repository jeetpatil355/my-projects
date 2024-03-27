

export const renderDate = (data) => {

        const date = new Date(data);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formated = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formated
}

