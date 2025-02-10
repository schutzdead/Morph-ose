export const formatPrice = (price) =>
    Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2
}).format(price);

export const removeNull = obj => Object.fromEntries(Object.entries(obj).filter(([_, v]) => {return (!!v && v !== 'false' && v.length > 0)}));