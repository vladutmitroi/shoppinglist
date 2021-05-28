export const getCategoryIcon = (categoryClass) => {
  let iconClass = "";
  switch (categoryClass) {
    case "beverages":
      iconClass = "fa-glass-cheers";
      break;
    case "cleaning":
      iconClass = "fa-broom";
      break;
    case "dairy-eggs":
      iconClass = "fa-cheese";
      break;
    case "fruits-and-vegetables":
      iconClass = "fa-carrot";
      break;
    case "meat":
      iconClass = "fa-drumstick-bite";
      break;
    case "pampering":
      iconClass = "fa-bath";
      break;
    case "pastry":
      iconClass = "fa-bread-slice";
      break;
    case "snacks":
      iconClass = "fa-cookie-bite";
      break;
    case "spices-cooking-more":
      iconClass = "fa-mortar-pestle";
      break;
    default:
      iconClass = "fa-question";
      break;
  }

  return iconClass;
};
