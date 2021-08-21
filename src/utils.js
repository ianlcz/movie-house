export const formatTime = (time) => {
  if (typeof time === "number") {
    return `${parseInt(time / 60)} h ${
      Math.round((time / 60 - parseInt(time / 60)) * 60) === 0
        ? ""
        : Math.round((time / 60 - parseInt(time / 60)) * 60) < 10
        ? "0" + Math.round(((time / 60 - parseInt(time / 60)) * 60).toFixed(1))
        : Math.round(((time / 60 - parseInt(time / 60)) * 60).toFixed(1))
    }`;
  } else {
    throw new Error(`Your time is not of Number type !`);
  }
};

export const formatNumber = (number) =>
  number === null || isNaN(number)
    ? 0
    : String(number).length >= 10
    ? `${Math.round(number / 1000000000)} Mrds`
    : String(number).length >= 7
    ? `${(number / 1000000).toFixed(
        (number / 1000000 - (number / 1000000).toFixed(0)).toFixed(1) < 0.1
          ? 0
          : 1
      )} M`
    : String(number).length >= 4
    ? `${(number / 1000).toFixed(
        (number / 1000 - (number / 1000).toFixed(0)).toFixed(1) < 0.1 ? 0 : 1
      )} k`
    : number;
