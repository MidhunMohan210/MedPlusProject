export const formDate = (date, config) => {
    const defaultOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const options = config && typeof config === 'object' ? config : defaultOptions;

    const formattedDate = new Date(date);

  

    return formattedDate.toLocaleDateString('en-US', options);
}
